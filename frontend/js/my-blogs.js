document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("myBlogsContainer");
    const emptyState = document.getElementById("emptyBlogs");

    // Logged In User
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // All Blogs
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // If user is not logged in
    if (!loggedInUser) {

        window.location.href = "login.html";
        return;

    }

    // Only current user's blogs
    const myBlogs = blogs.filter(blog =>
        blog.author === loggedInUser.name
    );

    // No blogs
    if (myBlogs.length === 0) {

        container.style.display = "none";
        emptyState.style.display = "flex";

        return;

    }

    container.style.display = "grid";
    emptyState.style.display = "none";

    // Render Blogs
    myBlogs.forEach(blog => {

        const card = document.createElement("div");

        card.className = "blog-card";

        card.innerHTML = `

            <img
                src="${blog.image}"
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

                        <i class="fa-solid fa-calendar"></i>

                        ${blog.createdAt}

                    </span>

                </div>

                <div class="blog-actions">

                    <button
                        class="btn btn-outline"
                        onclick="viewBlog(${blog.id})">

                        <i class="fa-solid fa-eye"></i>

                        View

                    </button>

                    <button
                        class="btn btn-secondary"
                        onclick="editBlog(${blog.id})">

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteBlog(${blog.id})">

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        `;

        container.appendChild(card);

    });

});

// =========================
// View
// =========================

function viewBlog(id){

    localStorage.setItem("selectedBlog", id);

    window.location.href="blog-details.html";

}

// =========================
// Edit
// =========================

function editBlog(id){

    localStorage.setItem("editBlog", id);

    window.location.href="create-blog.html";

}

// =========================
// Delete
// =========================

async function deleteBlog(id){

    const confirmDelete = typeof confirmAction === "function"
        ? await confirmAction(
            "This blog and all its comments and likes will be permanently deleted. This action cannot be undone.",
            {
                title: "Delete Blog?",
                confirmText: "Delete",
                icon: "fa-trash",
                tone: "danger"
            }
        )
        : confirm("Are you sure you want to delete this blog?");

    if(!confirmDelete){

        return;

    }

    let blogs =
        JSON.parse(localStorage.getItem("blogs")) || [];

    blogs = blogs.filter(blog => blog.id != id);

    localStorage.setItem(

        "blogs",

        JSON.stringify(blogs)

    );

    showSuccess("Blog Deleted Successfully!");

    setTimeout(()=>{

        window.location.reload();

    },1000);

}