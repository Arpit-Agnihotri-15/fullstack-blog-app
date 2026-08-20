const API_URL =
    "http://localhost:5000/api/blogs";


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


        // =========================
        // LOGGED-IN USER
        // =========================

        const loggedInUser =
            JSON.parse(
                localStorage.getItem(
                    "loggedInUser"
                )
            );


        if (!loggedInUser) {

            window.location.href =
                "login.html";

            return;

        }


        // =========================
        // CHECK USER ID
        // =========================

        const loggedInUserId =
            String(
                loggedInUser.id || ""
            ).trim();


        if (!loggedInUserId) {

            console.error(
                "Logged-in user ID is missing:",
                loggedInUser
            );


            container.innerHTML = "";

            container.style.display =
                "none";


            emptyState.style.display =
                "flex";


            emptyState.innerHTML = `

                <i class="fa-solid fa-circle-exclamation"></i>

                <h2>
                    Unable to Identify Account
                </h2>

                <p>
                    Please logout and login again.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="window.location.href='login.html'"
                >
                    Login Again
                </button>

            `;

            return;

        }


        console.log(
            "Logged-in user:",
            loggedInUser
        );

        console.log(
            "Logged-in user ID:",
            loggedInUserId
        );


        // =========================
        // LOAD BLOGS
        // =========================

        try {

            const response =
                await fetch(API_URL);


            if (!response.ok) {

                throw new Error(
                    `Failed to fetch blogs. Status: ${response.status}`
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


            const blogs =
                data.blogs || [];


            console.log(
                "All blogs from MongoDB:",
                blogs
            );


            // =========================
            // FILTER BY AUTHOR ID
            // =========================

            const myBlogs =
                blogs.filter(blog => {

                    const blogAuthorId =
                        String(
                            blog.authorId || ""
                        ).trim();


                    console.log(
                        "Blog:",
                        blog.title,
                        "| authorId:",
                        blogAuthorId
                    );


                    return (
                        blogAuthorId !== "" &&
                        blogAuthorId ===
                        loggedInUserId
                    );

                });


            console.log(
                "My blogs:",
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

                                <!-- VIEW -->

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


                                <!-- EDIT -->

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


                                <!-- DELETE -->

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

        const response =
        await fetch(
            `${API_URL}/${id}`,
            {
                method:
                    "DELETE",

                headers: {
                    "Authorization":
                        `Bearer ${JSON.parse(localStorage.getItem("loggedInUser")).token}`
                }
            }
        );

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