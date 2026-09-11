import { pageHeaderHTML } from "../components/page-header.js";

export function renderOperations(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "Operations",
      subtitle: "How commodities move from procurement to your ration card.",
      crumb: "Operations",
    })}

    <div class="container page-section">
      <div class="steps" style="margin-bottom:40px;">
        <div class="step">
          <div class="step__num">1</div>
          <h3>Procurement</h3>
          <p style="font-size:0.88rem; color:var(--slate-500);">Food grains are procured from farmers and central pools at minimum support price.</p>
        </div>
        <div class="step">
          <div class="step__num">2</div>
          <h3>Storage</h3>
          <p style="font-size:0.88rem; color:var(--slate-500);">Commodities are stored at state and district godowns under quality-controlled conditions.</p>
        </div>
        <div class="step">
          <div class="step__num">3</div>
          <h3>Allocation</h3>
          <p style="font-size:0.88rem; color:var(--slate-500);">Monthly allocation is calculated per Fair Price Shop based on registered cardholders.</p>
        </div>
        <div class="step">
          <div class="step__num">4</div>
          <h3>Distribution</h3>
          <p style="font-size:0.88rem; color:var(--slate-500);">Cardholders collect entitlements at their linked Fair Price Shop using e-PoS verification.</p>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-panel">
          <h3>🏬 Godown Network</h3>
          <ul>
            <li>State-level central godowns</li>
            <li>District distribution centres</li>
            <li>Taluk-level storage points</li>
            <li>Live stock reports available under Reports</li>
          </ul>
        </div>
        <div class="info-panel">
          <h3>🖥️ e-PoS Verification</h3>
          <ul>
            <li>Biometric / Aadhaar-based authentication at Fair Price Shops</li>
            <li>Real-time transaction logging</li>
            <li>Reduces duplication and diversion</li>
          </ul>
        </div>
        <div class="info-panel">
          <h3>📅 Distribution Cycle</h3>
          <ul>
            <li>Monthly allocation cycle</li>
            <li>Fair Price Shops open on notified days</li>
            <li>SMS alerts available — see SMS Services</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
