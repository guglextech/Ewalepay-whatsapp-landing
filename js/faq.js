import { CONFIG } from "./config.js";
import { $, $$, esc } from "./dom.js";

export function renderFaq() {
  $("#faqList").innerHTML = CONFIG.faqs.map((f, i) => `
    <div class="faq-item">
      <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-${i}">${esc(f.q)}<span class="pm" aria-hidden="true"></span></button>
      <div class="faq-a" id="faq-${i}" role="region"><div><p>${esc(f.a)}</p></div></div>
    </div>`).join("");

  $$(".faq-q").forEach((btn) => btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = !item.classList.contains("open");
    $$(".faq-item.open").forEach((o) => { o.classList.remove("open"); $(".faq-q", o).setAttribute("aria-expanded", "false"); });
    item.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  }));
}
