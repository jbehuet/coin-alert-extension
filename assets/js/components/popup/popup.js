'use strict';
components.popup = (coins) => {
    const content = `
        ${components.header()}
        <div id="container" class="container">${components.coins_list(coins)}</div>
        ${components.footer()}
    `;

    return content;
}

chrome.storage.sync.get("coins", function (data) {
    dom.render("popup", components.popup(data.coins));
})