'use strict';
const dom = (() => {
    return {
        render: (element_id, content, append) => {
            if (append) document.getElementById(element_id).innerHTML += content;
            else document.getElementById(element_id).innerHTML = content;
        },
        unmount: (element_id) => {
            if (!!document.getElementById(element_id)) document.getElementById(element_id).remove()
        },
        clean: (element_id) => {
            if (!!document.getElementById(element_id)) document.getElementById(element_id).innerHTML = "";
        },
        handleClick: (element_id, handler) => {
            const element = document.getElementById(element_id);
            if (!!element && element.getAttribute('listener') !== 'true') {
                element.addEventListener('click', handler);
            }
        },
        onChange: (element_id, handler) => {
            const element = document.getElementById(element_id);
            if (!!element && element.getAttribute('listener') !== 'true') {
                element.addEventListener('change', handler);
            }
        }
    }
})();