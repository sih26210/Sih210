export function pageHeaderHTML({ title, subtitle = "", crumb = "" }) {
  return `
    <div class="page-header">
      <div class="container">
        <div class="breadcrumb"><a href="#/">Home</a> ${crumb ? `/ ${crumb}` : ""}</div>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
      </div>
    </div>
  `;
}
