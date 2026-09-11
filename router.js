// Minimal hash-based router with reusable route registration.
const routes = [];
let notFoundHandler = () => "<div class='container page-section'><h1>Page not found</h1></div>";

export function registerRoute(path, renderFn, meta = {}) {
  routes.push({ path, renderFn, meta });
}

export function setNotFound(fn) {
  notFoundHandler = fn;
}

function matchRoute(hash) {
  const cleanHash = hash.replace(/^#/, "") || "/";
  const [pathOnly] = cleanHash.split("?");
  for (const route of routes) {
    if (route.path === pathOnly) return route;
  }
  return null;
}

export function getQueryParams() {
  const hash = window.location.hash.replace(/^#/, "");
  const [, queryString] = hash.split("?");
  return new URLSearchParams(queryString || "");
}

export function navigate(path) {
  window.location.hash = path;
}

let currentCleanup = null;

async function renderCurrentRoute() {
  const main = document.getElementById("main-content");
  const route = matchRoute(window.location.hash);

  if (typeof currentCleanup === "function") {
    try { currentCleanup(); } catch (e) { /* noop */ }
    currentCleanup = null;
  }

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

  if (!route) {
    main.innerHTML = notFoundHandler();
    document.title = "Page not found — PDS Portal";
    highlightActiveNav(null);
    return;
  }

  const result = route.renderFn(main);
  document.title = route.meta.title ? `${route.meta.title} — PDS Portal` : "PDS Portal";
  highlightActiveNav(route.path);

  if (result && typeof result.then === "function") {
    const cleanup = await result;
    if (typeof cleanup === "function") currentCleanup = cleanup;
  } else if (typeof result === "function") {
    currentCleanup = result;
  }
}

function highlightActiveNav(path) {
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const linkPath = a.getAttribute("data-path");
    a.classList.toggle("active", linkPath === path);
  });
}

export function initRouter() {
  window.addEventListener("hashchange", renderCurrentRoute);
  window.addEventListener("DOMContentLoaded", renderCurrentRoute);
  if (document.readyState !== "loading") renderCurrentRoute();
}
