var isFirefox = typeof InstallTrigger !== "undefined";

(async function () {
  await chrome.tabs.onUpdated.addListener(async function (
    tabId,
    changeInfo,
    tab
  ) {
    let config = await chrome.storage.local.get("enabled");
    let lastUrlChanged;

    if (!isFirefox) {
      lastUrlChanged = await chrome.storage.session.get("lastUrlChanged");
    } else {
      // lastUrlChanged = sessionStorage.getItem("lastUrlChanged"); For firefox
    }
    if (
      config.enabled &&
      changeInfo.url &&
      changeInfo.url.startsWith("https://www.youtube.com/watch?v=") &&
      (!lastUrlChanged || lastUrlChanged != changeInfo.url)
    ) {
      console.log("Reloading tab");
      await chrome.tabs.reload(tabId);
      if (!isFirefox) {
        await chrome.storage.session.set({ lastUrlChanged: changeInfo.url });
      } else {
        // sessionStorage.setItem("lastUrlChanged", changeInfo.url); for firefox
      }
    }
  });
})();
