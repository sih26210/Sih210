export const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About PDS" },
  { path: "/operations", label: "Operations" },
  { path: "/reports", label: "Reports" },
  { path: "/feedback", label: "Feedback" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact Us" },
];

export const FLASH_NEWS = [
  "Sample notice: e-KYC (Aadhaar seeding) camps to be held at all Fair Price Shops from 15th to 25th of this month — carry your ration card and Aadhaar card.",
  "Demo update: Online application for new Smart Ration Card now open — apply via Citizen Login.",
  "Sample alert: NFSA off-take reports for the previous month have been published under Reports.",
  "Demo notice: Fair Price Shops will remain closed on the 2nd Saturday of every month for stock reconciliation.",
  "This is placeholder / sample flash news for demonstration purposes only.",
];

export const HELPLINE = {
  toll_free: "1800-000-0000",
  complaint_no: "1967",
  whatsapp: "+91 90000 00000",
  email: "xyz@example.com",
};

// Home page service tiles — Phase 1 scope.
// `route` = "/path" for implemented pages, or "/reports/<slug>" placeholder routes.
export const SERVICES = [
  { icon: "👤", title: "Citizen Login", desc: "Access your ration card, applications and complaint status.", route: "/citizen-login" },
  { icon: "🏛️", title: "Department Login", desc: "Authorised access for department & Fair Price Shop staff.", route: "/department-login" },
  { icon: "📊", title: "NFSA Reports", desc: "District and taluk-wise NFSA coverage statistics.", route: "/reports/nfsa", badge: "Phase 2" },
  { icon: "📦", title: "NFSA Off-take Reports", desc: "Monthly commodity off-take against allotment.", route: "/reports/nfsa-offtake", badge: "Phase 2" },
  { icon: "📄", title: "PDS Reports", desc: "Ration shop-wise distribution and sales reports.", route: "/reports/pds", badge: "Phase 2" },
  { icon: "🏬", title: "Godown Stock Reports", desc: "Live stock position at godowns and depots.", route: "/reports/godown-stock", badge: "Phase 2" },
  { icon: "🏨", title: "Hostels & Welfare Institutions", desc: "List of registered hostels and welfare institutions.", route: "/reports/hostels", badge: "Phase 2" },
  { icon: "📝", title: "Register a Complaint", desc: "File a grievance related to ration card or FPS services.", route: "/complaint" },
  { icon: "🔗", title: "Status of E-PDS Implementation", desc: "Track rollout of electronic PDS across the state.", route: "/epds-status" },
  { icon: "🗂️", title: "Family Card Details", desc: "View members and entitlements linked to your family card.", route: "/family-card" },
  { icon: "🔄", title: "Convert Your Card", desc: "Migrate between card categories (AAY / PHH / NPHH).", route: "/convert-card" },
  { icon: "🌐", title: "Citizen Centric Details", desc: "Key citizen-facing services at a glance.", route: "/citizen-centric" },
  { icon: "🎬", title: "Consumer Awareness Video", desc: "Watch short videos on your rights as a PDS consumer.", route: "/consumer-awareness" },
  { icon: "💳", title: "Smart Card Application Services", desc: "Apply for a new smart ration card online.", route: "/smart-card-apply" },
  { icon: "📇", title: "Duplicate Smart Card", desc: "Request a duplicate copy of a lost or damaged card.", route: "/duplicate-card" },
  { icon: "🧰", title: "Smart Card Related Services", desc: "Update member details, address and other corrections.", route: "/smart-card-services" },
  { icon: "🖋️", title: "Authorised Person", desc: "Add or update the authorised nominee for your card.", route: "/authorised-person" },
  { icon: "💬", title: "SMS Services", desc: "Subscribe to SMS alerts for stock and distribution dates.", route: "/sms-services" },
];

export const FAQ_ITEMS = [
  {
    q: "How do I apply for a new smart ration card?",
    a: "Use the “Smart Card Application Services” tile on the Home page or Citizen Login, and fill in the online application with your family and address details. You will receive an acknowledgement number to track the status.",
  },
  {
    q: "I lost my ration card. How do I get a duplicate?",
    a: "Go to “Duplicate Smart Card” from the Home page, provide your existing card number or family ID, and submit the request. A demo acknowledgement will be generated for this portal.",
  },
  {
    q: "How can I convert my card from NPHH to PHH?",
    a: "Use “Convert Your Card” from the Home page. Select your current and desired card category, upload supporting documents, and submit for verification.",
  },
  {
    q: "Where can I check my monthly entitlement?",
    a: "Your entitlement is listed under “Family Card Details” after logging in through Citizen Login.",
  },
  {
    q: "How do I file a complaint against a Fair Price Shop?",
    a: "Use “Register a Complaint” from the Home page or navigation menu. Choose the relevant category, describe the issue, and submit — you will get a reference number for tracking.",
  },
  {
    q: "Are NFSA and PDS reports available publicly?",
    a: "Yes. District and shop-wise reports are available under the Reports section. Detailed report data is being finalised and will be available in the next phase of this portal.",
  },
  {
    q: "How do I know if e-PDS has been implemented in my district?",
    a: "Check “Status of E-PDS Implementation” on the Home page for district-wise rollout status.",
  },
];
