import { $ } from "./dom.js";
import { TICKS } from "./icons.js";

export function playChat() {
  const chat = $("#chat"), status = $("#waStatus");
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const time = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const scroll = () => chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
  const add = (html) => { chat.insertAdjacentHTML("beforeend", html); scroll(); return chat.lastElementChild; };
  const out = (t) => add(`<div class="msg out">${t}<span class="meta">${time()}<span class="ticks">${TICKS}</span></span></div>`);
  async function bot(t, ms = 1000) {
    status.textContent = "typing…"; status.classList.add("typing");
    const typing = add('<div class="msg in typing"><i></i><i></i><i></i></div>');
    await wait(ms);
    typing.remove();
    status.textContent = "online"; status.classList.remove("typing");
    add(`<div class="msg in">${t}<span class="meta">${time()}</span></div>`);
  }
  const opts = (list) => add(`<div class="opts">${list.map((o) => `<span>${o}</span>`).join("")}</div>`);

  async function play() {
    chat.innerHTML = '<div class="day">Today</div>';
    await wait(600); out("Hi 👋");
    await wait(500); await bot("Hello! Welcome to <strong>Ewalepay</strong> 👋<br>What would you like to do today?", 1100);
    await wait(250); const menu = opts(["Buy airtime", "Buy data", "Pay a bill", "Make a payment"]);
    await wait(1800); menu.children[0].classList.add("chosen"); out("Buy airtime");
    await wait(400); await bot("Sure! Which number should I top up?");
    await wait(1200); out("024 *** 1234");
    await wait(400); await bot("How much airtime would you like?");
    await wait(1000); out("20");
    await wait(400); await bot("Please review your request:<br><br>📱 Airtime top-up<br>🔢 024 *** 1234<br>💵 Amount: 20.00<br><br>Reply <strong>YES</strong> to confirm.", 1300);
    await wait(1500); out("YES");
    await wait(400); await bot("✅ <strong>Done!</strong> Your request is complete. Anything else I can help with?", 1200);
    await wait(4500); play();
  }
  play();
}
