export const Browser = {
    Edge: 0,
    Chrome: 1,
    Unknown: -1,
}

export function getBrowser() {
    if (navigator.userAgent.indexOf("Chrome") !== -1 && navigator.userAgent.indexOf("Edg") === -1) {
        return Browser.Chrome;
    } else if (navigator.userAgent.indexOf("Chrome") !== -1 && navigator.userAgent.indexOf("Edg") !== -1) {
        return Browser.Edge;
    } else {
        return Browser.Unknown;
    }
}
