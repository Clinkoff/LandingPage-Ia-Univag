document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");

  function handleHeaderScroll() {
    if (window.scrollY > 100) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }
  window.addEventListener("scroll", handleHeaderScroll);
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".slider-indicator");
  let currentSlide = 0;
  const slideInterval = 5000;
  let autoSlideTimer;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) =>
      indicator.classList.remove("opacity-100")
    );
    indicators.forEach((indicator) => indicator.classList.add("opacity-50"));

    slides[index].classList.add("active");
    indicators[index].classList.remove("opacity-50");
    indicators[index].classList.add("opacity-100");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  startAutoSlide();

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      stopAutoSlide();
      currentSlide = index;
      showSlide(currentSlide);
      startAutoSlide();
    });
  });

  const heroSection = document.getElementById("hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", stopAutoSlide);
    heroSection.addEventListener("mouseleave", startAutoSlide);
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".slide-up");
  animatedElements.forEach((element) => {
    fadeInObserver.observe(element);
  });

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#" || targetId === "") {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const parallaxSection = document.querySelector(".parallax-bg");

  if (parallaxSection) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      const rect = parallaxSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const yPos = -(scrolled * parallaxSpeed);
        parallaxSection.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  }

  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }

          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = "<span>ENVIANDO...</span>";
      btn.classList.add("opacity-75", "cursor-not-allowed");

      setTimeout(() => {
        alert(
          "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve."
        );

        contactForm.reset();

        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.classList.remove("opacity-75", "cursor-not-allowed");
      }, 1500);
    });
  }
});
