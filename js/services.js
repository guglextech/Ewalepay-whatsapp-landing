import { CONFIG } from "./config.js";
import { $, esc } from "./dom.js";
import { icon } from "./icons.js";

export function renderServices() {
  $("#servicesGrid").innerHTML = CONFIG.services.map((s, i) => `
    <article class="service reveal" style="--d:${i * 80}ms">
      <span class="ic">${icon(s.icon, 22)}</span>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
      <a data-wa data-wa-text="${esc(s.message)}">Try on WhatsApp ${icon("arrow", 16)}</a>
    </article>`).join("");
}
