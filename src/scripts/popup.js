document
  .getElementById("checkbox")
  .addEventListener("change", async function () {
    if (this.checked) {
      await chrome.storage.sync.set({ enabled: true });
    } else {
      await chrome.storage.sync.set({ enabled: false });
    }
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
      url: "https://*.youtube.com/*",
    });
    if (tabs && tabs.length > 0) {
      chrome.tabs.reload(tabs[0].id);
    }
  });
(async function () {
  let config = await chrome.storage.sync.get("enabled");
  if (config.enabled) {
    document.getElementById("checkbox").checked = true;
  } else {
    document.getElementById("checkbox").checked = false;
  }
})();
