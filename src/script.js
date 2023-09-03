LoadExtension();

function LoadExtension() {
    if (location.hostname === "twitter.com") {
        LoadTwitter();
    }
  };

  async function LoadTwitter() {
    await globalThis.Data.LoadSettings();
    globalThis.Data.CreateDataUpdater();
    console.clear();
    
    setTimeout(function () {
        SetToolboxSettingsOptions();
      }, 1000);
  }

  function SetToolboxSettingsOptions() {
    document.querySelector(
        '[data-testid="AppTabBar_More_Menu"]'
      ).addEventListener('click', TwitterMenuOpened)
  }

  function TwitterMenuOpened() {
    setTimeout(function () {
        var Menu = document.querySelector(
            '[role="menu"]'
          ).firstChild.firstChild.firstChild.firstChild;
          
          var Item = Menu.firstChild.cloneNode(true);
          Item.firstChild.href = "javascript:void(0)";
          Item.firstChild.firstChild.firstChild.remove();
          Item.firstChild.firstChild.firstChild.firstChild.textContent = "Twitter Toolbox";
          Item.addEventListener('click', OpenOptionsPage);
          Menu.prepend(Item);
      }, 1000);

    
  }

  function OpenOptionsPage() {
    chrome.runtime.sendMessage("ShowOptions");
  }