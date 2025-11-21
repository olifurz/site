const site = {
    getCookieByName(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return decodeURIComponent(match[2]);
        return null;
    },

    getColorFromString(string) {
        const colors = [
            "rosewater", "flamingo", "pink", "mauve", "red",
            "maroon", "peach", "yellow", "green", "teal",
            "sky", "lavender", "blue", "sapphire"
        ];

        const hash = [...string].reduce((acc, char) => acc + char.charCodeAt(0) * 31, 0);
        let index = Math.abs(hash) % colors.length;

        if (string.toLowerCase() === "olifurz") {
            return "pink";
        } else if (string.toLowerCase() === "sunshine") {
            return "yellow";
        }

        return colors[index];
    },
};

window.site = site;