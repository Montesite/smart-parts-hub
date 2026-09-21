(function () {
  "use strict";

  var HEADER_OFFSET = 80;

  /* ===== Header scroll state ===== */
  var header = document.getElementById("siteHeader");
  if (header && !header.classList.contains("is-vitrine")) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  /* ===== Mobile menu ===== */
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");
  var iconMenu = document.getElementById("iconMenu");
  var iconClose = document.getElementById("iconClose");

  function setMenuOpen(isOpen) {
    if (!navMobile) return;
    navMobile.classList.toggle("is-open", isOpen);
    if (iconMenu) iconMenu.style.display = isOpen ? "none" : "block";
    if (iconClose) iconClose.style.display = isOpen ? "block" : "none";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setMenuOpen(!navMobile.classList.contains("is-open"));
    });
  }

  /* ===== Smooth scroll to section ===== */
  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
    window.scrollTo({ top: top, behavior: "smooth" });
    setMenuOpen(false);
  }

  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      scrollToSection(btn.getAttribute("data-scroll"));
    });
  });

  /* ===== Footer year ===== */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== WhatsApp conversion tracking ===== */
  function trackConversion(sendTo, extra) {
    if (typeof window.gtag === "function") {
      var payload = Object.assign({ send_to: sendTo }, extra || {});
      window.gtag("event", "conversion", payload);
    }
  }

  var heroWhatsapp = document.getElementById("heroWhatsapp");
  if (heroWhatsapp) {
    heroWhatsapp.addEventListener("click", function () {
      trackConversion("AW-17990045176/irIqCPXzw4IcEPibqYJD");
    });
  }

  var floatingWhatsapp = document.getElementById("floatingWhatsapp");
  if (floatingWhatsapp) {
    floatingWhatsapp.addEventListener("click", function () {
      trackConversion("AW-17990045176/3oBdCNuA2oIcEPibqYJD", { value: 1.0, currency: "BRL" });
    });
  }

  /* ===== Product carousel ===== */
  var track = document.getElementById("carouselTrack");
  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var prevBtn = document.getElementById("carouselPrev");
    var nextBtn = document.getElementById("carouselNext");
    var currentIndex = 0;
    var autoplayTimer = null;

    function slidesPerView() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    }

    function maxIndex() {
      return Math.max(0, slides.length - slidesPerView());
    }

    function render() {
      currentIndex = Math.min(currentIndex, maxIndex());
      var offset = slides[currentIndex] ? slides[currentIndex].offsetLeft : 0;
      track.style.transform = "translateX(-" + offset + "px)";
    }

    function goNext() {
      currentIndex = currentIndex >= maxIndex() ? 0 : currentIndex + 1;
      render();
    }

    function goPrev() {
      currentIndex = currentIndex <= 0 ? maxIndex() : currentIndex - 1;
      render();
    }

    function startAutoplay() {
      autoplayTimer = window.setInterval(goNext, 3000);
    }

    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (prevBtn) prevBtn.addEventListener("click", goPrev);

    window.addEventListener("resize", render);
    render();
    startAutoplay();
  }

  /* ===== Lightbox ===== */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxOverlay = document.getElementById("lightboxOverlay");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (el) {
    el.addEventListener("click", function () {
      openLightbox(el.getAttribute("data-src"), el.getAttribute("data-alt"));
    });
  });

  if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
