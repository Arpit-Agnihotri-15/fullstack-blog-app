const BLOGS_API =
    "http://localhost:5000/api/blogs";

const COMMENTS_API =
    "http://localhost:5000/api/comments";


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // =========================
        // LOGGED-IN USER
        // =========================

        const loggedUser =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
            );


        if (!loggedUser) {

            window.location.href =
                "login.html";

            return;

        }


        const loggedUserId =
            String(
                loggedUser.id || ""
            ).trim();


        if (!loggedUserId) {

            console.error(
                "Logged-in user ID is missing."
            );

            return;

        }


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
        // FETCH BLOGS
        // =========================

        try {

            const response =
                await fetch(
                    BLOGS_API
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch blogs"
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


            const blogs =
                data.blogs || [];


            // =========================
            // USER'S BLOGS
            // =========================

            const myBlogs =
                blogs.filter(blog => {

                    const blogAuthorId =
                        String(
                            blog.authorId || ""
                        ).trim();


                    return (
                        blogAuthorId !== "" &&
                        blogAuthorId ===
                        loggedUserId
                    );

                });


            console.log(
                "Dashboard - Logged user:",
                loggedUser
            );


            console.log(
                "Dashboard - My blogs:",
                myBlogs
            );


            // =========================
            // TOTAL BLOGS
            // =========================

            document.getElementById(
                "totalBlogs"
            ).textContent =
                myBlogs.length;


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


            document.getElementById(
                "totalLikes"
            ).textContent =
                totalLikes;


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


            document.getElementById(
                "totalViews"
            ).textContent =
                totalViews;


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


            document.getElementById(
                "totalComments"
            ).textContent =
                totalComments;


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


            // Clear container

            container.innerHTML = "";


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


            // =========================
            // FALLBACK ERROR STATE
            // =========================

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