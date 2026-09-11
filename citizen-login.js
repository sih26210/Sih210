import { pageHeaderHTML } from "../components/page-header.js";
import { wireFormValidation, validators, showToast, generateCaptcha } from "../utils.js";

export function renderCitizenLogin(main) {
  let captcha = generateCaptcha();

  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Citizen Login",
      subtitle: "Access your ration card details, applications and complaint status.",
      crumb: "Citizen Login",
    })}

    <div class="container page-section">
      <div class="form-page">
        <div class="demo-banner">
          This is a demonstration login. No real ration card data is used — enter any
          12-digit number and password of at least 6 characters to see the demo flow.
        </div>

        <div class="tabs" id="login-tabs">
          <button class="tab-btn active" data-tab="card">Ration Card Number</button>
          <button class="tab-btn" data-tab="mobile">Registered Mobile</button>
        </div>

        <div class="form-card">
          <div id="login-alert"></div>

          <form id="citizen-login-form" novalidate>
            <div class="tab-panel active" data-panel="card">
              <div class="form-row">
                <label for="cardNumber">Ration Card / Family ID Number<span class="required-mark">*</span></label>
                <input type="text" id="cardNumber" name="cardNumber" placeholder="e.g. 123456789012" autocomplete="off" />
                <div class="field-error" data-error-for="cardNumber"></div>
              </div>
            </div>

            <div class="tab-panel" data-panel="mobile">
              <div class="form-row">
                <label for="mobileNumber">Registered Mobile Number<span class="required-mark">*</span></label>
                <input type="tel" id="mobileNumber" name="mobileNumber" placeholder="10-digit mobile number" autocomplete="off" />
                <div class="field-error" data-error-for="mobileNumber"></div>
              </div>
            </div>

            <div class="form-row">
              <label for="password">Password<span class="required-mark">*</span></label>
              <input type="password" id="password" name="password" placeholder="Enter password" autocomplete="off" />
              <div class="field-error" data-error-for="password"></div>
              <div class="field-hint">Demo mode: any password with 6+ characters will work.</div>
            </div>

            <div class="form-row">
              <label for="captchaInput">Enter the code shown below<span class="required-mark">*</span></label>
              <div class="captcha-box">
                <span class="captcha-display" id="captcha-display">${captcha}</span>
                <button type="button" class="captcha-refresh" id="captcha-refresh" aria-label="Refresh captcha">&#8635;</button>
              </div>
              <input type="text" id="captchaInput" name="captchaInput" placeholder="Type the code above" style="margin-top:10px;" autocomplete="off" />
              <div class="field-error" data-error-for="captchaInput"></div>
            </div>

            <button type="submit" class="btn btn--primary btn--block btn--lg">Login</button>

            <p style="text-align:center; margin-top:18px; font-size:0.88rem;">
              New user? <a href="#/smart-card-apply">Apply for a smart ration card</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  `;

  const tabs = main.querySelectorAll("#login-tabs .tab-btn");
  const panels = main.querySelectorAll(".tab-panel");
  let activeTab = "card";
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.tab;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === activeTab));
    });
  });

  const form = main.querySelector("#citizen-login-form");
  const v = validators();

  function currentRules() {
    const base = {
      password: [v.required, v.minLen(6)],
      captchaInput: [
        v.required,
        (val) => val.trim().toUpperCase() === captcha || "Captcha does not match. Please try again.",
      ],
    };
    if (activeTab === "card") {
      base.cardNumber = [v.required, v.rationCard];
    } else {
      base.mobileNumber = [v.required, v.mobile];
    }
    return base;
  }

  let validateAll = wireFormValidation(form, currentRules());

  main.querySelector("#captcha-refresh").addEventListener("click", () => {
    captcha = generateCaptcha();
    main.querySelector("#captcha-display").textContent = captcha;
    form.elements.captchaInput.value = "";
    validateAll = wireFormValidation(form, currentRules());
  });

  const alertBox = main.querySelector("#login-alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateAll = wireFormValidation(form, currentRules());
    const ok = validateAll();
    if (!ok) {
      alertBox.innerHTML = `<div class="alert alert--error">Please correct the highlighted fields and try again.</div>`;
      return;
    }
    alertBox.innerHTML = `<div class="alert alert--success">Demo login successful. Redirecting to your dashboard preview…</div>`;
    showToast("Login successful (demo mode)", "success");
    form.querySelector("button[type=submit]").disabled = true;
    setTimeout(() => {
      window.location.hash = "/family-card";
    }, 1200);
  });
}
