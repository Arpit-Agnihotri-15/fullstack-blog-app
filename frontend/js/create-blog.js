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

    form.addEventListener("submit", (e) => {

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

    const loggedUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    let blogs =
        JSON.parse(localStorage.getItem("blogs")) || [];

    // =============================
    // BLOG OBJECT
    // =============================

    const blogData = {

        id: editingBlog ? editingBlog.id : Date.now(),

        title: title.value,

        category: category.value,

        image:
            image.value ||
            "https://placehold.co/900x400?text=Scriptora",

        description: description.value,

        content: content.value,

        tags: tags.value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== ""),

        author: loggedUser.name,

        createdAt: editingBlog
            ? editingBlog.createdAt
            : new Date().toLocaleDateString(),

        status: "Published"

    };

    // =============================
    // UPDATE BLOG
    // =============================

    if (editingBlog) {

        blogs = blogs.map(blog =>

            blog.id == editingBlog.id

                ? blogData

                : blog

        );

        localStorage.setItem(

            "blogs",

            JSON.stringify(blogs)

        );

        localStorage.removeItem("editBlog");

        showSuccess("Blog Updated Successfully!");

    }

    // =============================
    // CREATE BLOG
    // =============================

    else {

        blogs.push(blogData);

        localStorage.setItem(

            "blogs",

            JSON.stringify(blogs)

        );

        showSuccess("Blog Published Successfully!");

    }

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

        window.location.href = "my-blogs.html";

    }, 1500);

});

});