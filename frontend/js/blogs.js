document.addEventListener("DOMContentLoaded", async () => {

    const blogsContainer = document.getElementById("blogsContainer");
    const emptyState = document.getElementById("emptyState");

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    // ==========================
    // BACKEND API
    // ==========================

    const API_URL = "http://localhost:5000/api/blogs";

    let blogs = [];

    // ==========================
    // LOAD BLOGS FROM DATABASE
    // ==========================

    async function loadBlogs() {

        try {

            const response = await fetch(API_URL);

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message || "Unable to load blogs"
                );

            }

            blogs = data.blogs || [];

            renderBlogs(blogs);

        } catch (error) {

            console.error("Load Blogs Error:", error);

            blogsContainer.innerHTML = "";

            blogsContainer.style.display = "none";

            emptyState.style.display = "flex";

            showError(
                "Unable to load blogs. Please make sure the backend server is running."
            );

        }

    }


    // ==========================
    // FORMAT DATE
    // ==========================

    function formatDate(date) {

        if (!date) {
            return "Unknown date";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    // ==========================
    // RENDER BLOGS
    // ==========================

    function renderBlogs(blogList) {

        blogsContainer.innerHTML = "";

        if (blogList.length === 0) {

            blogsContainer.style.display = "none";

            emptyState.style.display = "flex";

            return;

        }

        blogsContainer.style.display = "grid";

        emptyState.style.display = "none";


        blogList.forEach(blog => {

            const card = document.createElement("div");

            card.className = "blog-card";

            card.innerHTML = `

                <img
                    src="${blog.image || "https://placehold.co/900x400?text=Scriptora"}"
                    alt="${blog.title}"
                    class="blog-image">

                <div class="blog-content">

                    <span class="blog-category">

                        ${blog.category}

                    </span>

                    <h2>

                        ${blog.title}

                    </h2>

                    <p>

                        ${blog.description}

                    </p>

                    <div class="blog-info">

                        <span>

                            <i class="fa-solid fa-user"></i>

                            ${blog.author}

                        </span>

                        <span>

                            <i class="fa-solid fa-calendar"></i>

                            ${formatDate(blog.createdAt)}

                        </span>

                    </div>

                    <button
                        class="btn btn-primary read-more-btn"
                        onclick="openBlog('${blog._id}')">

                        Read More

                    </button>

                </div>

            `;

            blogsContainer.appendChild(card);

        });

    }


    // ==========================
    // OPEN BLOG
    // ==========================

    function openBlog(id) {

    window.location.href =
        `blog-details.html?id=${encodeURIComponent(id)}`;

    }

    // Make function accessible from HTML

    window.openBlog = openBlog;


    // ==========================
    // SEARCH + FILTER
    // ==========================

    function filterBlogs() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        const category =
            categoryFilter.value;


        const filteredBlogs =
            blogs.filter(blog => {

                const matchesSearch =

                    blog.title
                        .toLowerCase()
                        .includes(search) ||

                    blog.description
                        .toLowerCase()
                        .includes(search) ||

                    blog.author
                        .toLowerCase()
                        .includes(search) ||

                    blog.category
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =

                    category === "all" ||

                    blog.category === category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        renderBlogs(filteredBlogs);

    }


    // ==========================
    // EVENTS
    // ==========================

    searchInput.addEventListener(
        "input",
        filterBlogs
    );

    categoryFilter.addEventListener(
        "change",
        filterBlogs
    );


    // ==========================
    // INITIAL LOAD
    // ==========================

    await loadBlogs();

});