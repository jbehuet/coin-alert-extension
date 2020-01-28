'use strict';
//initialise globals
const components = {
    loader() {
        return `<div id="loader"><div></div> Loading...</div>`;
    },
    error(message) {
        return `<div id="error">${message}</div>`;
    },
    arrow() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6"><g strokemiterlimit="10" fill="none"><path d="m2.35 5v-5"></path><path d="m4.35 3l-2 2-2-2"></path></g></svg>`;
    },
    header() {
        return `
        <header>
            <div class="withIcon">
                <img src="assets/images/coin32.png" width="16" />
                Coin Alert
            </div>
        </header>`
    },
    footer() {
        return `
        <footer>
           version 0.1.0 - provided by <a href="https://coinranking.com">Coinranking</a>
        </footer>`
    }
};