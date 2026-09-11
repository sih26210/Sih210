export function renderNotFound() {
  return `
    <div class="container page-section text-center">
      <div class="placeholder-box">
        <div class="placeholder-box__icon">🔍</div>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <a href="#/" class="btn btn--primary">Back to Home</a>
      </div>
    </div>
  `;
}
