document.addEventListener("DOMContentLoaded", () => {

    const blogsContainer = document.getElementById("blogsContainer");
    const emptyState = document.getElementById("emptyState");

    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    // ==========================
    // LOAD BLOGS
    // ==========================

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

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
                    src="${blog.image}"
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

                            ${blog.createdAt}

                        </span>

                    </div>

                    <button
                        class="btn btn-primary read-more-btn"
                        onclick="openBlog(${blog.id})">

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

        localStorage.setItem("selectedBlog", id);

        window.location.href = "blog-details.html";

    }

    // Make function accessible from HTML

    window.openBlog = openBlog;

    // ==========================
    // SEARCH + FILTER
    // ==========================

    function filterBlogs() {

        const search = searchInput.value.toLowerCase().trim();

        const category = categoryFilter.value;

        const filteredBlogs = blogs.filter(blog => {

            const matchesSearch =

                blog.title.toLowerCase().includes(search) ||

                blog.description.toLowerCase().includes(search) ||

                blog.author.toLowerCase().includes(search) ||

                blog.category.toLowerCase().includes(search);

            const matchesCategory =

                category === "all" ||

                blog.category === category;

            return matchesSearch && matchesCategory;

        });

        renderBlogs(filteredBlogs);

    }

    // ==========================
    // EVENTS
    // ==========================

    searchInput.addEventListener("input", filterBlogs);

    categoryFilter.addEventListener("change", filterBlogs);

    // ==========================
    // INITIAL LOAD
    // ==========================

    renderBlogs(blogs);

});