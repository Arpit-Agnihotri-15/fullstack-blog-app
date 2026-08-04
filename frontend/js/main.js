/* ============SCRIPTORA MAIN JS=============*/

document.addEventListener("DOMContentLoaded", () => {

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
    window.addEventListener("scroll", () => {
        if(window.scrollY > 40){
            navbar.classList.add("navbar-scrolled");
        }
        else{
            navbar.classList.remove("navbar-scrolled");
        }
    });

    /* ===============ACTIVE NAVIGATION==============*/

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const height = section.offsetHeight;
            if(window.scrollY >= top){
                current = section.getAttribute("id");
            }
        });
        navItems.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if(href === "#" + current){
                link.classList.add("active");
            }
        });
    });

    /* =============SMOOTH SCROLL LINKS============= */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e){
            const target = document.querySelector(this.getAttribute("href"));
            if(target){
                e.preventDefault();
                target.scrollIntoView({
                    behavior:"smooth"
                });
            }
        });
    });
});