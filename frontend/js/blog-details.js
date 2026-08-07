document.addEventListener("DOMContentLoaded", () => {

    const blogId = Number(localStorage.getItem("selectedBlog"));

    const blogs =
        JSON.parse(localStorage.getItem("blogs")) || [];

    const blog =
        blogs.find(b => b.id === blogId);

    if (!blog) {

        window.location.href = "blogs.html";
        return;

    }

    /* ===========================
            VIEWS
    =========================== */

    blog.views = (blog.views || 0) + 1;

    localStorage.setItem(

        "blogs",

        JSON.stringify(blogs)

    );

    /* ===========================
        BASIC DETAILS
    =========================== */

    const image = document.getElementById("blogImage");

    image.src = blog.image;

    image.onerror = function () {

        this.src = "https://picsum.photos/1200/600";

    };

    document.getElementById("blogCategory").textContent =
        blog.category;

    document.getElementById("blogTitle").textContent =
        blog.title;

    document.getElementById("blogDescription").textContent =
        blog.description;

    document.getElementById("blogContent").innerHTML =
        blog.content.replace(/\n/g, "<br>");

    document.getElementById("blogAuthor").innerHTML =

        `<i class="fa-solid fa-user"></i> ${blog.author}`;

    document.getElementById("blogDate").innerHTML =

        `<i class="fa-solid fa-calendar"></i> ${blog.createdAt}`;

    document.getElementById("viewCount").innerHTML =

        `<i class="fa-solid fa-eye"></i> ${blog.views} Views`;

    /* ===========================
        READING TIME
    =========================== */

    const words =

        blog.content
            .trim()
            .split(/\s+/)
            .length;

    const minutes =

        Math.max(1, Math.ceil(words / 200));

    document.getElementById("readingTime").innerHTML =

        `<i class="fa-solid fa-book-open-reader"></i> ${minutes} min read`;

    /* ===========================
            TAGS
    =========================== */

    const tagBox =
        document.getElementById("blogTags");

    tagBox.innerHTML = "";

    if (blog.tags && blog.tags.length > 0) {

        blog.tags.forEach(tag => {

            tagBox.innerHTML +=

                `<span>#${tag}</span>`;

        });

    }

    /* ===========================
            LIKE
    =========================== */

    blog.likes = blog.likes || 0;

    document.getElementById("likeCount").textContent =

        blog.likes;

    document
        .getElementById("likeBtn")
        .addEventListener("click", () => {

            blog.likes++;

            localStorage.setItem(

                "blogs",

                JSON.stringify(blogs)

            );

            document.getElementById("likeCount").textContent =

                blog.likes;

            if (typeof showSuccess === "function") {

                showSuccess("Thanks for liking!");

            }

        });

    /* ===========================
            SHARE
    =========================== */

    document.getElementById("shareBtn").addEventListener("click", async () => {

    const shareData = {
        title: blog.title,
        text: blog.description,
        url: window.location.href
    };

    // If browser supports native sharing
    if (navigator.share) {

        try {

            await navigator.share(shareData);

            showSuccess("Blog shared successfully!");

        } catch (err) {

            // User cancelled
            console.log(err);

        }

    }

    // Otherwise copy the link
    else if (navigator.clipboard) {

        try {

            await navigator.clipboard.writeText(window.location.href);

            showSuccess("Blog link copied to clipboard!");

        } catch {

            prompt("Copy this link:", window.location.href);

        }

    }

    // Final fallback
    else {

        prompt("Copy this link:", window.location.href);

    }

});
    /* ===========================
        COMMENTS
=========================== */

blog.comments = blog.comments || [];

const commentsContainer =
    document.getElementById("commentsContainer");

const commentCount =
    document.getElementById("commentCount");

function renderComments() {

    commentsContainer.innerHTML = "";

    commentCount.textContent = blog.comments.length;

    if (blog.comments.length === 0) {

        commentsContainer.innerHTML = `

            <div class="empty-comments">

                <i class="fa-regular fa-comments"></i>

                <p>No comments yet.</p>

                <small>Be the first one to comment.</small>

            </div>

        `;

        return;

    }

    blog.comments.forEach(comment => {

        commentsContainer.innerHTML += `

            <div class="comment">

                <h4>

                    <i class="fa-solid fa-user"></i>

                    ${comment.name}

                </h4>

                <small>

                    <i class="fa-solid fa-calendar"></i>

                    ${comment.date}

                </small>

                <p>

                    ${comment.text}

                </p>

            </div>

        `;

    });

}

renderComments();

/* ===========================
        POST COMMENT
=========================== */

document
.getElementById("commentBtn")
.addEventListener("click", () => {

    const text =
        document
        .getElementById("commentText")
        .value
        .trim();

    if (text === "") {

        if (typeof showError === "function") {

            showError("Comment cannot be empty.");

        }

        return;

    }

    const user =
        JSON.parse(localStorage.getItem("loggedInUser"));

    blog.comments.push({

        name: user ? user.name : "Anonymous",

        text: text,

        date: new Date().toLocaleDateString()

    });

    localStorage.setItem(

        "blogs",

        JSON.stringify(blogs)

    );

    document
        .getElementById("commentText")
        .value = "";

    renderComments();

    if (typeof showSuccess === "function") {

        showSuccess("Comment Added!");

    }

});

/* ===========================
    UPDATE DASHBOARD STATS
=========================== */

function updateDashboardStats() {

    const loggedUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedUser) return;

    const myBlogs =
        blogs.filter(

            b => b.author === loggedUser.name

        );

    localStorage.setItem(

        "dashboardStats",

        JSON.stringify({

            blogs: myBlogs.length,

            likes: myBlogs.reduce(

                (sum, b) => sum + (b.likes || 0),

                0

            ),

            comments: myBlogs.reduce(

                (sum, b) => sum + ((b.comments || []).length),

                0

            ),

            views: myBlogs.reduce(

                (sum, b) => sum + (b.views || 0),

                0

            )

        })

    );

}

updateDashboardStats();

});