const BLOGS_API =
    "http://localhost:5000/api/blogs";

const COMMENTS_API =
    "http://localhost:5000/api/comments";


// ========================================
// AUTHENTICATION GUARD
// ========================================

const storedUser =
    localStorage.getItem("loggedInUser");

let loggedUser = null;

try {

    loggedUser =
        storedUser
            ? JSON.parse(storedUser)
            : null;

} catch (error) {

    console.error(
        "Invalid logged-in user data."
    );

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.replace(
        "login.html"
    );

}


// Check whether user and token are valid

const token =
    loggedUser?.token;

if (
    !loggedUser ||
    typeof token !== "string" ||
    token.trim() === ""
) {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.replace(
        "login.html"
    );

}


// ========================================
// DASHBOARD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // =========================
        // USER NAME
        // =========================

        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            userName.textContent =
                `Welcome back, ${loggedUser.name} 👋`;

        }


        // =========================
        // FETCH USER'S BLOGS
        // =========================

        try {

            const response =
                await fetch(
                    `${BLOGS_API}/my`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                `Bearer ${token.trim()}`
                        }
                    }
                );


            // =========================
            // AUTHENTICATION FAILURE
            // =========================

            if (
                response.status === 401
            ) {

                localStorage.removeItem(
                    "loggedInUser"
                );

                window.location.replace(
                    "login.html"
                );

                return;

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch your blogs"
                );

            }


            const data =
                await response.json();


            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Unable to load blogs"
                );

            }


            // Backend already returns
            // only the logged-in user's blogs

            const myBlogs =
                data.blogs || [];


            console.log(
                "Dashboard - Logged user:",
                loggedUser
            );


            console.log(
                "Dashboard - My blogs from secure API:",
                myBlogs
            );


            // =========================
            // TOTAL BLOGS
            // =========================

            const totalBlogs =
                document.getElementById(
                    "totalBlogs"
                );


            if (totalBlogs) {

                totalBlogs.textContent =
                    myBlogs.length;

            }


            // =========================
            // TOTAL LIKES
            // =========================

            const totalLikes =
                myBlogs.reduce(
                    (sum, blog) => {

                        return (
                            sum +
                            Number(
                                blog.likes || 0
                            )
                        );

                    },
                    0
                );


            const totalLikesElement =
                document.getElementById(
                    "totalLikes"
                );


            if (totalLikesElement) {

                totalLikesElement.textContent =
                    totalLikes;

            }


            // =========================
            // TOTAL VIEWS
            // =========================

            const totalViews =
                myBlogs.reduce(
                    (sum, blog) => {

                        return (
                            sum +
                            Number(
                                blog.views || 0
                            )
                        );

                    },
                    0
                );


            const totalViewsElement =
                document.getElementById(
                    "totalViews"
                );


            if (totalViewsElement) {

                totalViewsElement.textContent =
                    totalViews;

            }


            // =========================
            // TOTAL COMMENTS
            // =========================

            let totalComments = 0;


            for (
                const blog of myBlogs
            ) {

                try {

                    const commentResponse =
                        await fetch(
                            `${COMMENTS_API}/${blog._id}`
                        );


                    if (
                        !commentResponse.ok
                    ) {

                        continue;

                    }


                    const commentData =
                        await commentResponse.json();


                    if (
                        commentData.success
                    ) {

                        totalComments +=
                            Number(
                                commentData.count ||
                                0
                            );

                    }

                } catch (error) {

                    console.error(
                        `Failed to fetch comments for blog ${blog._id}:`,
                        error
                    );

                }

            }


            const totalCommentsElement =
                document.getElementById(
                    "totalComments"
                );


            if (totalCommentsElement) {

                totalCommentsElement.textContent =
                    totalComments;

            }


            // =========================
            // RECENT BLOGS
            // =========================

            const container =
                document.getElementById(
                    "recentBlogsContainer"
                );


            if (!container) {

                return;

            }


            if (
                myBlogs.length === 0
            ) {

                container.innerHTML = `

                    <div class="empty-state">

                        <i
                            class="fa-solid fa-folder-open"
                        ></i>

                        <h3>
                            No Blogs Yet
                        </h3>

                        <p>
                            Create your first blog.
                        </p>

                        <a
                            href="create-blog.html"
                            class="btn btn-primary"
                        >
                            Create Blog
                        </a>

                    </div>

                `;

                return;

            }


            // =========================
            // SORT BY CREATED DATE
            // =========================

            const latestBlogs =
                [...myBlogs]
                    .sort(
                        (a, b) => {

                            return (
                                new Date(
                                    b.createdAt || 0
                                ) -
                                new Date(
                                    a.createdAt || 0
                                )
                            );

                        }
                    )
                    .slice(0, 3);


            container.innerHTML =
                "";


            // =========================
            // RENDER RECENT BLOGS
            // =========================

            latestBlogs.forEach(
                blog => {

                    const blogCard =
                        document.createElement(
                            "div"
                        );


                    blogCard.className =
                        "dashboard-blog-card";


                    const image =
                        blog.image ||
                        "https://placehold.co/900x400?text=Scriptora";


                    const title =
                        blog.title ||
                        "Untitled Blog";


                    const category =
                        blog.category ||
                        "General";


                    const description =
                        blog.description ||
                        "";


                    const blogId =
                        blog._id;


                    blogCard.innerHTML = `

                        <img
                            src="${image}"
                            alt="${title}"
                            onerror="
                                this.src='https://placehold.co/900x400?text=Scriptora'
                            "
                        >

                        <div>

                            <span
                                class="blog-category"
                            >
                                ${category}
                            </span>

                            <h3>
                                ${title}
                            </h3>

                            <p>
                                ${description}
                            </p>

                            <a
                                href="blog-details.html?id=${encodeURIComponent(blogId)}"
                                class="btn btn-outline"
                            >
                                Read More
                            </a>

                        </div>

                    `;


                    container.appendChild(
                        blogCard
                    );

                }
            );


        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );


            const container =
                document.getElementById(
                    "recentBlogsContainer"
                );


            if (container) {

                container.innerHTML = `

                    <div class="empty-state">

                        <i
                            class="fa-solid fa-circle-exclamation"
                        ></i>

                        <h3>
                            Unable to Load Dashboard
                        </h3>

                        <p>
                            Please make sure the backend server is running.
                        </p>

                        <button
                            class="btn btn-primary"
                            onclick="window.location.reload()"
                        >
                            Retry
                        </button>

                    </div>

                `;

            }

        }

    }
);