const glow=document.querySelector(".cursor-glow");
document.addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
const menu=document.getElementById("menu");
menu.addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("mobile"));
const chat=document.getElementById("chat");
document.getElementById("openChat").onclick=()=>chat.classList.add("open");
document.getElementById("closeChat").onclick=()=>chat.classList.remove("open");
const input=document.getElementById("input"), send=document.getElementById("send"), messages=document.getElementById("messages");
function sendMessage(){
 const text=input.value.trim(); if(!text)return;
 const user=document.createElement("div"); user.className="msg user"; user.textContent=text; messages.appendChild(user); input.value="";
 const bot=document.createElement("div"); bot.className="msg bot";
 const q=text.toLowerCase();
 if(q.includes("keyword")) bot.textContent="Start with search intent, then compare volume, difficulty, SERP intent and relevance. Build a keyword cluster instead of targeting one term.";
 else if(q.includes("technical")) bot.textContent="Check indexing, crawlability, Core Web Vitals, canonicals, redirects, sitemap, robots.txt, HTTPS and heading structure first.";
 else if(q.includes("content")) bot.textContent="Build content around one primary intent, supporting long-tail queries, strong internal links and genuinely useful information.";
 else bot.textContent="For this demo, I'd start with an SEO audit, keyword research, competitor analysis and a prioritized action plan.";
 messages.scrollTop=messages.scrollHeight;
}
send.onclick=sendMessage; input.addEventListener("keydown",e=>{if(e.key==="Enter")sendMessage()});
document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav nav").classList.remove("mobile")));
