'use strict';
const transport = (() => {
    return {
        fetch: (url, api_key) => {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("x-cg-demo-api-key", api_key);
                xhr.onload = () => {
                    try {
                        if (xhr.status != 200) {
                            reject();
                        }
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