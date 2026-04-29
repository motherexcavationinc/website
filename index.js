document.addEventListener("DOMContentLoaded", () => {
  const menuToggle  = document.getElementById("menu-toggle");
  const mobileMenu  = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeBtn    = document.getElementById("closeBtn");
  const header      = document.querySelector("header");

  function setMenuOpen(open) {
    mobileMenu.classList.toggle("active", open);
    menuOverlay.classList.toggle("active", open);
    menuToggle.classList.toggle("active", open);
    header.classList.toggle("hide-nav", open);

    document.querySelectorAll(".dropdown-content").forEach(dd => dd.classList.remove("show"));
    document.querySelectorAll(".arrow-btn").forEach(a  => a.classList.remove("open"));
  }

  menuToggle .addEventListener("click", ()  => setMenuOpen(true));
  closeBtn   .addEventListener("click", ()  => setMenuOpen(false));
  menuOverlay.addEventListener("click", ()  => setMenuOpen(false));
  window     .addEventListener("resize", () => { if (window.innerWidth > 900) setMenuOpen(false); });

  document.querySelectorAll(".mobile-dropdown .dropdown-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      const arrow = btn.querySelector(".arrow-btn");
      const isOpen = dropdown.classList.contains("show");

      document.querySelectorAll(".dropdown-content").forEach(dd => dd.classList.remove("show"));
      document.querySelectorAll(".arrow-btn").forEach(a  => a.classList.remove("open"));

      if (!isOpen) {
        dropdown.classList.add("show");
        if (arrow) arrow.classList.add("open");
      }
    });
  });

  const staticAnimated = document.querySelectorAll(
    ".reveal, .slide-left, .slide-right, .reveal-stagger"
  );

  const autoReveal = document.querySelectorAll(
    ".card, .service-text-flip, .service-photo-flip, .about-media, .about-text, .gallery img"
  );

  autoReveal.forEach(el => {
    if (!el.classList.contains("reveal") &&
        !el.classList.contains("slide-left") &&
        !el.classList.contains("slide-right")) {
      el.classList.add("reveal");
    }
  });

  const allAnimated = document.querySelectorAll(
    ".reveal, .slide-left, .slide-right, .reveal-stagger"
  );

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  allAnimated.forEach(el => revealObserver.observe(el));

  const gallery = document.querySelector(".gallery");
  if (gallery) {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const page = segments[segments.length - 1] || "hauling";
    const folder = `../images/${page}/`;
    const maxImages = 9;

    for (let i = 1; i <= maxImages; i++) {
      const probe = new Image();
      probe.src = `${folder}${page}-${i}.png`;
      probe.onload  = () => {
        const img = document.createElement("img");
        img.src = probe.src;
        img.alt = `${page} example ${i}`;
        gallery.appendChild(img);
      };
    }
  }

  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

});
