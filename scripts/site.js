const site = {
    getCookieByName(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return decodeURIComponent(match[2]);
        return null;
    },


    getIpAddress() {
        return fetch("https://api.ipify.org/?format=json")
            .then(response => response.json())
            .then(data => {
                return data.ip;
            })
            .catch(error => {
                console.error("Error fetching IP address:", error);
                throw error;
            });
    }
};

dragElement(document.getElementById("draggable"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || Event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || Event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.parentNode.style.top = (elmnt.parentNode.offsetTop - pos2) + "px";
        elmnt.parentNode.style.left = (elmnt.parentNode.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


window.site = site;