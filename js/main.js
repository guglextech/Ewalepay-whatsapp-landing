import { renderServices } from "./services.js";
import { renderFaq } from "./faq.js";
import { hydrate } from "./icons.js";
import { bindWhatsApp } from "./whatsapp.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { playChat } from "./chat.js";

renderServices();
renderFaq();
hydrate();
bindWhatsApp();
initNav();
initReveal();
playChat();
