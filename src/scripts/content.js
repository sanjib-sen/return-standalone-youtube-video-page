function myMain() {
  var jsInitChecktimer = setInterval(checkForJS_Finish, 111);
  function checkForJS_Finish() {
    if (
      document.getElementsByClassName("style-scope ytd-rich-grid-row") &&
      document.getElementsByClassName("style-scope ytd-rich-grid-row").length >
        0
    ) {
      clearInterval(jsInitChecktimer);
      console.log(
        document.getElementsByClassName("style-scope ytd-rich-grid-row")
      );
      document.querySelectorAll("a").forEach(function (a) {
        a.onclick = function (e) {
          e.preventDefault();
          window.location.href = a.href;
          return false;
        };
      });
    }
  }
}

(async function () {
  let config = await chrome.storage.sync.get("enabled");
  if (config.enabled) {
    window.addEventListener("yt-navigate-finish", myMain, true);
  }
})();
