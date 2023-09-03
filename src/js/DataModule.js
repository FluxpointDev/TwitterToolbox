
class Data {
    constructor() {
        this.Settings = {

        };
        this.HasLoaded = false;
    }

    CreateDataUpdater() {
        if (window.IsExtension) {
            chrome.storage.onChanged.addListener(async (changes, namespace) => {
                for (let [key, { oldValue, newValue }] of Object.entries(
                    changes
                )) {
                    try {
                        if (key === "settings") {
                            if (this.HasLoaded) {
                                this.Settings = JSON.parse(newValue);
                            }
                        }
                    } catch {}

                    //console.log(
                    //    `Storage key "${key}" in namespace "${namespace}" changed.`,
                    //    `Old value was "${oldValue}", new value is "${newValue}".`
                    //);
                }
            });
        }
    }

    async LoadSettings() {
        var JsonString = globalThis.StorageHelper.GetLocalData("settings");

        if (JsonString) {
            this.Settings = JSON.parse(JsonString);
        } else {
            if (window.IsExtension) {
                try {
                    JsonString = await globalThis.StorageHelper.GetExtensionData(
                        "settings"
                    );
                    this.Settings = JSON.parse(JsonString);
                } catch {}
            }

            if (JsonString) {
                window.localStorage.setItem("settings", JsonString);
            } else {
                this.Save();
            }
        }
        this.HasLoaded = true;

        if (JsonString) {
            
        }
    }

    Save() {
        if (this.HasLoaded) {
            globalThis.StorageHelper.SaveData("settings", this.Settings);
        }
    }
}

globalThis.Data = new Data();
