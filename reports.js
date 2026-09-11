import { pageHeaderHTML } from "../components/page-header.js";

const REPORT_LINKS = [
  { icon: "📊", title: "NFSA Reports", desc: "District and taluk-wise NFSA coverage statistics.", route: "/reports/nfsa" },
  { icon: "📦", title: "NFSA Off-take Reports", desc: "Monthly commodity off-take against allotment.", route: "/reports/nfsa-offtake" },
  { icon: "📄", title: "PDS Reports", desc: "Ration shop-wise distribution and sales reports.", route: "/reports/pds" },
  { icon: "🏬", title: "Godown Stock Reports", desc: "Live stock position at godowns and depots.", route: "/reports/godown-stock" },
  { icon: "🏨", title: "Hostels & Welfare Institutions List", desc: "List of registered hostels and welfare institutions.", route: "/reports/hostels" },
];

export function renderReportsHub(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Reports",
      subtitle: "Public reports on NFSA coverage, PDS distribution and godown stock.",
      crumb: "Reports",
    })}

    <div class="container page-section">
      <div class="alert alert--info">
        Detailed report data and filters are being finalised and will be published in the
        next phase of this portal. The sections below are reserved and linked from the
        Home page.
      </div>
      <div class="service-grid">
        ${REPORT_LINKS.map(
          (r) => `
          <a class="service-card" href="#${r.route}">
            <span class="service-card__badge">Phase 2</span>
            <div class="service-card__icon">${r.icon}</div>
            <div class="service-card__title">${r.title}</div>
            <p class="service-card__desc">${r.desc}</p>
          </a>
        `
        ).join("")}
      </div>
    </div>
  `;
}

export function renderReportPlaceholder(main, title) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title,
      subtitle: "This report is being prepared and will be available in a future update.",
      crumb: `Reports / ${title}`,
    })}

    <div class="container page-section">
      <div class="placeholder-box">
        <div class="placeholder-box__icon">🚧</div>
        <h2>${title} — Coming in Phase 2</h2>
        <p>
          This section is reserved for detailed, filterable report data (district / taluk /
          shop-wise, as applicable). The navigation and routing for this page are ready;
          the report tables and filters will be built in the next development phase.
        </p>
        <div class="flex-wrap-gap" style="justify-content:center;">
          <a href="#/reports" class="btn btn--outline">Back to Reports</a>
          <a href="#/" class="btn btn--primary">Back to Home</a>
        </div>
      </div>
    </div>
  `;
}
