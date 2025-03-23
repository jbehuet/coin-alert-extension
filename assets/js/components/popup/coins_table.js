'use strict';
components.coins_list = function (options) {
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
                <th class="Grid-cell text-right">
                Last 24h
                </th>
            </tr>
            </thead>
            <tbody id="tbody">
                 ${options.coins.map( (coin) => components.coin_row(coin, options.base)).join('')}
            </tbody>
        </table>
    `;

    return content;
}


components.coin_row = function (coin, base){
    let content = `<tr class="Grid"><td class="Grid-cell">${coin.id}</td>`;

    if (coin.waiting) {
        content += `<td class="Grid-cell pending"><div></div>pending...</td><td class="Grid-cell"></td>`;
    } else {
        content += `
        <td class="Grid-cell">${coin.rate.toFixed(2)}${base.toUpperCase()}</td>
        <td class="Grid-cell change ${coin.change < 0 ? 'negative' : 'positive'}">
            <div class="withIcon content-end">
                <span>${Math.abs(coin.change).toFixed(2)}%</span>
                ${components.arrow()}
            </div>
        </td>`;
    }

    return content + '</tr>';
};