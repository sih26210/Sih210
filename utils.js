export function el(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function qs(scope, selector) {
  return scope.querySelector(selector);
}

export function qsa(scope, selector) {
  return Array.from(scope.querySelectorAll(selector));
}

export function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function showToast(message, type = "success") {
  const root = document.getElementById("toast-root");
  const toast = el(`
    <div class="toast toast--${type}" role="status">
      <span>${escapeHtml(message)}</span>
    </div>
  `);
  if (!document.getElementById("toast-styles")) {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      #toast-root { position: fixed; bottom: 20px; right: 20px; z-index: 999; display: flex; flex-direction: column; gap: 10px; }
      .toast { font-family: 'Inter', sans-serif; font-size: 0.9rem; padding: 14px 20px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); color: #fff; max-width: 320px; animation: toast-in 0.25s ease; }
      .toast--success { background: #1E8E5A; }
      .toast--error { background: #C4432E; }
      .toast--info { background: #14213B; }
      @keyframes toast-in { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @media (max-width: 480px) { #toast-root { left: 16px; right: 16px; } .toast { max-width: none; } }
    `;
    document.head.appendChild(style);
  }
  root.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s ease";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3600);
}

export function generateReferenceId(prefix = "PDS") {
  const now = Date.now().toString().slice(-6);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${now}${rand}`;
}

export function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function validators() {
  return {
    required: (v) => v.trim().length > 0 || "This field is required.",
    minLen: (n) => (v) => v.trim().length >= n || `Enter at least ${n} characters.`,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
    mobile: (v) => /^[6-9]\d{9}$/.test(v.trim()) || "Enter a valid 10-digit mobile number.",
    rationCard: (v) => /^[A-Za-z0-9]{6,15}$/.test(v.trim()) || "Enter a valid ration card / family card number.",
    match: (otherVal, label = "fields") => (v) => v === otherVal() || `${label} do not match.`,
  };
}

/**
 * Attach live + submit-time validation to a form.
 * fieldRules: { [fieldName]: [ruleFn, ruleFn, ...] }
 */
export function wireFormValidation(form, fieldRules) {
  function validateField(name) {
    const field = form.elements[name];
    if (!field) return true;
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    const rules = fieldRules[name] || [];
    for (const rule of rules) {
      const result = rule(field.value);
      if (result !== true) {
        field.classList.add("invalid");
        if (errorEl) { errorEl.textContent = result; errorEl.classList.add("show"); }
        return false;
      }
    }
    field.classList.remove("invalid");
    if (errorEl) { errorEl.classList.remove("show"); errorEl.textContent = ""; }
    return true;
  }

  Object.keys(fieldRules).forEach((name) => {
    const field = form.elements[name];
    if (!field) return;
    field.addEventListener("blur", () => validateField(name));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(name);
    });
  });

  return function validateAll() {
    let allValid = true;
    Object.keys(fieldRules).forEach((name) => {
      const ok = validateField(name);
      if (!ok) allValid = false;
    });
    return allValid;
  };
}
