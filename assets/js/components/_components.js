'use strict';
//initialise globals
const components = {
    error(message) {
        return `<div id="error">( 0 _ 0 ) Ooops ${!!message ? "(" + message + ")":""}</div>`;
    },
    arrow() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6"><g strokemiterlimit="10" fill="none"><path d="m2.35 5v-5"></path><path d="m4.35 3l-2 2-2-2"></path></g></svg>`;
    },
    header() {
        return `
        <header>
            <div class="withIcon">
                <img src="/assets/images/coin32.png" width="16" />
                Coin Alert
            </div>
            <div class="settings" id="btn-settings"><span class="icon-settings"></span></div>
        </header>`
    },
    footer(updatedAt) {
        const now = new Date(updatedAt);
        return `
        <footer>
           <div class="time">last update at : ${now.getHours()+":"+ now.getMinutes() + ":" + now.getSeconds()}</div>
           <div>version 0.2.0 - provided by <a href="https://coingecko.com">CoinGecko API</a></div>
        </footer>`
    }
};