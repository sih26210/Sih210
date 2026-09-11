import { pageHeaderHTML } from "../components/page-header.js";

export function renderAbout(main) {
  main.innerHTML = `
    ${pageHeaderHTML({
      title: "About PDS",
      subtitle: "Understanding the Public Distribution System and its role in food security.",
      crumb: "About PDS",
    })}

    <div class="container page-section">
      <div class="info-grid" style="margin-bottom:36px;">
        <div class="info-panel">
          <h3>🎯 Objective</h3>
          <p style="font-size:0.92rem; color:var(--slate-500); margin:0;">
            The Public Distribution System (PDS) ensures food and essential commodity
            security by distributing subsidised grains and items through a network of
            Fair Price Shops to eligible households.
          </p>
        </div>
        <div class="info-panel">
          <h3>🏛️ Governance</h3>
          <p style="font-size:0.92rem; color:var(--slate-500); margin:0;">
            PDS operates under the National Food Security Act (NFSA), jointly
            administered by central and state Civil Supplies departments, with
            entitlements defined by household category.
          </p>
        </div>
        <div class="info-panel">
          <h3>🌾 Coverage</h3>
          <p style="font-size:0.92rem; color:var(--slate-500); margin:0;">
            Coverage spans rice, wheat, sugar, kerosene and other essential
            commodities, distributed monthly through a dense network of Fair
            Price Shops across urban and rural areas.
          </p>
        </div>
      </div>

      <div class="card card--pad">
        <h2>Card Categories</h2>
        <p>Ration cards are issued under different categories based on household income and eligibility criteria:</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Category</th><th>Description</th><th>Typical Entitlement</th></tr>
            </thead>
            <tbody>
              <tr><td>AAY</td><td>Antyodaya Anna Yojana — poorest of the poor households</td><td>35 kg food grains / month (demo figure)</td></tr>
              <tr><td>PHH</td><td>Priority Household — identified priority families</td><td>5 kg per member / month (demo figure)</td></tr>
              <tr><td>NPHH</td><td>Non-Priority Household — general category cardholders</td><td>Subsidised, quantity varies by state (demo figure)</td></tr>
            </tbody>
          </table>
        </div>
        <p style="font-size:0.8rem; color:var(--slate-400); margin-top:12px;">Figures shown are illustrative sample values for this demo portal, not official entitlements.</p>
      </div>

      <div class="page-section--tight text-center" style="padding-top:32px;">
        <a href="#/operations" class="btn btn--primary">Learn how PDS operates &rsaquo;</a>
      </div>
    </div>
  `;
}
