document.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("tabList");
  const searchInput = document.getElementById("search");

  // Load and display tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${tab.url}" target="_blank" title="${tab.url}">${tab.title || tab.url}</a>`;
      ul.appendChild(li);
    });
  });

  // Filter tabs by title or URL
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const lis = document.querySelectorAll("#tabList li");
    lis.forEach((li) => {
      li.style.display = li.textContent.toLowerCase().includes(query) ? "" : "none";
    });
  });
});
