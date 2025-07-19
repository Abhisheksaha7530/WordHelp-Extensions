// // Use browser.* if available, fallback to chrome.*
// const api = typeof browser !== "undefined" ? browser : chrome;

// // On install
// api.runtime.onInstalled.addListener(() => {
//   console.log("✅ WordHelp extension installed");

//   // Add context menu
//   api.contextMenus.create({
//     id: "wordhelp_ai_writer",
//     title: "✍ Improve with WordHelp AI",
//     contexts: ["selection"]
//   });
// });

// // Handle context menu click
// api.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "wordhelp_ai_writer" && info.selectionText) {
//     // Firefox doesn't support chrome.scripting yet; fallback:
//     if (api.scripting && api.scripting.executeScript) {
//       api.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: showImprovementTooltip,
//         args: [info.selectionText]
//       });
//     } else {
//       api.tabs.executeScript(tab.id, {
//         code: `(${showImprovementTooltip.toString()})(${JSON.stringify(info.selectionText)});`
//       });
//     }
//   }
// });

// // Tooltip injection function
// function showImprovementTooltip(selectedText) {
//   fetch("https://wordhelp-extensions.onrender.com/improve", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ text: selectedText })
//   })
//     .then(res => res.json())
//     .then(data => {
//       const existing = document.getElementById("wordhelp-ai-tooltip");
//       if (existing) existing.remove();

//       const tip = document.createElement("div");
//       tip.id = "wordhelp-ai-tooltip";
//       tip.textContent = "💡 " + (data.improved || "No response");
//       Object.assign(tip.style, {
//         position: "fixed",
//         bottom: "20px",
//         right: "20px",
//         padding: "10px 14px",
//         background: "#1e1e1e",
//         color: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//         zIndex: 999999,
//         fontSize: "14px"
//       });
//       document.body.appendChild(tip);

//       setTimeout(() => tip.remove(), 6000);
//     })
//     .catch(err => console.error("AI fetch error:", err));
// }




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
