import { pageHeaderHTML } from "../components/page-header.js";
import { renderAccordion } from "../components/accordion.js";
import { FAQ_ITEMS } from "../data.js";

export function renderFaq(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Frequently Asked Questions",
      subtitle: "Quick answers to common questions about ration cards and PDS services.",
      crumb: "FAQ",
    })}

    <div class="container page-section">
      <div class="form-page">
        <div id="faq-accordion"></div>

        <div class="card card--pad text-center" style="margin-top:32px;">
          <h3 style="margin-bottom:8px;">Still have questions?</h3>
          <p style="margin:0 0 16px 0; color:var(--slate-500);">Reach out to us directly or register a complaint if you're facing a service issue.</p>
          <div class="flex-wrap-gap" style="justify-content:center;">
            <a href="#/contact" class="btn btn--outline">Contact Us</a>
            <a href="#/complaint" class="btn btn--primary">Register a Complaint</a>
          </div>
        </div>
      </div>
    </div>
  `;

  renderAccordion(main.querySelector("#faq-accordion"), FAQ_ITEMS);
}
