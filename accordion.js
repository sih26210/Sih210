import { el } from "../utils.js";

export function renderAccordion(container, items) {
  container.innerHTML = "";
  items.forEach((item, idx) => {
    const node = el(`
      <div class="accordion-item" data-idx="${idx}">
        <button class="accordion-trigger" aria-expanded="false">
          <span>${item.q}</span>
          <span class="chev">&#9660;</span>
        </button>
        <div class="accordion-panel">
          <div class="accordion-panel__inner">${item.a}</div>
        </div>
      </div>
    `);
    const trigger = node.querySelector(".accordion-trigger");
    const panel = node.querySelector(".accordion-panel");
    trigger.addEventListener("click", () => {
      const isOpen = node.classList.contains("open");
      // Close all others
      container.querySelectorAll(".accordion-item.open").forEach((openItem) => {
        if (openItem !== node) {
          openItem.classList.remove("open");
          openItem.querySelector(".accordion-panel").style.maxHeight = null;
          openItem.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        node.classList.remove("open");
        panel.style.maxHeight = null;
        trigger.setAttribute("aria-expanded", "false");
      } else {
        node.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
    container.appendChild(node);
  });
}
