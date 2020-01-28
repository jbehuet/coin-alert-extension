'use strict';
const transport = (() => {
    return {
        fetch: (url) => {
            return new Promise((resolve, reject) => {
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
        }
    }
})();