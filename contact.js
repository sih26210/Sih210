import { pageHeaderHTML } from "../components/page-header.js";
import { HELPLINE } from "../data.js";

export function renderContact(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Contact Us",
      subtitle: "Reach the Civil Supplies & Consumer Protection department.",
      crumb: "Contact Us",
    })}

    <div class="container page-section">
      <div class="demo-banner">All contact details on this page are sample/demo values for prototype purposes.</div>

      <div class="info-grid">
        <div class="info-panel">
          <h3>📞 Toll-Free Helpline</h3>
          <p style="font-size:1.3rem; font-family:var(--font-display); font-weight:700; color:var(--ink-900); margin:6px 0;">${HELPLINE.toll_free}</p>
          <p style="font-size:0.85rem; color:var(--slate-500); margin:0;">Available 9:00 AM – 6:00 PM, Monday to Saturday (demo hours)</p>
        </div>
        <div class="info-panel">
          <h3>⚠️ Complaint Helpline</h3>
          <p style="font-size:1.3rem; font-family:var(--font-display); font-weight:700; color:var(--ink-900); margin:6px 0;">Dial ${HELPLINE.complaint_no}</p>
          <p style="font-size:0.85rem; color:var(--slate-500); margin:0;">For urgent Fair Price Shop related issues (demo number)</p>
        </div>
        <div class="info-panel">
          <h3>✉️ Email</h3>
          <p style="font-size:1.1rem; font-family:var(--font-display); font-weight:700; color:var(--ink-900); margin:6px 0;">${HELPLINE.email}</p>
          <p style="font-size:0.85rem; color:var(--slate-500); margin:0;">General queries and feedback (demo address)</p>
        </div>
        <div class="info-panel">
          <h3>💬 WhatsApp Support</h3>
          <p style="font-size:1.1rem; font-family:var(--font-display); font-weight:700; color:var(--ink-900); margin:6px 0;">${HELPLINE.whatsapp}</p>
          <p style="font-size:0.85rem; color:var(--slate-500); margin:0;">Send your ration card number for quick status updates (demo number)</p>
        </div>
      </div>

      <div class="card card--pad" style="margin-top:28px;">
        <h2>Office Address (Demo)</h2>
        <p>
          Directorate of Civil Supplies &amp; Consumer Protection<br/>
          Demo Building, Sample Government Complex<br/>
          City Name, State — 000000
        </p>
        <p style="font-size:0.85rem; color:var(--slate-400);">This is a placeholder address for demonstration purposes only.</p>
      </div>

      <div class="text-center page-section--tight">
        <p style="margin-bottom:14px; color:var(--slate-500);">Have a specific issue to report?</p>
        <div class="flex-wrap-gap" style="justify-content:center;">
          <a href="#/complaint" class="btn btn--primary">Register a Complaint</a>
          <a href="#/feedback" class="btn btn--outline">Share Feedback</a>
        </div>
      </div>
    </div>
  `;
}
