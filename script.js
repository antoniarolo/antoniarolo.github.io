/* =========================================
   ANT0NIA ROLO — PORTFOLIO INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Add a small shadow to the navigation
     * once the user begins scrolling.
     */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /*
     * Smooth scrolling for internal navigation links.
     * CSS already provides smooth scrolling, but this
     * gives us better control over the header offset.
     */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /*
     * Reveal sections as the visitor scrolls.
     * This keeps the effect subtle and respects
     * reduced-motion preferences.
     */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {

        const revealElements = document.querySelectorAll(
            ".section-heading, .experience-item, .education-card, .project-card, .two-column, .interests"
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
        });

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    }

});
/* =========================================
   SCROLL REVEAL
   ========================================= */

.reveal {
    opacity: 0;
    transform: translateY(25px);

    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

.site-header {
    transition:
        background 0.3s ease,
        box-shadow 0.3s ease;
}

.site-header.scrolled {
    background: rgba(245, 244, 239, 0.94);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
}
