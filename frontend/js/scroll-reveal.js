/* =====================================================
        SCRIPTORA SCROLL REVEAL
        Adds "in-view" class to .fade-up elements as
        they enter the viewport.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const revealEls = document.querySelectorAll(".fade-up");

    if (!revealEls.length) return;

    if (!("IntersectionObserver" in window)) {

        revealEls.forEach(el => el.classList.add("in-view"));
        return;

    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: .15
    });

    revealEls.forEach((el, index) => {

        el.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
        observer.observe(el);

    });

});
