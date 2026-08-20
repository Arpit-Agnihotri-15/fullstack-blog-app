document.addEventListener("DOMContentLoaded", async () => {

    // ==========================
    // GET BLOG ID FROM URL
    // ==========================

    const params = new URLSearchParams(window.location.search);
    const blogId = params.get("id");
    const from = params.get("from");

    if (!blogId) {
        window.location.href = "blogs.html";
        return;
    }

    const backButton =
        document.querySelector(".back-btn a");

    if (backButton && from === "my-blogs") {

        backButton.href = "my-blogs.html";

        backButton.innerHTML = `
            <i class="fa-solid fa-arrow-left"></i>
            Back to My Blogs
        `;

    }


    // ==========================
    // API
    // ==========================

    const BLOG_API =
        `http://localhost:5000/api/blogs/${encodeURIComponent(blogId)}`;

    const COMMENTS_API =
        `http://localhost:5000/api/comments/${encodeURIComponent(blogId)}`;


    let blog;


    // ==========================
    // LOAD BLOG
    // ==========================

    try {

        const response = await fetch(BLOG_API);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Blog not found"
            );
        }

        blog = data.blog;

    } catch (error) {

        console.error("Load Blog Error:", error);

        if (typeof showError === "function") {
            showError("Unable to load this blog.");
        }

        setTimeout(() => {
            window.location.href = "blogs.html";
        }, 1500);

        return;
    }


    // ==========================
    // BASIC BLOG DETAILS
    // ==========================

    const image =
        document.getElementById("blogImage");

    image.src =
        blog.image ||
        "https://picsum.photos/1200/600";

    image.onerror = function () {
        this.src =
            "https://picsum.photos/1200/600";
    };


    document.getElementById("blogCategory").textContent =
        blog.category || "";


    document.getElementById("blogTitle").textContent =
        blog.title || "";


    document.getElementById("blogDescription").textContent =
        blog.description || "";


    document.getElementById("blogContent").innerHTML =
        (blog.content || "")
            .replace(/\n/g, "<br>");


    document.getElementById("blogAuthor").innerHTML =
        `<i class="fa-solid fa-user"></i> ${
            escapeHtml(blog.author || "Unknown")
        }`;


    // ==========================
    // DATE
    // ==========================

    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        )
        : "Unknown date";


    document.getElementById("blogDate").innerHTML =
        `<i class="fa-solid fa-calendar"></i> ${formattedDate}`;


    // ==========================
    // VIEWS
    // ==========================

    const viewCount =
        document.getElementById("viewCount");


    viewCount.innerHTML =
        `<i class="fa-solid fa-eye"></i> ${
            blog.views || 0
        } Views`;


    try {

        const viewResponse = await fetch(
            `${BLOG_API}/view`,
            {
                method: "POST"
            }
        );

        const viewData =
            await viewResponse.json();

        if (viewResponse.ok) {

            viewCount.innerHTML =
                `<i class="fa-solid fa-eye"></i> ${
                    viewData.views
                } Views`;

        }

    } catch (error) {

        console.error(
            "View Count Error:",
            error
        );

    }


    // ==========================
    // READING TIME
    // ==========================

    const words =
        (blog.content || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length;


    const minutes =
        Math.max(
            1,
            Math.ceil(words / 200)
        );


    document.getElementById("readingTime").innerHTML =
        `<i class="fa-solid fa-book-open-reader"></i> ${
            minutes
        } min read`;


    // ==========================
    // TAGS
    // ==========================

    const tagBox =
        document.getElementById("blogTags");

    tagBox.innerHTML = "";


    if (
        blog.tags &&
        blog.tags.length > 0
    ) {

        blog.tags.forEach(tag => {

            const tagElement =
                document.createElement("span");

            tagElement.textContent =
                `#${tag}`;

            tagBox.appendChild(tagElement);

        });

    }


    // ==========================
    // LIKE COUNT
    // ==========================

    const likeCount =
        document.getElementById("likeCount");

    likeCount.textContent =
        blog.likes || 0;


    // ==========================
    // LIKE BUTTON
    // ==========================

    document
        .getElementById("likeBtn")
        .addEventListener(
            "click",
            async () => {

                const likeBtn =
                    document.getElementById("likeBtn");

                if (likeBtn.disabled) {
                    return;
                }

                try {

                    likeBtn.disabled = true;

                    const response =
                        await fetch(
                            `${BLOG_API}/like`,
                            {
                                method: "POST"
                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        throw new Error(
                            data.message ||
                            "Unable to like blog"
                        );

                    }


                    likeCount.textContent =
                        data.likes;


                    if (
                        typeof showSuccess ===
                        "function"
                    ) {

                        showSuccess(
                            "Thanks for liking!"
                        );

                    }

                } catch (error) {

                    console.error(
                        "Like Blog Error:",
                        error
                    );


                    if (
                        typeof showError ===
                        "function"
                    ) {

                        showError(
                            "Unable to like this blog."
                        );

                    }

                } finally {

                    likeBtn.disabled = false;

                }

            }
        );


    // ==========================
    // SHARE
    // ==========================

    document
        .getElementById("shareBtn")
        .addEventListener(
            "click",
            async () => {

                const shareData = {

                    title:
                        blog.title,

                    text:
                        blog.description,

                    url:
                        window.location.href

                };


                if (navigator.share) {

                    try {

                        await navigator.share(
                            shareData
                        );


                        if (
                            typeof showSuccess ===
                            "function"
                        ) {

                            showSuccess(
                                "Blog shared successfully!"
                            );

                        }

                    } catch (error) {

                        console.log(
                            "Share cancelled"
                        );

                    }

                } else if (navigator.clipboard) {

                    try {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );


                        if (
                            typeof showSuccess ===
                            "function"
                        ) {

                            showSuccess(
                                "Blog link copied to clipboard!"
                            );

                        }

                    } catch {

                        prompt(
                            "Copy this link:",
                            window.location.href
                        );

                    }

                } else {

                    prompt(
                        "Copy this link:",
                        window.location.href
                    );

                }

            }
        );


    // ==========================
    // COMMENTS
    // ==========================

    const commentsContainer =
        document.getElementById(
            "commentsContainer"
        );


    const commentCount =
        document.getElementById(
            "commentCount"
        );


    const commentName =
        document.getElementById(
            "commentName"
        );


    const commentText =
        document.getElementById(
            "commentText"
        );


    const commentBtn =
        document.getElementById(
            "commentBtn"
        );


    // ==========================
    // ESCAPE HTML
    // ==========================

    function escapeHtml(text) {

        const div =
            document.createElement("div");

        div.textContent =
            text || "";

        return div.innerHTML;

    }


    // ==========================
    // LOAD COMMENTS
    // ==========================

    async function loadComments() {

        try {

            const response =
                await fetch(COMMENTS_API);


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to load comments"
                );

            }


            const comments =
                data.comments || [];


            // Update actual comment count
            commentCount.textContent =
                comments.length;


            // Clear previous comments
            commentsContainer.innerHTML =
                "";


            // ==========================
            // NO COMMENTS
            // ==========================

            if (comments.length === 0) {

                commentsContainer.innerHTML = `

                    <div class="empty-comments">

                        <i class="fa-regular fa-comments"></i>

                        <p>No comments yet.</p>

                        <small>
                            Be the first to comment!
                        </small>

                    </div>

                `;

                return;

            }


            // ==========================
            // DISPLAY COMMENTS
            // ==========================

            comments.forEach(comment => {

                const commentElement =
                    document.createElement("div");


                commentElement.className =
                    "comment";


                const date =
                    comment.createdAt
                        ? new Date(
                            comment.createdAt
                        ).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            }
                        )
                        : "";


                commentElement.innerHTML = `

                    <h4>
                        ${escapeHtml(
                            comment.name
                        )}
                    </h4>

                    <small>
                        <i class="fa-solid fa-calendar"></i>
                        ${date}
                    </small>

                    <p>
                        ${escapeHtml(
                            comment.text
                        )}
                    </p>

                `;


                commentsContainer.appendChild(
                    commentElement
                );

            });

        } catch (error) {

            console.error(
                "Load Comments Error:",
                error
            );


            commentsContainer.innerHTML = `

                <div class="empty-comments">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <p>
                        Unable to load comments.
                    </p>

                </div>

            `;

        }

    }


    // ==========================
    // SUBMIT COMMENT
    // ==========================

    commentBtn.addEventListener(
        "click",
        async () => {

            const name =
                commentName.value.trim();


            const text =
                commentText.value.trim();


            // ==========================
            // VALIDATION
            // ==========================

            if (!name) {

                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        "Please enter your name."
                    );

                }

                commentName.focus();

                return;

            }


            if (!text) {

                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        "Please write a comment."
                    );

                }

                commentText.focus();

                return;

            }


            try {

                commentBtn.disabled = true;


                commentBtn.innerHTML = `

                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Posting...

                `;


                const response =
                    await fetch(
                        "http://localhost:5000/api/comments",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                blogId:
                                    blogId,

                                name:
                                    name,

                                text:
                                    text

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to add comment"
                    );

                }


                // Clear form
                commentName.value = "";
                commentText.value = "";


                if (
                    typeof showSuccess ===
                    "function"
                ) {

                    showSuccess(
                        "Comment added successfully!"
                    );

                }


                // Reload comments
                await loadComments();


            } catch (error) {

                console.error(
                    "Add Comment Error:",
                    error
                );


                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        "Unable to add comment."
                    );

                }

            } finally {

                commentBtn.disabled = false;


                commentBtn.innerHTML = `

                    <i class="fa-solid fa-paper-plane"></i>
                    Post Comment

                `;

            }

        }
    );


    // ==========================
    // INITIAL LOAD
    // ==========================

    await loadComments();

});