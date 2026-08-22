const API_URL =
    "http://localhost:5000/api/blogs";


// ========================================
// AUTHENTICATION GUARD
// ========================================

const storedUser =
    localStorage.getItem("loggedInUser");

let loggedInUser = null;

try {

    loggedInUser =
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


const token =
    loggedInUser?.token;


if (
    !loggedInUser ||
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
// MY BLOGS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const container =
            document.getElementById(
                "myBlogsContainer"
            );

        const emptyState =
            document.getElementById(
                "emptyBlogs"
            );


        console.log(
            "Logged-in user:",
            loggedInUser
        );


        // =========================
        // LOAD USER'S BLOGS
        // =========================

        try {

            const response =
                await fetch(
                    `${API_URL}/my`,
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
                    `Failed to fetch your blogs. Status: ${response.status}`
                );

            }


            const data =
                await response.json();


            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Failed to load blogs"
                );

            }


            // Backend already returns
            // only the logged-in user's blogs

            const myBlogs =
                data.blogs || [];


            console.log(
                "My blogs from secure API:",
                myBlogs
            );


            // =========================
            // NO BLOGS
            // =========================

            if (
                myBlogs.length === 0
            ) {

                container.innerHTML =
                    "";

                container.style.display =
                    "none";

                emptyState.style.display =
                    "flex";

                return;

            }


            // =========================
            // SHOW BLOGS
            // =========================

            container.innerHTML =
                "";

            container.style.display =
                "grid";

            emptyState.style.display =
                "none";


            // =========================
            // RENDER BLOG CARDS
            // =========================

            myBlogs.forEach(
                blog => {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "blog-card";


                    const blogId =
                        blog._id ||
                        blog.id;


                    // =========================
                    // FORMAT DATE
                    // =========================

                    let formattedDate =
                        "Date unavailable";


                    if (
                        blog.createdAt
                    ) {

                        const date =
                            new Date(
                                blog.createdAt
                            );


                        if (
                            !isNaN(
                                date.getTime()
                            )
                        ) {

                            formattedDate =
                                date.toLocaleDateString(
                                    "en-IN",
                                    {
                                        day:
                                            "2-digit",

                                        month:
                                            "short",

                                        year:
                                            "numeric"
                                    }
                                );

                        }

                    }


                    // =========================
                    // BLOG CARD
                    // =========================

                    card.innerHTML = `

                        <img
                            src="${
                                blog.image ||
                                "https://placehold.co/900x400?text=Scriptora"
                            }"
                            class="blog-image"
                            alt="${
                                blog.title ||
                                "Blog image"
                            }"
                            onerror="
                                this.src='https://placehold.co/900x400?text=Scriptora'
                            "
                        >

                        <div class="blog-content">

                            <span
                                class="blog-category"
                            >
                                ${
                                    blog.category ||
                                    "General"
                                }
                            </span>

                            <h2>
                                ${
                                    blog.title ||
                                    "Untitled Blog"
                                }
                            </h2>

                            <p>
                                ${
                                    blog.description ||
                                    ""
                                }
                            </p>

                            <div
                                class="blog-info"
                            >

                                <span>

                                    <i
                                        class="fa-solid fa-user"
                                    ></i>

                                    ${
                                        blog.author ||
                                        "Unknown Author"
                                    }

                                </span>

                                <span>

                                    <i
                                        class="fa-solid fa-calendar"
                                    ></i>

                                    ${
                                        formattedDate
                                    }

                                </span>

                            </div>

                            <div
                                class="blog-actions"
                            >

                                <button
                                    class="btn btn-outline"
                                    onclick="
                                        viewBlog('${blogId}')
                                    "
                                >

                                    <i
                                        class="fa-solid fa-eye"
                                    ></i>

                                    View

                                </button>

                                <button
                                    class="btn btn-secondary"
                                    onclick="
                                        editBlog('${blogId}')
                                    "
                                >

                                    <i
                                        class="fa-solid fa-pen"
                                    ></i>

                                    Edit

                                </button>

                                <button
                                    class="btn btn-danger"
                                    onclick="
                                        deleteBlog('${blogId}')
                                    "
                                >

                                    <i
                                        class="fa-solid fa-trash"
                                    ></i>

                                    Delete

                                </button>

                            </div>

                        </div>

                    `;


                    container.appendChild(
                        card
                    );

                }
            );


        } catch (error) {

            console.error(
                "My Blogs Error:",
                error
            );


            container.innerHTML =
                "";

            container.style.display =
                "none";


            emptyState.style.display =
                "flex";


            emptyState.innerHTML = `

                <i
                    class="fa-solid fa-circle-exclamation"
                ></i>

                <h2>
                    Unable to Load Blogs
                </h2>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="window.location.reload()"
                >
                    Retry
                </button>

            `;

        }

    }
);


// ========================================
// VIEW BLOG
// ========================================

function viewBlog(id) {

    if (!id) {

        console.error(
            "Blog ID is missing"
        );

        return;

    }


    window.location.href =
        `blog-details.html?id=${encodeURIComponent(id)}&from=my-blogs`;

}


// ========================================
// EDIT BLOG
// ========================================

function editBlog(id) {

    if (!id) {

        console.error(
            "Blog ID is missing"
        );

        return;

    }


    console.log(
        "Editing blog:",
        id
    );


    localStorage.setItem(
        "editBlog",
        id
    );


    window.location.href =
        "create-blog.html";

}


// ========================================
// DELETE BLOG
// ========================================

async function deleteBlog(id) {

    if (!id) {

        console.error(
            "Blog ID is missing"
        );

        return;

    }


    const confirmDelete =
        typeof confirmAction ===
        "function"

            ? await confirmAction(
                "This blog and all its comments and likes will be permanently deleted. This action cannot be undone.",
                {
                    title:
                        "Delete Blog?",

                    confirmText:
                        "Delete",

                    icon:
                        "fa-trash",

                    tone:
                        "danger"
                }
            )

            : confirm(
                "Are you sure you want to delete this blog?"
            );


    if (!confirmDelete) {

        return;

    }


    try {

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
            );


        const currentToken =
            currentUser?.token;


        if (
            !currentUser ||
            typeof currentToken !== "string" ||
            currentToken.trim() === ""
        ) {

            localStorage.removeItem(
                "loggedInUser"
            );

            window.location.replace(
                "login.html"
            );

            return;

        }


        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method:
                        "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${currentToken.trim()}`
                    }
                }
            );


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


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Failed to delete blog"
            );

        }


        if (
            typeof showSuccess ===
            "function"
        ) {

            showSuccess(
                "Blog Deleted Successfully!"
            );

        } else {

            alert(
                "Blog Deleted Successfully!"
            );

        }


        setTimeout(
            () => {

                window.location.reload();

            },
            800
        );


    } catch (error) {

        console.error(
            "Delete blog error:",
            error
        );


        if (
            typeof showError ===
            "function"
        ) {

            showError(
                error.message ||
                "Failed to delete blog"
            );

        } else {

            alert(
                error.message ||
                "Failed to delete blog"
            );

        }

    }

}