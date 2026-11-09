import { $, $$ } from "./dom.js";

export function initNav() {
  const nav = $("#nav"), fab = $("#fab"), menu = $("#navMenu"), toggle = $(".nav-toggle"), indicator = $(".nav-indicator");
  const links = $$(".nav-links a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const mobileNav = () => matchMedia("(max-width: 960px)").matches;
  let activeId = null;

  const placeIndicator = () => {
    const link = links.find((a) => a.classList.contains("active"));
    if (!link || mobileNav()) { indicator.style.opacity = "0"; return; }
    indicator.style.width = link.offsetWidth + "px";
    indicator.style.height = link.offsetHeight + "px";
    indicator.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
    indicator.style.opacity = "1";
  };
  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    links.forEach((a) => {
      const on = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    placeIndicator();
  };
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    menu.setAttribute("aria-hidden", mobileNav() ? "true" : "false");
  };
  const openMenu = () => {
    nav.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    menu.setAttribute("aria-hidden", "false");
  };
  toggle.addEventListener("click", () => nav.classList.contains("open") ? closeMenu() : openMenu());
  links.forEach((a) => a.addEventListener("click", closeMenu));
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  addEventListener("click", (e) => { if (nav.classList.contains("open") && !nav.contains(e.target)) closeMenu(); });
  matchMedia("(max-width: 960px)").addEventListener("change", () => { closeMenu(); activeId = null; onScroll(); });

  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 8);
    fab.classList.toggle("show", scrollY > innerHeight * 0.7);
    const marker = 120;
    let current = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top <= marker) current = s.id; });
    setActive(current);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => { activeId = null; onScroll(); placeIndicator(); });
  closeMenu();
  onScroll();
  document.fonts?.ready.then(() => { activeId = null; onScroll(); });
}
