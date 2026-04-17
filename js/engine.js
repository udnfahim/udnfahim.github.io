/* --- SYSTEM_NODE: INTERACTION_ENGINE v2.0.0 --- */

const MainEngine = {
    init() {
        try {
            this.initRevealObserver();
            this.initSmoothScroll();
        } catch (error) {
            console.error("System_Engine_Fault:", error);
        }
    },

    initRevealObserver() {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -80px 0px"
        });

        document.querySelectorAll(".reveal").forEach((element, index) => {
            // Versioned stagger timing keeps motion deterministic across pages while avoiding per-page inline overrides.
            element.style.setProperty("--reveal-delay", `${(index % 5) * 150}ms`);

            if (element instanceof HTMLElement) {
                revealObserver.observe(element);
            }
        });
    },

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (event) => {
                const targetId = anchor.getAttribute("href");
                if (!targetId || targetId === "#") {
                    return;
                }

                const target = document.querySelector(targetId);
                if (!target) {
                    return;
                }

                event.preventDefault();

                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 100,
                    behavior: "smooth"
                });
            });
        });
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => MainEngine.init());
} else {
    MainEngine.init();
}
