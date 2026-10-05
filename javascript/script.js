// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("hidden") === false;
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.add("hidden");
    menuBtn.setAttribute("aria-expanded", false);
  }),
);

// Header background after scrolling
const header = document.querySelector(".header");
const onScroll = () =>
  header.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Highlight the nav link of the section in view
const links = document.querySelectorAll("nav .nav-link");
const sections = [...links]
  .map((l) => document.querySelector(l.getAttribute("href")))
  .filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle(
            "is-active",
            l.getAttribute("href") === "#" + e.target.id,
          ),
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
sections.forEach((s) => spy.observe(s));

// Contact form: opens the visitor's email app with the message filled in
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const body = `${d.get("message")}\n\nFrom: ${d.get("name")} (${d.get("email")})`;
  window.location.href = `mailto:your.email@example.com?subject=${encodeURIComponent("Portfolio message from " + d.get("name"))}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app…";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
