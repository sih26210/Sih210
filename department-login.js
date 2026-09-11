import { pageHeaderHTML } from "../components/page-header.js";
import { wireFormValidation, validators, showToast, generateCaptcha } from "../utils.js";

export function renderDepartmentLogin(main) {
  let captcha = generateCaptcha();

  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Department Login",
      subtitle: "Authorised access for Civil Supplies department and Fair Price Shop staff.",
      crumb: "Department Login",
    })}

    <div class="container page-section">
      <div class="form-page">
        <div class="demo-banner">
          This is a demonstration login for department staff. No real credentials are
          used — enter any username and a password of 6+ characters to preview the flow.
        </div>

        <div class="form-card">
          <div id="dept-login-alert"></div>

          <form id="department-login-form" novalidate>
            <div class="form-row">
              <label for="deptRole">Login As<span class="required-mark">*</span></label>
              <select id="deptRole" name="deptRole">
                <option value="fps">Fair Price Shop Dealer</option>
                <option value="taluk">Taluk Supply Officer</option>
                <option value="district">District Supply Officer</option>
                <option value="state">State Administrator</option>
              </select>
            </div>

            <div class="form-row">
              <label for="username">Username / Employee ID<span class="required-mark">*</span></label>
              <input type="text" id="username" name="username" placeholder="Enter username" autocomplete="off" />
              <div class="field-error" data-error-for="username"></div>
            </div>

            <div class="form-row">
              <label for="deptPassword">Password<span class="required-mark">*</span></label>
              <input type="password" id="deptPassword" name="deptPassword" placeholder="Enter password" autocomplete="off" />
              <div class="field-error" data-error-for="deptPassword"></div>
              <div class="field-hint">Demo mode: any password with 6+ characters will work.</div>
            </div>

            <div class="form-row">
              <label for="deptCaptchaInput">Enter the verification code<span class="required-mark">*</span></label>
              <div class="captcha-box">
                <span class="captcha-display" id="dept-captcha-display">${captcha}</span>
                <button type="button" class="captcha-refresh" id="dept-captcha-refresh" aria-label="Refresh captcha">&#8635;</button>
              </div>
              <input type="text" id="deptCaptchaInput" name="deptCaptchaInput" placeholder="Type the code above" style="margin-top:10px;" autocomplete="off" />
              <div class="field-error" data-error-for="deptCaptchaInput"></div>
            </div>

            <button type="submit" class="btn btn--secondary btn--block btn--lg">Login to Department Portal</button>

            <p style="text-align:center; margin-top:18px; font-size:0.85rem; color:var(--slate-500);">
              For citizen services, please use <a href="#/citizen-login">Citizen Login</a> instead.
            </p>
          </form>
        </div>
      </div>
    </div>
  `;

  const form = main.querySelector("#department-login-form");
  const v = validators();

  const rules = {
    username: [v.required, v.minLen(3)],
    deptPassword: [v.required, v.minLen(6)],
    deptCaptchaInput: [
      v.required,
      (val) => val.trim().toUpperCase() === captcha || "Verification code does not match.",
    ],
  };

  let validateAll = wireFormValidation(form, rules);

  main.querySelector("#dept-captcha-refresh").addEventListener("click", () => {
    captcha = generateCaptcha();
    main.querySelector("#dept-captcha-display").textContent = captcha;
    form.elements.deptCaptchaInput.value = "";
    rules.deptCaptchaInput = [
      v.required,
      (val) => val.trim().toUpperCase() === captcha || "Verification code does not match.",
    ];
    validateAll = wireFormValidation(form, rules);
  });

  const alertBox = main.querySelector("#dept-login-alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      alertBox.innerHTML = `<div class="alert alert--error">Please correct the highlighted fields and try again.</div>`;
      return;
    }
    const role = form.elements.deptRole.value;
    const roleLabels = {
      fps: "Fair Price Shop Dealer",
      taluk: "Taluk Supply Officer",
      district: "District Supply Officer",
      state: "State Administrator",
    };
    alertBox.innerHTML = `<div class="alert alert--success">Demo login successful as <strong>${roleLabels[role]}</strong>. This is a preview environment — a full department dashboard will be available in a later phase.</div>`;
    showToast("Department login successful (demo mode)", "success");
    form.querySelector("button[type=submit]").disabled = true;
  });
}
