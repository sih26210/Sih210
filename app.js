import { renderHeader } from "./header.js";
import { renderFooter } from "./footer.js";
import { registerRoute, setNotFound, initRouter } from "./router.js";

import { renderHome } from "./home.js";
import { renderAbout } from "./about.js";
import { renderOperations } from "./operations.js";
import { renderReportsHub, renderReportPlaceholder } from "./reports.js";
import { renderFeedback } from "./feedback.js";
import { renderFaq } from "./faq.js";
import { renderContact } from "./contact.js";
import { renderCitizenLogin } from "./citizen-login.js";
import { renderDepartmentLogin } from "./department-login.js";
import { renderComplaint } from "./complaint.js";
import { renderConvertCard } from "./convert-card.js";
import { renderGenericInfoPage } from "./generic-info.js";
import { renderNotFound } from "./not-found.js";

renderHeader();
renderFooter();

// Core Phase 1 pages
registerRoute("/", renderHome, { title: "Home" });
registerRoute("/about", renderAbout, { title: "About PDS" });
registerRoute("/operations", renderOperations, { title: "Operations" });
registerRoute("/reports", renderReportsHub, { title: "Reports" });
registerRoute("/feedback", renderFeedback, { title: "Feedback" });
registerRoute("/faq", renderFaq, { title: "FAQ" });
registerRoute("/contact", renderContact, { title: "Contact Us" });

registerRoute("/citizen-login", renderCitizenLogin, { title: "Citizen Login" });
registerRoute("/department-login", renderDepartmentLogin, { title: "Department Login" });
registerRoute("/complaint", renderComplaint, { title: "Register a Complaint" });
registerRoute("/convert-card", renderConvertCard, { title: "Convert Your Card" });

// Report placeholders (Phase 2)
const reportRoutes = [
  ["/reports/nfsa", "NFSA Reports"],
  ["/reports/nfsa-offtake", "NFSA Off-take Reports"],
  ["/reports/pds", "PDS Reports"],
  ["/reports/godown-stock", "Godown Stock Reports"],
  ["/reports/hostels", "Hostels & Welfare Institutions List"],
];
reportRoutes.forEach(([path, title]) => {
  registerRoute(path, (main) => renderReportPlaceholder(main, title), { title });
});

// Generic informational home-section pages (Phase 1 content, simple layout)
const infoPages = [
  ["/epds-status", "Status of E-PDS Implementation", "epds"],
  ["/family-card", "Family Card Details", "family-card"],
  ["/citizen-centric", "Citizen Centric Details", "citizen-centric"],
  ["/consumer-awareness", "Consumer Awareness Video", "consumer-awareness"],
  ["/smart-card-apply", "Smart Card Application Services", "smart-card-apply"],
  ["/duplicate-card", "Duplicate Smart Card", "duplicate-card"],
  ["/smart-card-services", "Smart Card Related Services", "smart-card-services"],
  ["/authorised-person", "Authorised Person", "authorised-person"],
  ["/sms-services", "SMS Services", "sms-services"],
];
infoPages.forEach(([path, title, variant]) => {
  registerRoute(path, (main) => renderGenericInfoPage(main, title, variant), { title });
});

setNotFound(() => renderNotFound());

initRouter();
