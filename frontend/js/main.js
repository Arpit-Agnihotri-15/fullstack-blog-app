/* ============SCRIPTORA MAIN JS=============*/

document.addEventListener("DOMContentLoaded", () => {

    /* ============ LOGIN SUCCESS TOAST ============ */

    const loginToast = localStorage.getItem("loginToast");
    if (loginToast) {
        showSuccess(loginToast);
        localStorage.removeItem("loginToast");
    }

    /* ===============MOBILE MENU=============== */
    
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if(menuToggle && navLinks){
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if(navLinks.classList.contains("active")){
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }
            else{
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }

    /* =============CLOSE MENU AFTER CLICK============ */

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            if(navLinks){
                navLinks.classList.remove("active");
            }
            if(menuToggle){
                const icon = menuToggle.querySelector("i");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    });

    /* ==============STICKY NAVBAR================ */

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        });
    }

    /* ===============ACTIVE NAVIGATION==============*/

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

    /* =============SMOOTH SCROLL LINKS============= */

    const navLinksList = document.querySelectorAll(".nav-links a");
    if (navLinksList.length) {
        navLinksList.forEach(link => {
            link.addEventListener("click", () => {
                if (navLinks) navLinks.classList.remove("active");
                if (menuToggle) {
                    const icon = menuToggle.querySelector("i");
                    if (icon) {
                        icon.classList.remove("fa-xmark");
                        icon.classList.add("fa-bars");
                    }
                }
            });
        });
    }
});