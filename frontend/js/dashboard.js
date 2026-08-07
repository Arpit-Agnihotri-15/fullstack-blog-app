document.addEventListener("DOMContentLoaded", () => {

    const loggedUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedUser) {

        window.location.href = "login.html";
        return;

    }

    const blogs =
        JSON.parse(localStorage.getItem("blogs")) || [];

    const myBlogs =
        blogs.filter(blog => blog.author === loggedUser.name);

    // ======================
    // Statistics
    // ======================

    document.getElementById("totalBlogs").textContent =
        myBlogs.length;

    document.getElementById("totalLikes").textContent =
        myBlogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);

    document.getElementById("totalComments").textContent =
        myBlogs.reduce((sum, blog) => {

            const count = Array.isArray(blog.comments)
                ? blog.comments.length
                : (blog.comments || 0);

            return sum + count;

        }, 0);

    document.getElementById("totalViews").textContent =
        myBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

    // ======================
    // Recent Blogs
    // ======================

    const container =
        document.getElementById("recentBlogsContainer");

    if (myBlogs.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-folder-open"></i>

                <h3>No Blogs Yet</h3>

                <p>Create your first blog.</p>

                <a href="create-blog.html"
                   class="btn btn-primary">

                    Create Blog

                </a>

            </div>

        `;

        return;

    }

    const latestBlogs =
        [...myBlogs]
        .reverse()
        .slice(0, 3);

    latestBlogs.forEach(blog => {

        container.innerHTML += `

            <div class="dashboard-blog-card">

                <img src="${blog.image}"
                     alt="${blog.title}">

                <div>

                    <span class="blog-category">

                        ${blog.category}

                    </span>

                    <h3>

                        ${blog.title}

                    </h3>

                    <p>

                        ${blog.description}

                    </p>

                    <a href="blog-details.html"
                       class="btn btn-outline"
                       onclick="localStorage.setItem('selectedBlog', ${blog.id})">

                        Read More

                    </a>

                </div>

            </div>

        `;

    });

});