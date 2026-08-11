document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // DOM ELEMENTS
    // =============================

    const form = document.getElementById("createBlogForm");

    const title = document.getElementById("blogTitle");
    const category = document.getElementById("blogCategory");
    const image = document.getElementById("blogImage");
    const description = document.getElementById("blogDescription");
    const content = document.getElementById("blogContent");
    const tags = document.getElementById("blogTags");

    const previewBtn = document.getElementById("previewBtn");
    const draftBtn = document.getElementById("draftBtn");

    const previewBox = document.getElementById("previewBox");

    const wordCount = document.getElementById("wordCount");

    const submitBtn = form.querySelector("button[type='submit']");

    // Backend API
    const API_URL = "http://localhost:5000/api/blogs";


    // =============================
    // EDIT MODE
    // =============================

    const editBlogId = localStorage.getItem("editBlog");

    let editingBlog = null;

    if (editBlogId) {

        const blogs =
            JSON.parse(localStorage.getItem("blogs")) || [];

        editingBlog =
            blogs.find(blog => blog.id == editBlogId);

        if (editingBlog) {

            title.value = editingBlog.title;

            category.value = editingBlog.category;

            image.value = editingBlog.image;

            description.value = editingBlog.description;

            content.value = editingBlog.content;

            tags.value = editingBlog.tags.join(", ");

            submitBtn.innerHTML =
                '<i class="fa-solid fa-pen"></i> Update Blog';

            const words =
                editingBlog.content
                    .trim()
                    .split(/\s+/)
                    .filter(word => word.length > 0);

            wordCount.textContent = words.length;

        }

    }


    // =============================
    // WORD COUNTER
    // =============================

    content.addEventListener("input", () => {

        const words =
            content.value
                .trim()
                .split(/\s+/)
                .filter(word => word.length > 0);

        wordCount.textContent =
            content.value.trim() === ""
                ? 0
                : words.length;

    });


    // =============================
    // PREVIEW
    // =============================

    previewBtn.addEventListener("click", () => {

        if (
            title.value.trim() === "" ||
            description.value.trim() === "" ||
            content.value.trim() === ""
        ) {

            showError("Please fill required fields.");

            return;

        }

        document.getElementById("previewTitle").textContent =
            title.value;

        document.getElementById("previewDescription").textContent =
            description.value;

        document.getElementById("previewContent").innerHTML =
            content.value.replace(/\n/g, "<br>");

        document.getElementById("previewImage").src =
            image.value ||
            "https://placehold.co/900x400?text=Scriptora";

        previewBox.style.display = "block";

        previewBox.scrollIntoView({
            behavior: "smooth"
        });

    });


    // =============================
    // SAVE DRAFT
    // =============================

    draftBtn.addEventListener("click", () => {

        const loggedUser =
            JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedUser) {

            showError("Please login first.");

            return;

        }

        const draft = {

            title: title.value,

            category: category.value,

            image: image.value,

            description: description.value,

            content: content.value,

            tags: tags.value,

            author: loggedUser.name,

            createdAt:
                new Date().toLocaleString(),

            status: "Draft"

        };

        let drafts =
            JSON.parse(localStorage.getItem("draftBlogs")) || [];

        drafts.push(draft);

        localStorage.setItem(
            "draftBlogs",
            JSON.stringify(drafts)
        );

        showSuccess("Draft Saved Successfully!");

    });


    // =============================
    // PUBLISH BLOG
    // =============================

    form.addEventListener("submit", async (e) => {

        e.preventDefault();


        // =============================
        // VALIDATION
        // =============================

        if (
            title.value.trim() === "" ||
            category.value === "" ||
            description.value.trim() === "" ||
            content.value.trim() === ""
        ) {

            showError("Please fill all required fields.");

            return;

        }


        // =============================
        // CHECK LOGIN
        // =============================

        const loggedUser =
            JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedUser) {

            showError("Please login before publishing a blog.");

            return;

        }


        // =============================
        // EDIT MODE
        // =============================

        if (editingBlog) {

            showInfo(
                "Blog editing will be connected to the backend in the CRUD module."
            );

            return;

        }


        // =============================
        // PREPARE BLOG DATA
        // =============================

        const blogData = {

            title: title.value.trim(),

            category: category.value,

            image:
                image.value.trim() ||
                "https://placehold.co/900x400?text=Scriptora",

            description:
                description.value.trim(),

            content:
                content.value.trim(),

            tags: tags.value
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== ""),

            author:
                loggedUser.name

        };


        // =============================
        // LOADING STATE
        // =============================

        submitBtn.disabled = true;

        submitBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';


        try {

            // =============================
            // SEND TO BACKEND
            // =============================

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(blogData)

            });


            const data = await response.json();


            // =============================
            // HANDLE ERROR
            // =============================

            if (!response.ok) {

                showError(
                    data.message ||
                    "Unable to publish blog."
                );

                return;

            }


            // =============================
            // SUCCESS
            // =============================

            console.log(
                "Blog created successfully:",
                data
            );

            showSuccess(
                "Blog Published Successfully!"
            );


            // =============================
            // RESET FORM
            // =============================

            form.reset();

            previewBox.style.display = "none";

            wordCount.textContent = 0;

            submitBtn.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Publish Blog';


            // =============================
            // REDIRECT
            // =============================

            setTimeout(() => {

                window.location.href =
                    "my-blogs.html";

            }, 1500);


        } catch (error) {

            console.error(
                "Create Blog Error:",
                error
            );

            showError(
                "Unable to connect to the backend server."
            );

        } finally {

            submitBtn.disabled = false;

            if (!editingBlog) {

                submitBtn.innerHTML =
                    '<i class="fa-solid fa-paper-plane"></i> Publish Blog';

            }

        }

    });

});