const glow = document.querySelector(".cursor-glow");

if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

const menu = document.getElementById("menu");

if (menu) {
  menu.addEventListener("click", () => {
    document.querySelector(".nav nav")?.classList.toggle("mobile");
  });
}

const chat = document.getElementById("chat");
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");

if (openChat && chat) {
  openChat.onclick = () => chat.classList.add("open");
}

if (closeChat && chat) {
  closeChat.onclick = () => chat.classList.remove("open");
}

const input = document.getElementById("input");
const send = document.getElementById("send");
const messages = document.getElementById("messages");

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `msg ${type}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

async function sendMessage() {
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const bot = addMessage("Thinking…", "bot");

  send.disabled = true;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Nebula AI could not respond.");
    }

    bot.textContent = data.reply;

  } catch (error) {

    console.error(error);

    bot.textContent =
      "Sorry, Nebula AI couldn't connect right now. Please try again.";

  } finally {

    send.disabled = false;
    messages.scrollTop = messages.scrollHeight;

  }
}

if (send) {
  send.onclick = sendMessage;
}

if (input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
}

document.querySelectorAll(".nav nav a").forEach((a) => {
  a.addEventListener("click", () => {
    document.querySelector(".nav nav")?.classList.remove("mobile");
  });
});
