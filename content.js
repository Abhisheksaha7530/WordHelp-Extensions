// // Utility: Create Shadow DOM container
// const shadowHost = document.createElement("div");
// Object.assign(shadowHost.style, {
//   position: "fixed",
//   top: "10px",
//   right: "10px",
//   zIndex: "999999",
//   pointerEvents: "none"
// });
// document.body.appendChild(shadowHost);

// const shadow = shadowHost.attachShadow({ mode: "open" });

// // Inject tooltip template (safe via DOM methods)
// const style = document.createElement("style");
// style.textContent = `
//   .wordhelp-tooltip {
//     background: #1e1e1e;
//     color: #fff;
//     font-size: 14px;
//     padding: 8px 12px;
//     border-radius: 8px;
//     max-width: 250px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//     pointer-events: auto;
//     cursor: default;
//   }
//   .wordhelp-btn {
//     background: #007bff;
//     color: white;
//     padding: 5px 10px;
//     border: none;
//     border-radius: 4px;
//     margin-top: 6px;
//     cursor: pointer;
//     font-size: 12px;
//   }
//   .wordhelp-btn:hover {
//     background-color: #0056b3;
//   }
// `;
// shadow.appendChild(style);

// const tooltip = document.createElement("div");
// tooltip.id = "tooltip";
// tooltip.className = "wordhelp-tooltip";
// tooltip.style.display = "none";
// shadow.appendChild(tooltip);

// // Function: fetch meaning
// async function fetchDefinition(word) {
//   try {
//     const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
//     const data = await res.json();
//     return data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found.";
//   } catch (err) {
//     return "Error fetching definition.";
//   }
// }

// // Function: call backend AI improve endpoint
// async function improveText(text) {
//   try {
//     const res = await fetch("https://wordhelp-extensions.onrender.com/improve", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text }),
//     });
//     const data = await res.json();
//     return data.improved || "Improvement failed.";
//   } catch (err) {
//     return "Server error.";
//   }
// }

// // Show tooltip near the selection
// function showTooltip(x, y, contentHTML) {
//   tooltip.innerHTML = contentHTML;
//   tooltip.style.display = "block";
//   shadowHost.style.top = `${y + 10}px`;
//   shadowHost.style.left = `${x + 10}px`;
// }

// // Hide tooltip
// function hideTooltip() {
//   tooltip.style.display = "none";
// }

// // On double-click: fetch definition and show tooltip
// document.addEventListener("dblclick", async (e) => {
//   const selectedText = window.getSelection().toString().trim();
//   if (!selectedText) return;

//   const definition = await fetchDefinition(selectedText);
//   showTooltip(e.pageX, e.pageY, `
//     <div><strong>${selectedText}</strong><br>${definition}</div>
//     <button class="wordhelp-btn" id="improve-btn">✍ Improve</button>
//   `);

//   // Wait for button to be attached to DOM
//   requestAnimationFrame(() => {
//     const btn = shadow.getElementById("improve-btn");
//     if (btn) {
//       btn.addEventListener("click", async () => {
//         const improved = await improveText(selectedText);
//         tooltip.innerHTML = `<div><strong>Improved:</strong><br>${improved}</div>`;
//       });
//     }
//   });
// });

// // Hide tooltip if clicking outside
// document.addEventListener("click", (e) => {
//   if (!shadowHost.contains(e.target)) {
//     hideTooltip();
//   }
// });

const shadowHost = document.createElement("div");
shadowHost.style.position = "fixed";
shadowHost.style.top = "10px";
shadowHost.style.right = "10px";
shadowHost.style.zIndex = "999999";
shadowHost.style.pointerEvents = "none";
const shadow = shadowHost.attachShadow({ mode: "open" });
document.body.appendChild(shadowHost);

shadow.innerHTML = `
  <style>
    .wordhelp-tooltip {
      background: #1e1e1e;
      color: #fff;
      font-size: 14px;
      padding: 8px 12px;
      border-radius: 8px;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      pointer-events: auto;
      cursor: default;
      font-family: sans-serif;
    }
    .wordhelp-btn {
      background: #007bff;
      color: white;
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      margin-top: 6px;
      cursor: pointer;
      font-size: 12px;
    }
    .wordhelp-btn:hover {
      background-color: #0056b3;
    }
  </style>
  <div id="tooltip" class="wordhelp-tooltip" style="display:none;"></div>
`;

const tooltip = shadow.querySelector("#tooltip");

async function fetchDefinition(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();
    return data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found.";
  } catch {
    return "❌ Error fetching definition.";
  }
}

function showTooltip(x, y, htmlContent) {
  tooltip.innerHTML = htmlContent;
  tooltip.style.display = "block";

  const tooltipRect = tooltip.getBoundingClientRect();
  const offsetX = x + 10 + tooltipRect.width > window.innerWidth ? -tooltipRect.width - 10 : 10;
  const offsetY = y + 80 > window.innerHeight ? -80 : 10;

  shadowHost.style.top = `${y + offsetY}px`;
  shadowHost.style.left = `${x + offsetX}px`;
}

function hideTooltip() {
  tooltip.style.display = "none";
}

let lastClickTime = 0;

document.addEventListener("dblclick", async (e) => {
  const now = Date.now();
  if (now - lastClickTime < 500) return;
  lastClickTime = now;

  const selectedText = window.getSelection().toString().trim();
  if (!selectedText || selectedText.split(" ").length > 25) return;

  const definition = await fetchDefinition(selectedText);
  showTooltip(e.pageX, e.pageY, `
    <div><strong>${selectedText}</strong><br>${definition}</div>
    <button class="wordhelp-btn" id="improve-btn">✍ Improve</button>
  `);

  setTimeout(() => {
    const btn = shadow.querySelector("#improve-btn");
    if (btn) {
      btn.addEventListener("click", async () => {
        tooltip.innerHTML = `<div>⏳ Improving "${selectedText}"...</div>`;
        const improved = await improveText(selectedText);
        tooltip.innerHTML = `<div><strong>Improved:</strong><br>${improved}</div>`;
      });
    }
  }, 0);
});

document.addEventListener("click", (e) => {
  if (!shadowHost.contains(e.target)) hideTooltip();
});

async function improveText(text) {
  try {
    const res = await fetch("https://wordhelp-extensions.onrender.com/improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return data.improved || "Improvement failed.";
  } catch {
    return "❌ Server error.";
  }
}

// ✅ Message listener for context menu (from background.js)
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "improve_text" && message.text) {
    try {
      const improved = await improveText(message.text);

      const existing = document.getElementById("wordhelp-ai-tooltip");
      if (existing) existing.remove();

      const tip = document.createElement("div");
      tip.id = "wordhelp-ai-tooltip";
      tip.textContent = "💡 " + (improved || "No response");
      Object.assign(tip.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 14px",
        background: "#1e1e1e",
        color: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 999999,
        fontSize: "14px"
      });
      document.body.appendChild(tip);

      setTimeout(() => tip.remove(), 6000);

    } catch (err) {
      console.error("⚠️ Error improving text from context menu:", err);
    }
  }
});
