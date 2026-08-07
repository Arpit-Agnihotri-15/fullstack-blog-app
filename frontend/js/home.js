/* ===========================
        SCRIPTORA HOME
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =============================
            SCROLL BUTTON
    ============================== */

    const scrollBtn = document.querySelector(".scroll-down");
    const featured = document.querySelector("#featured");

    if (scrollBtn && featured) {

        scrollBtn.addEventListener("click", () => {

            featured.scrollIntoView({

                behavior: "smooth"

            });

        });

    }

    /* =============================
            NEWSLETTER
    ============================== */

    const newsletter = document.querySelector(".newsletter-form");

    if (newsletter) {

        newsletter.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = this.querySelector("input").value.trim();

            if (email === "") {

                showWarning("Please enter your email.");

                return;

            }

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!regex.test(email)) {

                showError("Please enter a valid email.");

                return;

            }

            showSuccess("Subscribed Successfully!");

            this.reset();

        });

    }

    /* =============================
            HERO ANIMATION
    ============================== */

    const hero = document.querySelector(".hero-content");

    if (hero) {

        hero.style.opacity = "0";

        hero.style.transform = "translateY(40px)";

        hero.style.transition = ".8s";

        setTimeout(() => {

            hero.style.opacity = "1";

            hero.style.transform = "translateY(0)";

        }, 200);

    }

    /* =============================
        LOAD FEATURED BLOGS
    ============================== */

    loadFeaturedBlogs();

});

/* =============================
        FEATURED BLOGS
============================== */

function loadFeaturedBlogs() {

    const container = document.getElementById("featuredBlogsContainer");

    if (!container) return;

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    container.innerHTML = "";

    if (blogs.length === 0) {

        container.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-book-open"></i>

            <h2>No Blogs Yet</h2>

            <p>Create your first blog to see it here.</p>

            <a href="pages/create-blog.html" class="btn btn-primary">

                Create Blog

            </a>

        </div>

        `;

        return;

    }

    const featured = [...blogs]

        .reverse()

        .slice(0, 3);

    featured.forEach(blog => {

        container.innerHTML += `

        <article class="blog-card">

            <img

                src="${blog.image}"

                class="blog-image"

                alt="${blog.title}"

                onerror="this.src='https://picsum.photos/900/500';">

            <div class="blog-content">

                <span class="blog-category">
                    ${blog.category}
                </span>

                <h3>${blog.title}</h3>

                <p>${blog.description}</p>

                <div class="blog-footer">

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

                    class="btn btn-outline"

                    onclick="openBlog(${blog.id})">

                    Read More

                </button>

            </div>

        </article>

        `;

    });

    animateCards();

}

/* =============================
        OPEN BLOG
============================== */

function openBlog(id) {

    localStorage.setItem("selectedBlog", id);

    window.location.href = "pages/blog-details.html";

}

/* =============================
        CARD ANIMATION
============================== */

function animateCards() {

    const cards = document.querySelectorAll(".blog-card");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show-card");

            }

        });

    }, {

        threshold: .2

    });

    cards.forEach(card => observer.observe(card));

}