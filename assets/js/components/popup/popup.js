'use strict';
components.popup = (options) => {
    const content = `
        ${components.header()}
        <div id="container" class="container">
           ${!!options.error ? components.error(options.error) : components.coins_list(options)}
        </div>
        ${components.footer(options.updatedAt)}
    `;
    return content;
}

browser.storage.sync.get(null,  (options)=> {
    dom.render("popup", components.popup(options));

    dom.handleClick("btn-settings", ()=>{
        browser.runtime.openOptionsPage();
    })
})

browser.runtime.onMessage.addListener((message) => {
    if (message.type === "update") {
        dom.render("popup", components.popup(message.options));
    }
});