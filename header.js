import { NAV_LINKS } from "../data.js";
import { el } from "../utils.js";

export function renderHeader() {
  const headerRoot = document.getElementById("app-header");

  const header = el(`
    <header>
      <div class="top-strip">
        <div class="container">
          <div class="top-strip__links">
            <a href="#/">Government of Tamil Nadu (Demo)</a>
            <a href="#/faq">Screen Reader Access</a>
          </div>
          <div class="top-strip__lang">
            <span style="opacity:0.8;">Text Size:</span>
            <button type="button" id="text-size-decrease" aria-label="Decrease text size">A-</button>
            <button type="button" id="text-size-reset" aria-label="Reset text size">A</button>
            <button type="button" id="text-size-increase" aria-label="Increase text size">A+</button>
            <span style="opacity:0.4;">|</span>
            <button type="button" class="active">EN</button>
            <button type="button">தமிழ்</button>
          </div>
        </div>
      </div>

      <div class="identity-bar">
        <div class="container">
          <a href="#/" class="identity-emblem" aria-label="PDS Portal Home">🌾</a>
          <div class="identity-text">
            <h1>Public Distribution System</h1>
            <p>e-Services Portal &middot; Civil Supplies &amp; Consumer Protection (Demo)</p>
          </div>
          <div class="identity-bar__actions">
            <a href="#/citizen-login" class="btn btn--outline">Citizen Login</a>
            <a href="#/department-login" class="btn btn--primary">Department Login</a>
          </div>
        </div>
      </div>

      <nav class="navbar" aria-label="Main navigation">
        <div class="container">
          <ul class="nav-links" id="nav-links">
            ${NAV_LINKS.map(
              (link) => `<li><a href="#${link.path}" data-path="${link.path}">${link.label}</a></li>`
            ).join("")}
          </ul>
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            &#9776;
          </button>
        </div>
      </nav>
    </header>
  `);

  headerRoot.innerHTML = "";
  headerRoot.appendChild(header);

  const toggle = header.querySelector("#nav-toggle");
  const links = header.querySelector("#nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen ? "&times;" : "&#9776;";
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = "&#9776;";
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = "&#9776;";
    }
  });

  // Simple text-size accessibility control
  let sizeStep = 0;
  function applySize() {
    document.documentElement.style.fontSize = `${100 + sizeStep * 8}%`;
  }
  header.querySelector("#text-size-increase").addEventListener("click", () => {
    sizeStep = Math.min(sizeStep + 1, 3);
    applySize();
  });
  header.querySelector("#text-size-decrease").addEventListener("click", () => {
    sizeStep = Math.max(sizeStep - 1, -2);
    applySize();
  });
  header.querySelector("#text-size-reset").addEventListener("click", () => {
    sizeStep = 0;
    applySize();
  });
}
