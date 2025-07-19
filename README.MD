# ✨ WordHelp – AI Writing Assistant Chrome Extension

**WordHelp** is a powerful Chrome Extension that enhances your reading and writing experience using AI. With just a double-click on any word or sentence, it provides instant definitions, writing improvements, and manages open tabs via AI suggestions — all within your browser!

---

## 🚀 Features

### 🧠 AI-Powered Text Improvement
- Select any sentence and get an improved version using the Groq AI model (LLaMA3).
- Quickly rewrite unclear or poorly structured content.

### 📖 Dictionary Definitions
- Double-click a single word to fetch its definition instantly via the free Dictionary API.

### 🧰 Clean Tooltip UI
- Minimal, non-intrusive tooltip UI with easy interaction and click-to-improve button.

### 🗂️ Tab Management (Optional Utility)
- Extension is structured to support background script and manifest-based tab access.
- Can be extended to manage open tabs (close unused ones, categorize reading tabs, etc.).

---

## 🧩 How It Works

- The extension injects a content script into active tabs.
- On **double-click**, it checks if a word or sentence is selected.
  - If it's a single word → fetches dictionary definition.
  - If it's a sentence → sends it to backend API (`/improve`) for AI enhancement.
- Tooltip appears with the result and an option to trigger AI improvement.

---

## 📁 Project Structure

wordhelp-extension/
├── background.js # Handles context menu, install actions
├── content.js # Injected into pages for tooltip + interaction
├── manifest.json # Chrome extension manifest (v3)
├── server/
│ └── index.js # Express.js backend with Groq AI integration
├── icons/ # Icons for Chrome extension
│ ├── icon16.png
│ └── icon128.png
├── README.md # You’re reading it



---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Abhisheksaha7530/WordHelp-Extensions
cd WordHelp-extension

2. Install and Start Backend Server
Make sure you have Node.js and npm installed.

bash
Copy
Edit
cd server
npm install
touch .env
Inside .env, add:

ini
Copy
Edit
GROQ_API_KEY=your_groq_api_key_here
Then run:

bash
Copy
Edit
node index.js
Server will start at http://localhost:3001

3. Load Chrome Extension
Go to chrome://extensions/

Enable Developer Mode

Click Load Unpacked

Select the root wordhelp-extension/ folder (where manifest.json is)

Done!

🛠️ Tech Stack
Frontend: Vanilla JS + Chrome APIs + Shadow DOM

Backend: Node.js, Express, Groq SDK

AI Model: Groq's LLaMA3-8B

Dictionary API: https://dictionaryapi.dev

🔐 Permissions Required

activeTab: To inject scripts on currently active tabs.

scripting: To run content scripts.

contextMenus: To add right-click options for selected text.

🌟 Future Ideas

Option to toggle AI features on/off

Sentence complexity level feedback

Save improved versions locally


🙌 Acknowledgements
Groq AI for powerful LLaMA3 models

Free Dictionary API

Open Source Chrome Extension Community