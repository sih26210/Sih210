import { SERVICES, FLASH_NEWS, HELPLINE } from "../data.js";

export function renderHome(main) {
  main.innerHTML = `
    <section class="hero">
      <div class="container">
        <div>
          <span class="eyebrow" style="background:rgba(255,255,255,0.14); color:#fff;">Public Distribution System</span>
          <h1>Ration card and food security services, brought online.</h1>
          <p>Apply for a smart ration card, track your family entitlements, register a
            complaint, or view district-wise distribution reports — all from one portal
            built for citizens and department staff.</p>
          <div class="hero__actions">
            <a href="#/citizen-login" class="btn btn--primary btn--lg">Citizen Login</a>
            <a href="#/department-login" class="btn btn--outline btn--lg" style="background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.4); color:#fff;">Department Login</a>
          </div>
        </div>
        <div class="hero__stats">
          <div class="hero-stat"><strong>2.1 Cr+</strong><span>Ration cards on record (demo figure)</span></div>
          <div class="hero-stat"><strong>34</strong><span>Districts covered (demo figure)</span></div>
          <div class="hero-stat"><strong>34,500+</strong><span>Fair Price Shops (demo figure)</span></div>
          <div class="hero-stat"><strong>24x7</strong><span>Complaint registration</span></div>
        </div>
      </div>
    </section>

    <div class="ticker-bar">
      <div class="container">
        <span class="ticker-label">Flash News</span>
        <div class="ticker-viewport">
          <div class="ticker-track">
            ${FLASH_NEWS.map((n) => `<span>${n}</span>`).join("")}
            ${FLASH_NEWS.map((n) => `<span>${n}</span>`).join("")}
          </div>
        </div>
        <span class="ticker-demo-tag">(sample content)</span>
      </div>
    </div>

    <div class="quick-strip">
      <div class="container">
        <div class="quick-strip__item">
          <div class="quick-strip__icon">📞</div>
          <div>
            <strong>${HELPLINE.toll_free}</strong>
            <span>Toll-free citizen helpline (demo number)</span>
          </div>
        </div>
        <div class="quick-strip__item">
          <div class="quick-strip__icon">⚠️</div>
          <div>
            <strong>Dial ${HELPLINE.complaint_no}</strong>
            <span>For complaints related to ration shops (demo number)</span>
          </div>
        </div>
        <a href="#/complaint" class="btn btn--primary">Register a Complaint</a>
      </div>
    </div>

    <section class="page-section container">
      <div class="section-head">
        <div>
          <span class="eyebrow">All Services</span>
          <h2>Citizen &amp; Department Services</h2>
          <p>Everything you need for ration card management, reports and grievance redressal.</p>
        </div>
      </div>
      <div class="service-grid" id="home-service-grid"></div>
    </section>

    <section class="page-section page-section--alt">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="eyebrow">Awareness</span>
            <h2>Consumer Awareness</h2>
            <p>Know your rights and entitlements as a registered PDS consumer.</p>
          </div>
          <a href="#/consumer-awareness" class="btn btn--ghost">Watch video &rsaquo;</a>
        </div>
        <div class="info-grid">
          <div class="info-panel">
            <h3>🎬 Consumer Awareness Video</h3>
            <p style="font-size:0.9rem; color:var(--slate-500);">Short explainer videos covering entitlements, grievance redressal and card conversion, in your local language.</p>
            <a href="#/consumer-awareness" class="btn btn--outline" style="margin-top:6px;">View videos</a>
          </div>
          <div class="info-panel">
            <h3>🌐 Citizen Centric Details</h3>
            <p style="font-size:0.9rem; color:var(--slate-500);">A quick summary of every citizen-facing service available on this portal.</p>
            <a href="#/citizen-centric" class="btn btn--outline" style="margin-top:6px;">View details</a>
          </div>
          <div class="info-panel">
            <h3>🔗 E-PDS Implementation Status</h3>
            <p style="font-size:0.9rem; color:var(--slate-500);">Track how electronic Point-of-Sale rollout is progressing across districts.</p>
            <a href="#/epds-status" class="btn btn--outline" style="margin-top:6px;">Check status</a>
          </div>
        </div>
      </div>
    </section>
  `;

  const grid = main.querySelector("#home-service-grid");
  grid.innerHTML = SERVICES.map(
    (service) => `
      <a class="service-card" href="#${service.route}">
        ${service.badge ? `<span class="service-card__badge">${service.badge}</span>` : ""}
        <div class="service-card__icon">${service.icon}</div>
        <div class="service-card__title">${service.title}</div>
        <p class="service-card__desc">${service.desc}</p>
      </a>
    `
  ).join("");
}
