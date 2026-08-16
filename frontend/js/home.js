/* ===========================
        SCRIPTORA HOME
=========================== */

const BLOGS_API =
    "http://localhost:5000/api/blogs";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =============================
                SCROLL BUTTON
        ============================== */

        const scrollBtn =
            document.querySelector(
                ".scroll-down"
            );

        const featured =
            document.querySelector(
                "#featuredBlogs"
            );


        if (
            scrollBtn &&
            featured
        ) {

            scrollBtn.addEventListener(
                "click",
                () => {

                    featured.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        }


        /* =============================
                NEWSLETTER
        ============================== */

        const newsletter =
            document.querySelector(
                ".newsletter-form"
            );


        if (newsletter) {

            newsletter.addEventListener(
                "submit",
                async function (e) {

                    e.preventDefault();


                    const input =
                        this.querySelector(
                            "input"
                        );


                    const button =
                        this.querySelector(
                            "button"
                        );


                    const email =
                        input.value.trim();


                    /* =========================
                        VALIDATION
                    ========================== */

                    if (email === "") {

                        showWarning(
                            "Please enter your email."
                        );

                        return;

                    }


                    const regex =
                        /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;


                    if (!regex.test(email)) {

                        showError(
                            "Please enter a valid email."
                        );

                        return;

                    }


                    /* =========================
                        LOADING STATE
                    ========================== */

                    const originalText =
                        button.textContent;


                    button.disabled = true;

                    button.textContent =
                        "Subscribing...";


                    try {

                        const response =
                            await fetch(
                                "http://localhost:5000/api/subscribers",
                                {

                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body:
                                        JSON.stringify({
                                            email
                                        })

                                }
                            );


                        const data =
                            await response.json();


                        /* =========================
                            ERROR
                        ========================== */

                        if (
                            !response.ok ||
                            !data.success
                        ) {

                            throw new Error(
                                data.message ||
                                "Unable to subscribe"
                            );

                        }


                        /* =========================
                            SUCCESS
                        ========================== */

                        showSuccess(
                            "Subscribed successfully!"
                        );


                        this.reset();


                    } catch (error) {

                        console.error(
                            "Newsletter error:",
                            error
                        );


                        showError(
                            error.message ||
                            "Unable to subscribe. Please try again."
                        );


                    } finally {

                        button.disabled =
                            false;

                        button.textContent =
                            originalText;

                    }

                }
            );

        }


        /* =============================
                HERO ANIMATION
        ============================== */

        const hero =
            document.querySelector(
                ".hero-content"
            );


        if (hero) {

            hero.style.opacity = "0";

            hero.style.transform =
                "translateY(40px)";

            hero.style.transition = ".8s";


            setTimeout(() => {

                hero.style.opacity = "1";

                hero.style.transform =
                    "translateY(0)";

            }, 200);

        }


        /* =============================
            LOAD FEATURED BLOGS
        ============================== */

        loadFeaturedBlogs();

    }
);


/* =============================
        FEATURED BLOGS
============================== */

async function loadFeaturedBlogs() {

    const container =
        document.getElementById(
            "featuredBlogsContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-spinner fa-spin"></i>

            <h2>
                Loading Featured Blogs...
            </h2>

        </div>

    `;


    try {

        const response =
            await fetch(
                `${BLOGS_API}/featured`
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load featured blogs"
            );

        }


        const blogs =
            data.blogs || [];


        /* =============================
                NO BLOGS
        ============================== */

        if (blogs.length === 0) {

            container.innerHTML = `

                <div class="empty-state">

                    <i
                        class="fa-solid fa-book-open"
                    ></i>

                    <h2>
                        No Blogs Yet
                    </h2>

                    <p>
                        Create your first blog to see it here.
                    </p>

                    <a
                        href="pages/create-blog.html"
                        class="btn btn-primary"
                    >
                        Create Blog
                    </a>

                </div>

            `;

            return;

        }


        /* =============================
                RENDER BLOGS
        ============================== */

        container.innerHTML = "";


        blogs.forEach(blog => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "blog-card";


            const image =
                blog.image ||
                "https://placehold.co/900x500?text=Scriptora";


            const title =
                blog.title ||
                "Untitled Blog";


            const category =
                blog.category ||
                "General";


            const description =
                blog.description ||
                "";


            const author =
                blog.author ||
                "Anonymous";


            const createdAt =
                blog.createdAt
                    ? new Date(
                        blog.createdAt
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    )
                    : "";


            const blogId =
                blog._id;


            card.innerHTML = `

                <img
                    src="${image}"
                    class="blog-image"
                    alt="${title}"
                    onerror="
                        this.src='https://placehold.co/900x500?text=Scriptora'
                    "
                >


                <div class="blog-content">

                    <span class="blog-category">
                        ${category}
                    </span>


                    <h3>
                        ${title}
                    </h3>


                    <p>
                        ${description}
                    </p>


                    <div class="blog-footer">

                        <span>

                            <i
                                class="fa-solid fa-user"
                            ></i>

                            ${author}

                        </span>


                        <span>

                            <i
                                class="fa-solid fa-calendar"
                            ></i>

                            ${createdAt}

                        </span>

                    </div>


                    <div class="blog-footer">

                        <span>

                            <i
                                class="fa-solid fa-heart"
                            ></i>

                            ${blog.likes || 0}

                        </span>


                        <span>

                            <i
                                class="fa-solid fa-eye"
                            ></i>

                            ${blog.views || 0}

                        </span>


                        <span>

                            <i
                                class="fa-solid fa-comment"
                            ></i>

                            ${blog.commentCount || 0}

                        </span>

                    </div>


                    <button
                        class="btn btn-outline"
                        data-blog-id="${blogId}"
                    >
                        Read More
                    </button>

                </div>

            `;


            const readMoreButton =
                card.querySelector(
                    "[data-blog-id]"
                );


            readMoreButton.addEventListener(
                "click",
                () => {

                    openBlog(blogId);

                }
            );


            container.appendChild(card);

        });


        animateCards();


    } catch (error) {

        console.error(
            "Featured blogs error:",
            error
        );


        container.innerHTML = `

            <div class="empty-state">

                <i
                    class="fa-solid fa-circle-exclamation"
                ></i>

                <h2>
                    Unable to Load Featured Blogs
                </h2>

                <p>
                    Please make sure the backend server is running.
                </p>

                <button
                    class="btn btn-primary"
                    onclick="loadFeaturedBlogs()"
                >
                    Retry
                </button>

            </div>

        `;

    }

}


/* =============================
        OPEN BLOG
============================== */

function openBlog(id) {

    if (!id) {

        console.error(
            "Blog ID is missing."
        );

        return;

    }


    window.location.href =
        `pages/blog-details.html?id=${encodeURIComponent(id)}`;

}


/* =============================
        CARD ANIMATION
============================== */

function animateCards() {

    const cards =
        document.querySelectorAll(
            ".blog-card"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show-card"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    cards.forEach(
        card =>
            observer.observe(card)
    );

}