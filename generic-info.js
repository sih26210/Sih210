import { pageHeaderHTML } from "../components/page-header.js";
import { showToast, wireFormValidation, validators } from "../utils.js";

// Content model per page variant — subtitle, panels, and optional extra markup.
const CONTENT = {
  epds: {
    subtitle: "Track the rollout of electronic Point-of-Sale devices across districts.",
    panels: [
      { icon: "✅", title: "Districts Live", body: "34 of 34 districts have e-PoS enabled at Fair Price Shops (demo figure)." },
      { icon: "🖥️", title: "e-PoS Coverage", body: "98.6% of Fair Price Shops are equipped with biometric e-PoS devices (demo figure)." },
      { icon: "📶", title: "Real-time Sync", body: "Transactions sync with the central server in real time for stock reconciliation." },
    ],
    table: {
      headers: ["District", "FPS Count", "e-PoS Enabled", "Status"],
      rows: [
        ["Sample District A", "1,240", "1,225", "Live"],
        ["Sample District B", "980", "980", "Live"],
        ["Sample District C", "1,050", "1,010", "Live"],
      ],
    },
  },
  "family-card": {
    subtitle: "View the members and entitlements linked to your family / ration card.",
    panels: [
      { icon: "👨‍👩‍👧", title: "Member Details", body: "View all members registered under your family card, along with Aadhaar-seeding status." },
      { icon: "🌾", title: "Monthly Entitlement", body: "Check the quantity of each commodity you're entitled to every month based on card category." },
      { icon: "📜", title: "Transaction History", body: "Review your last 6 months of ration collection history at your linked Fair Price Shop." },
    ],
    note: "Sign in via Citizen Login to view your actual family card details.",
    ctaLabel: "Go to Citizen Login",
    ctaRoute: "/citizen-login",
  },
  "citizen-centric": {
    subtitle: "A quick summary of every citizen-facing service on this portal.",
    panels: [
      { icon: "📝", title: "Apply & Update", body: "Apply for a new card, request a duplicate, or update member and address details online." },
      { icon: "📊", title: "Track & Verify", body: "Track application status, view entitlements, and verify Fair Price Shop stock." },
      { icon: "📣", title: "Voice Your Concern", body: "Register complaints and share feedback directly through the portal." },
    ],
  },
  "consumer-awareness": {
    subtitle: "Short videos explaining your rights and entitlements as a PDS consumer.",
    video: true,
    panels: [
      { icon: "⚖️", title: "Know Your Rights", body: "Understand entitlements guaranteed under the National Food Security Act." },
      { icon: "🚩", title: "Spot & Report Issues", body: "Learn how to identify short weighment, overcharging, or quality issues at your FPS." },
    ],
  },
  "smart-card-apply": {
    subtitle: "Apply online for a new smart ration card.",
    panels: [
      { icon: "1️⃣", title: "Check Eligibility", body: "Confirm your household is not already covered under an existing ration card." },
      { icon: "2️⃣", title: "Fill Application", body: "Provide family details, address proof and income details as applicable." },
      { icon: "3️⃣", title: "Track Status", body: "Use your acknowledgement number to track verification and approval." },
    ],
    ctaLabel: "Proceed to Citizen Login to Apply",
    ctaRoute: "/citizen-login",
  },
  "duplicate-card": {
    subtitle: "Request a duplicate copy of your lost or damaged smart ration card.",
    panels: [
      { icon: "🔍", title: "Verify Identity", body: "Provide your existing card number or family ID to locate your record." },
      { icon: "📄", title: "Submit Request", body: "Confirm your details and submit a duplicate card request online." },
      { icon: "📬", title: "Delivery", body: "Your duplicate card will be processed and made available at your linked Fair Price Shop / Taluk office." },
    ],
    ctaLabel: "Request via Citizen Login",
    ctaRoute: "/citizen-login",
  },
  "smart-card-services": {
    subtitle: "Update member details, address and other card information.",
    panels: [
      { icon: "➕", title: "Add / Remove Member", body: "Update your family card when a member is born, married, or deceased." },
      { icon: "🏠", title: "Address Update", body: "Change your registered address and linked Fair Price Shop." },
      { icon: "🔁", title: "Category Correction", body: "For category changes, use Convert Your Card instead." },
    ],
    ctaLabel: "Manage via Citizen Login",
    ctaRoute: "/citizen-login",
  },
  "authorised-person": {
    subtitle: "Add or update the authorised nominee for your ration card.",
    panels: [
      { icon: "🖋️", title: "Why Add a Nominee?", body: "An authorised person can collect your entitlement on your behalf when you're unavailable." },
      { icon: "🪪", title: "Requirements", body: "Nominee must be an adult family member with valid ID proof linked to the family card." },
    ],
    ctaLabel: "Manage via Citizen Login",
    ctaRoute: "/citizen-login",
  },
  "sms-services": {
    subtitle: "Subscribe to SMS alerts for stock arrival and distribution dates.",
    panels: [
      { icon: "📦", title: "Stock Arrival Alerts", body: "Get notified when commodities arrive at your linked Fair Price Shop." },
      { icon: "📅", title: "Distribution Reminders", body: "Receive reminders for your monthly collection window." },
      { icon: "📣", title: "Scheme Updates", body: "Stay informed about new schemes and eligibility changes." },
    ],
    smsForm: true,
  },
};

function panelHTML(p) {
  return `
    <div class="info-panel">
      <h3>${p.icon} ${p.title}</h3>
      <p style="font-size:0.92rem; color:var(--slate-500); margin:0;">${p.body}</p>
    </div>
  `;
}

export function renderGenericInfoPage(main, title, variant) {
  const content = CONTENT[variant] || { subtitle: "", panels: [] };

  main.innerHTML = `
    ${pageHeaderHTML({ title, subtitle: content.subtitle, crumb: title })}

    <div class="container page-section">
      ${
        content.video
          ? `
        <div class="card card--pad" style="margin-bottom:28px;">
          <div class="video-frame">
            <button class="video-frame__play" id="demo-video-play">
              <span class="play-circle">&#9658;</span>
              <span>Play sample awareness video (demo)</span>
            </button>
          </div>
        </div>
      `
          : ""
      }

      <div class="info-grid">
        ${content.panels.map(panelHTML).join("")}
      </div>

      ${
        content.table
          ? `
        <div class="table-wrap" style="margin-top:28px;">
          <table>
            <thead><tr>${content.table.headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
            <tbody>
              ${content.table.rows
                .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
                .join("")}
            </tbody>
          </table>
        </div>
        <p style="font-size:0.8rem; color:var(--slate-400); margin-top:10px;">Sample data shown for demonstration.</p>
      `
          : ""
      }

      ${
        content.smsForm
          ? `
        <div class="form-page" style="margin-top:32px;">
          <div class="form-card">
            <h3 style="margin-bottom:16px;">Subscribe to SMS Alerts</h3>
            <div id="sms-alert"></div>
            <form id="sms-form" novalidate>
              <div class="form-row">
                <label for="smsMobile">Mobile Number<span class="required-mark">*</span></label>
                <input type="tel" id="smsMobile" name="smsMobile" placeholder="10-digit mobile number" />
                <div class="field-error" data-error-for="smsMobile"></div>
              </div>
              <div class="form-row">
                <label for="smsCard">Ration Card Number</label>
                <input type="text" id="smsCard" name="smsCard" placeholder="Optional" />
              </div>
              <button type="submit" class="btn btn--primary btn--block">Subscribe</button>
            </form>
          </div>
        </div>
      `
          : ""
      }

      ${
        content.note
          ? `<div class="alert alert--info" style="margin-top:28px;">${content.note}</div>`
          : ""
      }

      ${
        content.ctaLabel
          ? `
        <div class="text-center page-section--tight">
          <a href="#${content.ctaRoute}" class="btn btn--primary btn--lg">${content.ctaLabel}</a>
        </div>
      `
          : ""
      }
    </div>
  `;

  const playBtn = main.querySelector("#demo-video-play");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      showToast("This is a demo — video playback is simulated.", "info");
      playBtn.querySelector("span:last-child").textContent = "Playing sample video (demo mode)…";
    });
  }

  const smsForm = main.querySelector("#sms-form");
  if (smsForm) {
    const v = validators();
    const validateAll = wireFormValidation(smsForm, { smsMobile: [v.required, v.mobile] });
    smsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateAll()) return;
      main.querySelector("#sms-alert").innerHTML = `<div class="alert alert--success">You have been subscribed to SMS alerts (demo).</div>`;
      showToast("Subscribed to SMS alerts (demo)", "success");
      smsForm.reset();
    });
  }
}
