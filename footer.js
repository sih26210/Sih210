import { el } from "../utils.js";
import { HELPLINE } from "../data.js";

export function renderFooter() {
  const footerRoot = document.getElementById("app-footer");
  const year = new Date().getFullYear();

  const footer = el(`
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">
              <span style="font-size:1.6rem;">🌾</span>
              <strong>PDS e-Services Portal</strong>
            </div>
            <p class="footer-note">
              A demonstration Government Digital Services portal for the Public Distribution
              System — citizen services, department tools and public reports in one place.
              All content on this site is sample data for prototype purposes.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#/about">About PDS</a></li>
              <li><a href="#/operations">Operations</a></li>
              <li><a href="#/reports">Reports</a></li>
              <li><a href="#/faq">FAQ</a></li>
              <li><a href="#/feedback">Feedback</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact (Demo)</h4>
            <ul>
              <li>Toll-Free Helpline: ${HELPLINE.toll_free}</li>
              <li>Complaint Helpline: ${HELPLINE.complaint_no}</li>
              <li>Email: ${HELPLINE.email}</li>
              <li><a href="#/contact">Full contact details</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; ${year} PDS e-Services Portal (Demo Project). All rights reserved.</span>
          <span>Best viewed on modern browsers &middot; Sample content only</span>
        </div>
      </div>
    </footer>
  `);

  footerRoot.innerHTML = "";
  footerRoot.appendChild(footer);
}
