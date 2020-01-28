'use strict';
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ coins: ["1", "2", "46"], base: "EUR", timePeriod: "24h" })
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https', 'http'] },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
