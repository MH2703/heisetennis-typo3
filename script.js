(() => {
  // Year
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const sidebar = document.getElementById("sidebarNav");
  const btn = sidebar?.querySelector(".sideToggle");
  const links = document.getElementById("sideLinks");

  if (sidebar && btn && links) {
    const setOpen = (open) => {
      sidebar.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      const sr = btn.querySelector(".sr-only");
      if (sr) sr.textContent = open ? "Menü schließen" : "Menü öffnen";
      document.body.style.overflow = open ? "hidden" : "";
    };

    btn.addEventListener("click", () => setOpen(!sidebar.classList.contains("is-open")));

    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (sidebar.classList.contains("is-open") && !sidebar.contains(e.target)) setOpen(false);
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 981px)").matches) setOpen(false);
    });
  }

  // Smooth scroll for in-page anchors
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

  // Active link highlighting on scroll
  const sections = [...document.querySelectorAll("main .section, .hero")];
  const navLinks = [...document.querySelectorAll(".sideLinks a[href^='#']")];

  const setActive = () => {
    const scrollY = window.scrollY + 120;
    let currentId = "#top";

    for (const sec of sections) {
      const top = sec.offsetTop;
      if (scrollY >= top) {
        currentId = "#" + (sec.id || "top");
      }
    }

    navLinks.forEach(a => {
      const is = a.getAttribute("href") === currentId;
      a.classList.toggle("is-active", is);
    });
  };

  setActive();
  window.addEventListener("scroll", setActive, { passive: true });

  // Contact form -> mailto fallback
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const hp = form.querySelector(".hp");
      if (hp && hp.value) return;

      const name = document.getElementById("name")?.value?.trim() || "";
      const email = document.getElementById("email")?.value?.trim() || "";
      const topic = document.getElementById("topic")?.value?.trim() || "";
      const msg = document.getElementById("msg")?.value?.trim() || "";
      const status = document.getElementById("status");

      if (!email || !topic || !msg) {
        if (status) status.textContent = "Bitte Pflichtfelder ausfüllen (E-Mail, Thema, Nachricht).";
        return;
      }

      const subject = encodeURIComponent(`Anfrage Tennisschule Heise: ${topic}`);
      const body = encodeURIComponent(
        `Name: ${name}\nE-Mail: ${email}\nThema: ${topic}\n\nNachricht:\n${msg}\n`
      );

      const to = "info@heisetennis.de";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      if (status) status.textContent = "E-Mail-Programm wird geöffnet…";
      form.reset();
    });
  }
})();
