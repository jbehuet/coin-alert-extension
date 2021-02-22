'use strict';

const fetch = (url) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = () => {
    try {
      const res = JSON.parse(xhr.responseText);
      if ((res.hasOwnProperty('status') && (res.status === "error") || res.status === "fail")) {
        reject(res.message);
      } else {
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  };
  xhr.onerror = () => reject(xhr.statusText);
  xhr.send();
});



browser.runtime.onInstalled.addListener(function () {
  browser.storage.sync.set({
    coins: [
      { id: 1, threshold: 7500 },
      { id: 2, threshold: 155 },
      { id: 46, threshold: 0.18 }
    ],
    base: "EUR",
    timePeriod: "24h"
  })
  setInterval(function () {
    browser.storage.sync.get("coins", function (data) {
      const coins = data.coins;
      const base_url = "https://api.coinranking.com/v1/public/coin/";

      Promise.all(coins.map(coin => fetch(`${base_url}${coin.id}?base=EUR&timePeriod=24h`)))
        .then(responses => {
          const text = responses.reduce((prev, response) => {
            const coin = coins.find(coin => coin.id === response.data.coin.id)
            if (Number(Number(response.data.coin.price).toFixed(2)) <= coin.threshold) {
              prev += "!"
              //prev = prev ? prev + "|" + response.data.coin.symbol : response.data.coin.symbol;
            }
            return prev
          }, '');

          browser.browserAction.setBadgeText({ text })
        }).catch(error => {
          console.log(error)
        })
    })

  }, 1000)
});
