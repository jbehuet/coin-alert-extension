'use strict';
components.coins_list = function (coins) {
    const base_url = "https://api.coinranking.com/v1/public/coin/";

    const onStorageSync = (base, timePeriod) => {
        dom.render("change", `${timePeriod} change`);
        Promise.all(coins.map(coin => transport.fetch(`${base_url}${coin.id}?base=${base}&timePeriod=${timePeriod}`)))
            .then(responses => {
                dom.unmount("loader");
                responses.map(response => {
                    const coin = response.data.coin;
                    const base = response.data.base;
                    dom.render("tbody", components.coin_row(coin, base), true);
                });
            }).catch(error => {
                dom.unmount("loader");
                dom.render("tbody", components.error(error));
            })
    }

    const content = `
        <table>
            <thead>
            <tr class="Grid">
                <th class="Grid-cell">
                Currency
                </th>
                <th class="Grid-cell">
                Rate
                </th>
                <th class="Grid-cell text-right" id="change">
                Change
                </th>
            </tr>
            </thead>
            <tbody id="tbody"></tbody>
        </table>
        ${components.loader()}
    `;

    //Sync with storage to get base
    browser.storage.sync.get('base', ({ base }) => {
        browser.storage.sync.get('timePeriod', ({ timePeriod }) => onStorageSync(base, timePeriod))
    })
    return content;
}


components.coin_row = function (coin, base) {
    const content = `
        <tr class="Grid">
            <td class="Grid-cell">
                <div class="withIcon">
                    <img title="${coin.name}" src="${coin.iconUrl}" height="16">
                    <span>${coin.symbol}</span>
                </div>
            </td>
            <td class="Grid-cell">${Number(coin.price).toFixed(2)}${base.sign}</td>
            <td class="Grid-cell change ${coin.change < 0 ? 'negative' : 'positive'}">
                <div class="withIcon content-end">
                    <span>${Math.abs(coin.change).toFixed(2)}%</span>
                    ${components.arrow()}
                </div>
            </td>
        </tr>`;

    return content;
};