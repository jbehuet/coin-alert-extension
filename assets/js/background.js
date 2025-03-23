'use strict';


const onStorageSync = (options) => {
  console.log("Fetching data");
  const base_url = "https://api.coingecko.com/api/v3/simple/price";
  transport
      .fetch(`${base_url}?ids=${options.coins.map(c => c.id).join(",")}&vs_currencies=${options.base}&include_24hr_change=true`, options.apikey)
      .then(function (response) {
        Object.keys(response).map(id => {
          const coin = response[id];
          const index = options.coins.findIndex(c => c.id === id);
          options.coins[index].rate = coin[options.base.toLowerCase()];
          options.coins[index].change = coin[options.base.toLowerCase()+'_24h_change'] ;
          options.coins[index].waiting = false;
        })
        options.error = undefined;
        options.updatedAt = Date.now();
        browser.storage.sync.set({...options });
        browser.runtime.sendMessage({ type: "update", options: {...options }  });
      })
      .catch(error => {
        console.error(error);
        browser.storage.sync.set({error: error});
      })
}

browser.runtime.onInstalled.addListener( ()=> {
  // Prepare storage with default values
  browser.storage.sync.set({
    coins: [
      { id: "bitcoin", threshold: 0, rate: 0, change: 0, waiting: true },
      { id: "ethereum", threshold: 0, rate: 0, change: 0, waiting: true },
    ],
    base: "eur",
    apikey: "",
    error: undefined,
    updatedAt: 0
  })

  // Create an alarm trigged each 1 minute
  browser.alarms.create("fetchData", { periodInMinutes: 1 });
  // Fetch now
  browser.storage.sync.get(null, (options) => onStorageSync(options));

  // Listening alarm
  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "fetchData") {
      browser.storage.sync.get(null, (options) => onStorageSync(options));
    }
  });
});
