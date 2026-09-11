import { pageHeaderHTML } from "../components/page-header.js";
import { wireFormValidation, validators, showToast, escapeHtml } from "../utils.js";

const CATEGORIES = [
  "Website / Portal Experience",
  "Fair Price Shop Service",
  "Ration Card Application Process",
  "Complaint Handling",
  "Reports & Transparency",
  "Other",
];

export function renderFeedback(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Feedback",
      subtitle: "Help us improve the PDS portal and service delivery.",
      crumb: "Feedback",
    })}

    <div class="container page-section">
      <div class="form-page">
        <div class="demo-banner">
          Demo form — feedback submitted here is not sent anywhere and is used only to
          demonstrate the flow.
        </div>

        <div id="feedback-content">
          <div class="form-card">
            <div id="feedback-alert"></div>
            <form id="feedback-form" novalidate>
              <div class="form-row form-row--split">
                <div>
                  <label for="fbName">Name<span class="required-mark">*</span></label>
                  <input type="text" id="fbName" name="fbName" placeholder="Enter your name" />
                  <div class="field-error" data-error-for="fbName"></div>
                </div>
                <div>
                  <label for="fbMobile">Mobile Number<span class="required-mark">*</span></label>
                  <input type="tel" id="fbMobile" name="fbMobile" placeholder="10-digit mobile number" />
                  <div class="field-error" data-error-for="fbMobile"></div>
                </div>
              </div>

              <div class="form-row">
                <label for="fbEmail">Email Address</label>
                <input type="email" id="fbEmail" name="fbEmail" placeholder="you@example.com" />
                <div class="field-error" data-error-for="fbEmail"></div>
              </div>

              <div class="form-row">
                <label for="fbCategory">Feedback Category<span class="required-mark">*</span></label>
                <select id="fbCategory" name="fbCategory">
                  <option value="">Select a category</option>
                  ${CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join("")}
                </select>
                <div class="field-error" data-error-for="fbCategory"></div>
              </div>

              <div class="form-row">
                <label>Overall Rating<span class="required-mark">*</span></label>
                <div class="rating-group" id="rating-group" role="radiogroup" aria-label="Rating">
                  ${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="rating-star" data-value="${n}" aria-label="${n} star">&#9733;</button>`).join("")}
                </div>
                <input type="hidden" id="fbRating" name="fbRating" value="" />
                <div class="field-error" data-error-for="fbRating"></div>
              </div>

              <div class="form-row">
                <label for="fbComments">Comments<span class="required-mark">*</span></label>
                <textarea id="fbComments" name="fbComments" placeholder="Share your thoughts (minimum 10 characters)"></textarea>
                <div class="field-error" data-error-for="fbComments"></div>
              </div>

              <button type="submit" class="btn btn--primary btn--block btn--lg">Submit Feedback</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = main.querySelector("#feedback-form");
  const stars = main.querySelectorAll(".rating-star");
  const ratingInput = main.querySelector("#fbRating");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const val = Number(star.dataset.value);
      ratingInput.value = val;
      stars.forEach((s) => s.classList.toggle("active", Number(s.dataset.value) <= val));
      const errorEl = form.querySelector('[data-error-for="fbRating"]');
      errorEl.classList.remove("show");
    });
  });

  const v = validators();
  const rules = {
    fbName: [v.required, v.minLen(2)],
    fbMobile: [v.required, v.mobile],
    fbEmail: [(val) => val.trim() === "" || v.email(val) === true || "Enter a valid email address."],
    fbCategory: [v.required],
    fbComments: [v.required, v.minLen(10)],
  };
  const validateAll = wireFormValidation(form, rules);
  const alertBox = main.querySelector("#feedback-alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateAll();
    const ratingOk = ratingInput.value !== "";
    if (!ratingOk) {
      form.querySelector('[data-error-for="fbRating"]').textContent = "Please select a rating.";
      form.querySelector('[data-error-for="fbRating"]').classList.add("show");
    }
    if (!ok || !ratingOk) {
      alertBox.innerHTML = `<div class="alert alert--error">Please correct the highlighted fields before submitting.</div>`;
      return;
    }

    const name = escapeHtml(form.elements.fbName.value.trim());
    main.querySelector("#feedback-content").innerHTML = `
      <div class="card success-panel">
        <div class="success-panel__icon">&#10003;</div>
        <h2>Thank You for Your Feedback</h2>
        <p>We appreciate you taking the time to share your thoughts, ${name}. Your input helps us improve this portal.</p>
        <a href="#/" class="btn btn--outline">Back to Home</a>
      </div>
    `;
    showToast("Feedback submitted — thank you!", "success");
  });
}
