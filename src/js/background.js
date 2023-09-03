chrome.runtime.onMessage.addListener((request) => {
    if (request === "ShowOptions") {
        chrome.runtime.openOptionsPage();
    }
  });