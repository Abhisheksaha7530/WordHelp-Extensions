markdown
# ✨ WordHelp – Improve Your Writing with AI

**WordHelp** is a lightweight browser extension that uses AI to help you **rewrite, refine, or improve** your selected text. Whether you're writing emails, messages, or social media posts — WordHelp makes it better.

---

## 📌 Features

* **✍️ Right-click Improvement**: Select any text → Right-click → “✍ Improve with WordHelp AI”
* **💡 Double-click Definitions**: Double-click a word to see its definition and optionally improve it
* **🧠 AI-Powered Suggestions**: Uses a hosted backend to enhance your writing in real-time
* **⚡️ Fast & Minimal**: No bloated UI or popups. Just select and go.

---
#Image

## 🚀 How to Use

### 🔌 1. Install the Extension Locally

1.  Download or clone this repo:
    ```bash
    git clone [https://github.com/Abhisheksaha7530/WordHelp-Extensions.git](https://github.com/Abhisheksaha7530/WordHelp-Extensions.git)
    ```
2.  Go to `chrome://extensions/` (or your Chromium browser's extension page).
3.  Enable **Developer Mode**.
4.  Click **Load unpacked** and select the `client/` folder inside the repo.

### 🖱️ 2. Try It Out

* ✅ **Double-click any word** — you'll see a floating tooltip with its definition and an "Improve" button.
* ✅ **Right-click selected text** — choose "✍ Improve with WordHelp AI" to get enhanced suggestions.

---

## 🧠 Backend (Hosted)

The AI text enhancement is handled by a Node.js backend hosted externally on Render:

`https://wordhelp-extensions.onrender.com/improve`

This API receives your text and returns an improved version using AI logic.

⚠️ The backend code is not pushed to this repository. If you'd like a version of the backend for local development, feel free to request it.

---

## 📁 Project Structure

````

WordHelp-Extensions/
├── client/                     \# Browser extension source code
│   ├── background.js           \# Handles background tasks
│   ├── content.js              \# Interacts with web page content
│   ├── manifest.json           \# Extension manifest file
│   ├── icons/                  \# Extension icons
│   └── ...
└── docs/                       \# Documentation and related files
└── index.html



---

## ✅ Browser Compatibility

| Browser         | Supported |
| :-------------- | :-------- |
| Chrome          | ✅ Yes    |
| Edge            | ✅ Yes    |
| Brave           | ✅ Yes    |
| Kiwi (Android)  | ✅ Yes    |

---

## 🙋 Author

[Abhishek Saha](https://github.com/Abhisheksaha7530)
```
