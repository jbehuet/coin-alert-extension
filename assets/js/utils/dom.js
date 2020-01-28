'use strict';
const dom = (() => {
    return {
        render: (element_id, content, append) => {
            if (append) document.getElementById(element_id).innerHTML += content;
            else document.getElementById(element_id).innerHTML = content;
        },
        unmount: (element_id) => {
            if (!!document.getElementById(element_id)) document.getElementById(element_id).remove()
        }
    }
})();