document
  .getElementById("checkbox")
  .addEventListener("change", async function () {
    if (this.checked) {
      await chrome.storage.local.set({ enabled: true });
    } else {
      await chrome.storage.local.set({ enabled: false });
    }
    // If the user is on YouTube and the extension state is chnaged, reload the page
  });

(async function () {
  let config = await chrome.storage.local.get("enabled");
  if (config.enabled) {
    document.getElementById("checkbox").checked = true;
  } else {
    document.getElementById("checkbox").checked = false;
  }
})();
