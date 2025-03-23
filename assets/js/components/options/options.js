'use strict';
components.options = (options) => {
    const content = `
        <div id="container" class="container">
            <table>
                <tbody>
                <tr class="Grid">
                    <td class="Grid-cell"><a href="https://docs.coingecko.com/reference/introduction" target="_blank">CoinGecko</a> API Key <em>(optional)</em></td>
                    <td class="Grid-cell"><input id="input-apikey" type="text" value="${options.apikey}" /></td>
                </tr>
                </tbody>
            </table>
            <div class="separator"></div>
             <table>
                <tbody>
                <tr class="Grid">
                    <td class="Grid-cell">Base currency</td>
                    <td class="Grid-cell"><input id="input-base" type="text" value="${options.base}" /></td>
                </tr>
                </tbody>
            </table>
            <div class="separator"></div>
            <table>
                <thead>
                <tr class="Grid">
                    <th class="Grid-cell">
                    Currency
                    </th>
                    <th class="Grid-cell" colspan="2" style="display:none">
                    Threshold
                    </th>
                </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
            <div class="add">
                <button id="btn-add"><span class="icon-plus"></span> Add</button>
            </div>
        </div>
    `;
    return content;
}

components.option = (coin) => {
    const content = `
    <tr class="Grid">
        <td class="Grid-cell">${coin.id ? coin.id : `<input type="text" id="new-coin-id"/>`}</td>
        <td class="Grid-cell" style="display:none"><input id="coin-threshold-${coin.id ? coin.id : "new"}" type="number" min="0" value="${coin.threshold}" /></td>
        ${coin.id ?
        `<td>
            <button id="btn-delete-${coin.id}"><span class="icon-trash"></span> Del.</button>
        </td>`
        :
        `<td>
            <button style="width:25px;margin-right:5px" id="btn-valid"><span class="icon-plus"></span></button>
            <button style="width:25px" id="btn-cancel"><span class="icon-close"></span></button>
        </td>`
        }
    </tr>`;

    return content;
}

const renderOptions = (options) => {
    dom.clean("tbody");
    // rendering
    options.coins.forEach(coin => {
        dom.render("tbody", components.option(coin), true);
    })

    // handleClick
    options.coins.forEach(coin =>
        dom.handleClick(`btn-delete-${coin.id}`, ()=>{
            options.coins = options.coins.filter(c => c.id !== coin.id);
            renderOptions(options);
            browser.storage.sync.set({...options});
        })
    )
}

browser.storage.sync.get(null, function (options) {
    dom.render("options", components.options(options));
    renderOptions(options);

    dom.handleClick("btn-add", ()=>{
        document.getElementById("btn-add").disabled = true;
        options.coins.push({id:"", threshold: 0});
        renderOptions(options);

        dom.handleClick("btn-valid", ()=>{
            if (document.getElementById("new-coin-id").value == "") return;
            options.coins[options.coins.length - 1].id = document.getElementById("new-coin-id").value;
            options.coins[options.coins.length - 1].threshold = Number(document.getElementById("coin-threshold-new").value);
            options.coins[options.coins.length - 1].rate = 0;
            options.coins[options.coins.length - 1].change = 0;
            options.coins[options.coins.length - 1].waiting = true;

            browser.storage.sync.set({...options});
            document.getElementById("btn-add").disabled = false;
            renderOptions(options);
        })

        dom.handleClick("btn-cancel", ()=>{
            options.coins.pop();
            document.getElementById("btn-add").disabled = false;
            renderOptions(options);
        })
    })

    dom.onChange("input-apikey", (e)=>{
        if (!e.target) return;
        options.apikey = e.target.value;
        browser.storage.sync.set({...options});
    })

    dom.onChange("input-base", (e)=>{
        if (!e.target) return;
        options.base = e.target.value;
        browser.storage.sync.set({...options});
    })
})