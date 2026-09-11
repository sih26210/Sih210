import { pageHeaderHTML } from "../components/page-header.js";
import { wireFormValidation, validators, showToast, generateReferenceId, escapeHtml } from "../utils.js";

const CARD_TYPES = [
  { value: "AAY", label: "AAY — Antyodaya Anna Yojana (Poorest of the poor)" },
  { value: "PHH", label: "PHH — Priority Household" },
  { value: "NPHH", label: "NPHH — Non-Priority Household" },
];

export function renderConvertCard(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Convert Your Card",
      subtitle: "Request a change in your ration card category based on your eligibility.",
      crumb: "Convert Your Card",
    })}

    <div class="container page-section">
      <div class="form-page">
        <div class="steps">
          <div class="step">
            <div class="step__num">1</div>
            <h3>Check Eligibility</h3>
            <p style="font-size:0.88rem; color:var(--slate-500);">Review the criteria for your desired card category before applying.</p>
          </div>
          <div class="step">
            <div class="step__num">2</div>
            <h3>Submit Request</h3>
            <p style="font-size:0.88rem; color:var(--slate-500);">Fill in your current details and the category you want to convert to.</p>
          </div>
          <div class="step">
            <div class="step__num">3</div>
            <h3>Verification</h3>
            <p style="font-size:0.88rem; color:var(--slate-500);">Your request is verified by the Taluk Supply Office before approval.</p>
          </div>
        </div>

        <div class="demo-banner" style="margin-top:24px;">
          Demo form — this does not submit a real conversion request. A sample reference
          number will be generated for preview purposes.
        </div>

        <div id="convert-content">
          <div class="form-card">
            <div id="convert-alert"></div>
            <form id="convert-form" novalidate>
              <div class="form-row">
                <label for="existingCard">Existing Ration Card Number<span class="required-mark">*</span></label>
                <input type="text" id="existingCard" name="existingCard" placeholder="e.g. 123456789012" />
                <div class="field-error" data-error-for="existingCard"></div>
              </div>

              <div class="form-row form-row--split">
                <div>
                  <label for="currentType">Current Card Category<span class="required-mark">*</span></label>
                  <select id="currentType" name="currentType">
                    <option value="">Select current category</option>
                    ${CARD_TYPES.map((c) => `<option value="${c.value}">${c.label}</option>`).join("")}
                  </select>
                  <div class="field-error" data-error-for="currentType"></div>
                </div>
                <div>
                  <label for="desiredType">Desired Card Category<span class="required-mark">*</span></label>
                  <select id="desiredType" name="desiredType">
                    <option value="">Select desired category</option>
                    ${CARD_TYPES.map((c) => `<option value="${c.value}">${c.label}</option>`).join("")}
                  </select>
                  <div class="field-error" data-error-for="desiredType"></div>
                </div>
              </div>

              <div class="form-row form-row--split">
                <div>
                  <label for="applicantName">Head of Family Name<span class="required-mark">*</span></label>
                  <input type="text" id="applicantName" name="applicantName" placeholder="Full name" />
                  <div class="field-error" data-error-for="applicantName"></div>
                </div>
                <div>
                  <label for="applicantMobile">Mobile Number<span class="required-mark">*</span></label>
                  <input type="tel" id="applicantMobile" name="applicantMobile" placeholder="10-digit mobile number" />
                  <div class="field-error" data-error-for="applicantMobile"></div>
                </div>
              </div>

              <div class="form-row">
                <label for="reason">Reason for Conversion<span class="required-mark">*</span></label>
                <textarea id="reason" name="reason" placeholder="Briefly explain why you are requesting this change (minimum 15 characters)"></textarea>
                <div class="field-error" data-error-for="reason"></div>
              </div>

              <div class="form-row">
                <label for="supportingDoc">Supporting Document (optional, demo only)</label>
                <input type="text" id="supportingDoc" name="supportingDoc" placeholder="e.g. Income certificate number" />
                <div class="field-hint">File upload is disabled in this demo — enter a document reference instead.</div>
              </div>

              <button type="submit" class="btn btn--primary btn--block btn--lg">Submit Conversion Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const form = main.querySelector("#convert-form");
  const v = validators();
  const rules = {
    existingCard: [v.required, v.rationCard],
    currentType: [v.required],
    desiredType: [
      v.required,
      (val) => val !== form.elements.currentType.value || "Desired category must be different from current category.",
    ],
    applicantName: [v.required, v.minLen(3)],
    applicantMobile: [v.required, v.mobile],
    reason: [v.required, v.minLen(15)],
  };
  const validateAll = wireFormValidation(form, rules);
  const alertBox = main.querySelector("#convert-alert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      alertBox.innerHTML = `<div class="alert alert--error">Please correct the highlighted fields before submitting.</div>`;
      return;
    }
    const refId = generateReferenceId("CNV");
    const name = escapeHtml(form.elements.applicantName.value.trim());
    const from = form.elements.currentType.value;
    const to = form.elements.desiredType.value;

    main.querySelector("#convert-content").innerHTML = `
      <div class="card success-panel">
        <div class="success-panel__icon">&#10003;</div>
        <h2>Conversion Request Submitted</h2>
        <p>Thank you, ${name}. Your request to convert from <strong>${from}</strong> to <strong>${to}</strong> has been recorded.</p>
        <div class="ref-id">Reference No: ${refId}</div>
        <p style="font-size:0.85rem; color:var(--slate-500);">
          Your Taluk Supply Office will verify this request. This is a demo confirmation —
          no real conversion request has been filed.
        </p>
        <a href="#/" class="btn btn--outline">Back to Home</a>
      </div>
    `;
    showToast(`Conversion request submitted — Ref ${refId}`, "success");
  });
}
