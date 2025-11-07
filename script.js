// Wait for the page to load fully
window.addEventListener("DOMContentLoaded", () => {

    // ---------- PAGE NAVIGATION ----------
    function showPage(pageName, event) {
        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active-page");
        });

        const targetPage = document.getElementById(pageName + "-page");
        if (targetPage) {
            targetPage.classList.add("active-page");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Highlight active link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.style.color = "#333";
        });

        if (event) event.target.style.color = "#c41e3a";
    }

    window.showPage = showPage; // make available globally

    // ---------- SLIDER ----------
    const slides = document.querySelectorAll(".slide");
    const dotsContainer = document.querySelector(".slider-dots");
    const prevBtn = document.querySelector(".slider-prev");
    const nextBtn = document.querySelector(".slider-next");

    if (slides.length > 0 && dotsContainer) {
        let currentSlide = 0;

        // Clear any previous dots (prevents repetition)
        dotsContainer.innerHTML = "";

        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.className = "slider-dot";
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentSlide = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".slider-dot");

        function updateSlider() {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === currentSlide);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        if (nextBtn) nextBtn.addEventListener("click", nextSlide);
        if (prevBtn) prevBtn.addEventListener("click", prevSlide);

        // Auto-slide
        let autoSlide = setInterval(nextSlide, 4000);
        const heroBanner = document.querySelector(".sale-hero-banner");

        if (heroBanner) {
            heroBanner.addEventListener("mouseenter", () => clearInterval(autoSlide));
            heroBanner.addEventListener("mouseleave", () => autoSlide = setInterval(nextSlide, 4000));
        }
    }

    // ---------- ADD TO CART ----------
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const original = btn.textContent;
            btn.textContent = "✓ Added!";
            btn.style.background = "#27ae60";
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = "#333";
            }, 2000);
        });
    });

    // ---------- NEWSLETTER ----------
    const form = document.querySelector(".newsletter-form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const btn = form.querySelector(".newsletter-btn");
            const input = form.querySelector(".newsletter-input");
            btn.textContent = "✓ Subscribed!";
            btn.style.background = "#27ae60";
            input.value = "";
            setTimeout(() => {
                btn.textContent = "Subscribe";
                btn.style.background = "white";
            }, 3000);
        });
    }

    // ---------- SMOOTH SCROLL FOR LINKS ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
});
