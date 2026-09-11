import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { registerRoute, setNotFound, initRouter } from "./router.js";

import { renderHome } from "./pages/home.js";
import { renderAbout } from "./pages/about.js";
import { renderOperations } from "./pages/operations.js";
import { renderReportsHub, renderReportPlaceholder } from "./pages/reports.js";
import { renderFeedback } from "./pages/feedback.js";
import { renderFaq } from "./pages/faq.js";
import { renderContact } from "./pages/contact.js";
import { renderCitizenLogin } from "./pages/citizen-login.js";
import { renderDepartmentLogin } from "./pages/department-login.js";
import { renderComplaint } from "./pages/complaint.js";
import { renderConvertCard } from "./pages/convert-card.js";
import { renderGenericInfoPage } from "./pages/generic-info.js";
import { renderNotFound } from "./pages/not-found.js";

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
