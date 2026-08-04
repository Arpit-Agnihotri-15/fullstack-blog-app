/* ===============SCRIPTORA HOME JS=============*/

document.addEventListener("DOMContentLoaded", () => {

    /* =============SCROLL DOWN BUTTON============ */

    const scrollBtn = document.querySelector(".scroll-down");
    const featuredSection = document.querySelector("#featured");
    if(scrollBtn && featuredSection){
        scrollBtn.addEventListener("click", () => {
            featuredSection.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    /* ==============NEWSLETTER FORM=============== */

    const form = document.querySelector(".newsletter-form");
    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();
            const email = this.querySelector("input");
            const value = email.value.trim();
            if(value === ""){
                alert("Please enter your email.");
                return;
            }
            const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(value)){
                alert("Please enter a valid email.");
                return;
            }
            alert("Thank you for subscribing!");
            form.reset();
        });
    }

    /* ============HERO FADE IN=============== */

    const hero = document.querySelector(".hero-content");
    if(hero){
        hero.style.opacity = 0;
        hero.style.transform = "translateY(40px)";
        hero.style.transition =
        "all .9s ease";
        setTimeout(()=>{
            hero.style.opacity = 1;
            hero.style.transform = "translateY(0px)";
        },200);
    }

    /* ===========FEATURED BLOG CARDS============== */

    const cards = document.querySelectorAll(".blog-card");
    if(cards.length){
        const observer = new IntersectionObserver(entries=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    entry.target.classList.add("show-card");
                }
            });
        },{
            threshold:.25
        });
        cards.forEach(card=>{
            observer.observe(card);
        });
    }

    /* ==============CATEGORY HOVER================ */

    document.querySelectorAll(".category-chip").forEach(chip=>{
        chip.addEventListener("mouseenter",()=>{
            chip.style.transform="translateY(-6px)";
        });
        chip.addEventListener("mouseleave",()=>{
            chip.style.transform="translateY(0px)";
        });
    });
});