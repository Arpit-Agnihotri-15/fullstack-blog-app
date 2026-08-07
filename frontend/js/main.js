/* ============ SCRIPTORA MAIN JS ============ */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
            AUTHENTICATION NAVBAR
    ========================================== */

    const guestMenu = document.getElementById("guestMenu");
    const userMenu = document.getElementById("userMenu");
    const userName = document.getElementById("navbarUserName");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownBtn = document.getElementById("userDropdownBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    /* ---------- Login Success Toast ---------- */

    const loginToast = localStorage.getItem("loginToast");

    if (loginToast && typeof showSuccess === "function") {

        showSuccess(loginToast);

        localStorage.removeItem("loginToast");

    }

    /* ---------- Show Logged In User ---------- */

    if (loggedInUser) {

        if (guestMenu)
            guestMenu.classList.add("hidden");

        if (userMenu)
            userMenu.classList.remove("hidden");

        if (userName)
            userName.textContent = loggedInUser.name;

    }

    else {

        if (guestMenu)
            guestMenu.classList.remove("hidden");

        if (userMenu)
            userMenu.classList.add("hidden");

    }

    /* ==========================================
                MOBILE MENU
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (!icon) return;

            if (navLinks.classList.contains("active")) {

                icon.classList.replace("fa-bars", "fa-xmark");

            }

            else {

                icon.classList.replace("fa-xmark", "fa-bars");

            }

        });

    }

    /* ==========================================
            CLOSE MOBILE MENU
    ========================================== */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            if (navLinks)
                navLinks.classList.remove("active");

            if (menuToggle) {

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    });

    /* ==========================================
                STICKY NAVBAR
    ========================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            navbar.classList.toggle(
                "navbar-scrolled",
                window.scrollY > 40
            );

        });

    }

        /* ==========================================
            ACTIVE NAVIGATION
    ========================================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    if (sections.length && navItems.length) {

        window.addEventListener("scroll", () => {

            let current = "";

            sections.forEach(section => {

                const top = section.offsetTop - 150;

                if (window.scrollY >= top) {

                    current = section.getAttribute("id");

                }

            });

            navItems.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + current) {

                    link.classList.add("active");

                }

            });

        });

    }

    /* ==========================================
            USER DROPDOWN
    ========================================== */

    if (dropdownBtn && dropdownMenu) {

        dropdownBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            dropdownMenu.classList.toggle("show");

        });

    }

    document.addEventListener("click", function () {

        if (dropdownMenu) {

            dropdownMenu.classList.remove("show");

        }

    });

    /* Prevent closing when clicking inside */

    if (dropdownMenu) {

        dropdownMenu.addEventListener("click", function (e) {

            e.stopPropagation();

        });

    }

    /* ==========================================
                LOGOUT
    ========================================== */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", async function (e) {

            e.preventDefault();

            const confirmed = typeof confirmAction === "function"
                ? await confirmAction(
                    "Are you sure you want to logout?",
                    {
                        title: "Logout",
                        confirmText: "Logout",
                        icon: "fa-right-from-bracket",
                        tone: "danger"
                    }
                )
                : true;

            if (!confirmed) return;

            localStorage.removeItem("loggedInUser");

            if (typeof showSuccess === "function") {

                showSuccess("Logged out successfully!");

            }

            /* Works whether we're at the site root (index.html)
               or one level deep inside /pages/ */

            const inPagesFolder =
                window.location.pathname.includes("/pages/");

            setTimeout(() => {

                window.location.href =
                    inPagesFolder ? "../index.html" : "index.html";

            }, 1000);

        });

    }

});