import { pageHeaderHTML } from "../components/page-header.js";
import { wireFormValidation, validators, showToast, generateReferenceId, escapeHtml } from "../utils.js";

const COMPLAINT_CATEGORIES = [
  "Fair Price Shop not open on scheduled days",
  "Short weighment / quantity issue",
  "Poor quality of ration commodities",
  "Overcharging beyond fixed price",
  "Ration card / entitlement discrepancy",
  "Dealer misbehaviour",
  "Stock not available at shop",
  "Other",
];

export function renderComplaint(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Register a Complaint",
      subtitle: "Report an issue related to your ration card or Fair Price Shop services.",
      crumb: "Register a Complaint",
    })}

    <div class="container page-section">
      <div class="form-page">
        <div class="demo-banner">
          Demo form — no complaint is sent to any real department. A sample reference
          number will be generated for preview purposes.
        </div>

        <div id="complaint-content">
          <div class="form-card">
            <div id="complaint-alert"></div>
            <form id="complaint-form" novalidate>
              <div class="form-row form-row--split">
                <div>
                  <label for="complainantName">Full Name<span class="required-mark">*</span></label>
                  <input type="text" id="complainantName" name="complainantName" placeholder="Enter your full name" />
                  <div class="field-error" data-error-for="complainantName"></div>
                </div>
                <div>
                  <label for="complainantMobile">Mobile Number<span class="required-mark">*</span></label>
                  <input type="tel" id="complainantMobile" name="complainantMobile" placeholder="10-digit mobile number" />
                  <div class="field-error" data-error-for="complainantMobile"></div>
                </div>
              </div>

              <div class="form-row form-row--split">
                <div>
                  <label for="complainantEmail">Email Address</label>
                  <input type="email" id="complainantEmail" name="complainantEmail" placeholder="you@example.com" />
                  <div class="field-error" data-error-for="complainantEmail"></div>
                </div>
                <div>
                  <label for="rationCardNo">Ration Card Number</label>
                  <input type="text" id="rationCardNo" name="rationCardNo" placeholder="Optional, if applicable" />
                </div>
              </div>

              <div class="form-row">
                <label for="fpsCode">Fair Price Shop Code / Location</label>
                <input type="text" id="fpsCode" name="fpsCode" placeholder="e.g. FPS-0231, Ward 4" />
              </div>

              <div class="form-row">
                <label for="category">Complaint Category<span class="required-mark">*</span></label>
                <select id="category" name="category">
                  <option value="">Select a category</option>
                  ${COMPLAINT_CATEGORIES.map((c) => `<option value="${c}">${c}</option>`).join("")}
                </select>
                <div class="field-error" data-error-for="category"></div>
              </div>

              <div class="form-row">
                <label for="description">Complaint Description<span class="required-mark">*</span></label>
                <textarea id="description" name="description" placeholder="Describe the issue in detail (minimum 20 characters)"></textarea>
                <div class="field-error" data-error-for="description"></div>
              </div>

              <button type="submit" class="btn btn--primary btn--block btn--lg">Submit Complaint</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = main.querySelector("#complaint-form");
  const v = validators();
  const rules = {
    complainantName: [v.required, v.minLen(3)],
    complainantMobile: [v.required, v.mobile],
    complainantEmail: [(val) => val.trim() === "" || v.email(val) === true || "Enter a valid email address."],
    category: [v.required],
    description: [v.required, v.minLen(20)],
  };
  const validateAll = wireFormValidation(form, rules);
  const alertBox = main.querySelector("#complaint-alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      alertBox.innerHTML = `<div class="alert alert--error">Please correct the highlighted fields before submitting.</div>`;
      return;
    }

    const refId = generateReferenceId("CMP");
    const name = escapeHtml(form.elements.complainantName.value.trim());
    const category = escapeHtml(form.elements.category.value);

    main.querySelector("#complaint-content").innerHTML = `
      <div class="card success-panel">
        <div class="success-panel__icon">&#10003;</div>
        <h2>Complaint Registered Successfully</h2>
        <p>Thank you, ${name}. Your complaint regarding <strong>"${category}"</strong> has been recorded.</p>
        <div class="ref-id">Reference No: ${refId}</div>
        <p style="font-size:0.85rem; color:var(--slate-500);">
          Please save this reference number to track your complaint status. This is a demo
          confirmation — no real complaint has been filed.
        </p>
        <div class="flex-wrap-gap" style="justify-content:center; margin-top:10px;">
          <a href="#/" class="btn btn--outline">Back to Home</a>
          <a href="#/complaint" class="btn btn--primary" id="file-another">File Another Complaint</a>
        </div>
      </div>
    `;
    showToast(`Complaint submitted — Ref ${refId}`, "success");
  });
}
