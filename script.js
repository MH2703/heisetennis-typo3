(() => {
  // Year
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const sidebar = document.getElementById("sidebar");
  const btn = sidebar?.querySelector(".toggle");
  const nav = document.getElementById("nav");

  const setOpen = (open) => {
    sidebar.classList.toggle("open", open);
    btn?.setAttribute("aria-expanded", String(open));
    const sr = btn?.querySelector(".sr-only");
    if (sr) sr.textContent = open ? "Menü schließen" : "Menü öffnen";
    document.body.style.overflow = open ? "hidden" : "";
  };

  btn?.addEventListener("click", () => setOpen(!sidebar.classList.contains("open")));

  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (sidebar?.classList.contains("open") && !sidebar.contains(e.target)) setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 981px)").matches) setOpen(false);
  });

  // Smooth scroll for internal anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  // Active link highlight on scroll
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = [...document.querySelectorAll("main section[id]")];

  const updateActive = () => {
    const pos = window.scrollY + 140;
    let current = "home";

    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec.id;
    }

    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  };

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
})();
