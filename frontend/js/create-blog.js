document.addEventListener("DOMContentLoaded", async () => {

    // =============================
    // AUTHENTICATION CHECK
    // =============================

    const loggedUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );

    // If user is not logged in,
    // redirect immediately to login page
    if (!loggedUser) {

        window.location.href = "login.html";

        return;

    }


    // =============================
    // DOM ELEMENTS
    // =============================

    const form =
        document.getElementById(
            "createBlogForm"
        );

    const title =
        document.getElementById(
            "blogTitle"
        );

    const category =
        document.getElementById(
            "blogCategory"
        );

    const image =
        document.getElementById(
            "blogImage"
        );

    const description =
        document.getElementById(
            "blogDescription"
        );

    const content =
        document.getElementById(
            "blogContent"
        );

    const tags =
        document.getElementById(
            "blogTags"
        );

    const previewBtn =
        document.getElementById(
            "previewBtn"
        );

    const draftBtn =
        document.getElementById(
            "draftBtn"
        );

    const previewBox =
        document.getElementById(
            "previewBox"
        );

    const wordCount =
        document.getElementById(
            "wordCount"
        );

    const submitBtn =
        form.querySelector(
            "button[type='submit']"
        );


    // =============================
    // API CONFIG
    // =============================

    const API_URL =
        "http://localhost:5000/api/blogs";


    // =============================
    // EDIT MODE
    // =============================

    const editBlogId =
        localStorage.getItem(
            "editBlog"
        );

    let editingBlog = null;


    // =============================
    // LOAD BLOG FOR EDITING
    // =============================

    if (editBlogId) {

        try {

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';


            const response =
                await fetch(
                    `${API_URL}/${editBlogId}`
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to load blog"
                );

            }


            editingBlog =
                data.blog;


            // =============================
            // FILL FORM
            // =============================

            title.value =
                editingBlog.title || "";

            category.value =
                editingBlog.category || "";

            image.value =
                editingBlog.image || "";

            description.value =
                editingBlog.description || "";

            content.value =
                editingBlog.content || "";

            tags.value =
                Array.isArray(
                    editingBlog.tags
                )
                    ? editingBlog.tags.join(", ")
                    : "";


            // =============================
            // CHANGE PAGE TITLE
            // =============================

            const pageTitle =
                document.querySelector(
                    ".page-header h1"
                );


            if (pageTitle) {

                pageTitle.textContent =
                    "Edit Blog";

            }


            const pageDescription =
                document.querySelector(
                    ".page-header p"
                );


            if (pageDescription) {

                pageDescription.textContent =
                    "Update your blog and publish the latest version.";

            }


            // =============================
            // CHANGE BUTTON
            // =============================

            submitBtn.innerHTML =
                '<i class="fa-solid fa-pen"></i> Update Blog';


            // =============================
            // UPDATE WORD COUNT
            // =============================

            updateWordCount();


        } catch (error) {

            console.error(
                "Load blog for editing error:",
                error
            );


            if (
                typeof showError ===
                "function"
            ) {

                showError(
                    error.message ||
                    "Unable to load blog."
                );

            } else {

                alert(
                    error.message ||
                    "Unable to load blog."
                );

            }


            // Remove invalid edit state

            localStorage.removeItem(
                "editBlog"
            );


            setTimeout(() => {

                window.location.href =
                    "my-blogs.html";

            }, 1200);


            return;


        } finally {

            submitBtn.disabled =
                false;

        }

    }


    // =============================
    // WORD COUNTER
    // =============================

    function updateWordCount() {

        const text =
            content.value.trim();


        if (!text) {

            wordCount.textContent =
                "0";

            return;

        }


        const words =
            text
                .split(/\s+/)
                .filter(
                    word =>
                        word.length > 0
                );


        wordCount.textContent =
            words.length;

    }


    content.addEventListener(
        "input",
        updateWordCount
    );


    // =============================
    // PREVIEW
    // =============================

    previewBtn.addEventListener(
        "click",
        () => {

            if (
                title.value.trim() === "" ||
                description.value.trim() === "" ||
                content.value.trim() === ""
            ) {

                showError(
                    "Please fill required fields."
                );

                return;

            }


            document.getElementById(
                "previewTitle"
            ).textContent =
                title.value;


            document.getElementById(
                "previewDescription"
            ).textContent =
                description.value;


            document.getElementById(
                "previewContent"
            ).innerHTML =
                content.value.replace(
                    /\n/g,
                    "<br>"
                );


            document.getElementById(
                "previewImage"
            ).src =
                image.value.trim() ||
                "https://placehold.co/900x400?text=Scriptora";


            previewBox.style.display =
                "block";


            previewBox.scrollIntoView({
                behavior: "smooth"
            });

        }
    );


    // =============================
    // SAVE DRAFT
    // =============================

    draftBtn.addEventListener(
        "click",
        () => {

            // loggedUser is already checked
            // when the page loads

            const draft = {

                title:
                    title.value.trim(),

                category:
                    category.value,

                image:
                    image.value.trim(),

                description:
                    description.value.trim(),

                content:
                    content.value.trim(),

                tags:
                    tags.value,

                author:
                    loggedUser.name,

                authorId:
                    loggedUser.id,

                createdAt:
                    new Date().toLocaleString(),

                status:
                    "Draft"

            };


            let drafts =
                JSON.parse(
                    localStorage.getItem(
                        "draftBlogs"
                    )
                ) || [];


            drafts.push(
                draft
            );


            localStorage.setItem(
                "draftBlogs",
                JSON.stringify(
                    drafts
                )
            );


            showSuccess(
                "Draft Saved Successfully!"
            );

        }
    );


    // =============================
    // CREATE / UPDATE BLOG
    // =============================

    form.addEventListener(
        "submit",
        async (e) => {

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

                showError(
                    "Please fill all required fields."
                );

                return;

            }


            // =============================
            // LOGIN CHECK
            // =============================

            // Keep this second check as
            // protection in case login state
            // changes while page is open.

            const currentUser =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInUser"
                    )
                );


            if (!currentUser) {

                showError(
                    "Please login before publishing a blog."
                );

                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1000);

                return;

            }


            // =============================
            // PREPARE BLOG DATA
            // =============================

            const blogData = {

                title:
                    title.value.trim(),

                category:
                    category.value,

                image:
                    image.value.trim() ||
                    "https://placehold.co/900x400?text=Scriptora",

                description:
                    description.value.trim(),

                content:
                    content.value.trim(),

                tags:
                    tags.value
                        .split(",")
                        .map(
                            tag =>
                                tag.trim()
                        )
                        .filter(
                            tag =>
                                tag !== ""
                        ),

                author:
                    currentUser.name,

                authorId:
                    currentUser.id

            };


            // =============================
            // LOADING STATE
            // =============================

            submitBtn.disabled =
                true;


            submitBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> ' +
                (
                    editingBlog
                        ? "Updating..."
                        : "Publishing..."
                );


            try {

                let response;


                // =================================================
                // UPDATE EXISTING BLOG
                // =================================================

                if (editingBlog) {

                    response =
                    await fetch(
                        `${API_URL}/${editingBlog._id}`,
                        {

                            method:
                                "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${currentUser.token}`
                            },

                            body:
                                JSON.stringify(
                                    blogData
                                )

                        }
                    );

                }


                // =================================================
                // CREATE NEW BLOG
                // =================================================

                else {

                    response =
                    await fetch(
                        API_URL,
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${currentUser.token}`
                            },

                            body:
                                JSON.stringify(
                                    blogData
                                )

                        }
                    );

                }


                // =============================
                // RESPONSE
                // =============================

                const data =
                    await response.json();


                // =============================
                // HANDLE ERROR
                // =============================

                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        (
                            editingBlog
                                ? "Unable to update blog."
                                : "Unable to publish blog."
                        )
                    );

                }


                // =============================
                // SUCCESS
                // =============================

                console.log(
                    editingBlog
                        ? "Blog updated successfully:"
                        : "Blog created successfully:",
                    data
                );


                if (editingBlog) {

                    showSuccess(
                        "Blog Updated Successfully!"
                    );

                } else {

                    showSuccess(
                        "Blog Published Successfully!"
                    );

                }


                // =============================
                // CLEAR EDIT MODE
                // =============================

                localStorage.removeItem(
                    "editBlog"
                );


                // =============================
                // REDIRECT
                // =============================

                setTimeout(() => {

                    window.location.href =
                        "my-blogs.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "Create/Update Blog Error:",
                    error
                );


                showError(
                    error.message ||
                    "Unable to connect to the backend server."
                );


                // Re-enable button

                submitBtn.disabled =
                    false;


                submitBtn.innerHTML =
                    editingBlog

                        ? '<i class="fa-solid fa-pen"></i> Update Blog'

                        : '<i class="fa-solid fa-paper-plane"></i> Publish Blog';

            }

        }
    );

});