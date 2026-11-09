import { CONFIG } from "./config.js";
import { $, $$ } from "./dom.js";

export function bindWhatsApp() {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  if (!number) console.warn("Ewalepay: set CONFIG.whatsappNumber so WhatsApp buttons open the right chat.");
  $$("[data-wa]").forEach((a) => {
    a.href = `https://wa.me/${number}?text=${encodeURIComponent(a.dataset.waText || CONFIG.defaultMessage)}`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
  $("#privacyLink").href = CONFIG.privacyUrl;
  $("#termsLink").href = CONFIG.termsUrl;
  $("#year").textContent = new Date().getFullYear();
}
