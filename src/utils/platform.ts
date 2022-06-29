export enum OS {
    Windows = "windows",
    MacOS = "macos",
    Unix = "unix",
    Linux = "linux",
    Android = "android",
    IOS = "ios",
    Huawei = "huawei",
    Unknown = "unknown",
}

export enum Browser {
    Chrome = "chrome",
    Firefox = "firefox",
    IE = "ie",
    Edge = "edge",
    Safari = "safari",
    Opera = "opera",
    YaBrowser = "ya-browser",
    Unknown = "unknown",
}

const uA = window.navigator?.userAgent ?? window.navigator?.userAgentData
const aV = navigator.userAgentData?.platform ?? window.navigator.appVersion

function getOperatingSystem() {
    let operatingSystem = OS.Unknown
    const _aV = aV.toLowerCase()

    if (_aV.indexOf("win") !== -1) {
        operatingSystem = OS.Windows
    }
    if (_aV.indexOf("mac") !== -1) {
        operatingSystem = OS.MacOS
    }
    if (_aV.indexOf("x11") !== -1) {
        operatingSystem = OS.Unix
    }
    if (_aV.indexOf("linux") !== -1) {
        operatingSystem = OS.Linux
    }

    return operatingSystem;
}

function getBrowser() {
    let currentBrowser = Browser.Unknown;
    const _aV = aV.toLowerCase()

    if (uA.indexOf("Chrome") !== -1) {
        currentBrowser = Browser.Chrome
    } else if (uA.indexOf("Firefox") !== -1) {
        currentBrowser = Browser.Firefox
    } else if (uA.indexOf("MSIE") !== -1) {
        currentBrowser = Browser.IE
    } else if (uA.indexOf("Edge") !== -1) {
        currentBrowser = Browser.Edge
    } else if (uA.indexOf("Safari") !== -1) {
        currentBrowser = Browser.Safari
    } else if (uA.indexOf("Opera") !== -1) {
        currentBrowser = Browser.Opera
    } else if (uA.indexOf("Opera") !== -1) {
        currentBrowser = Browser.YaBrowser
    } else {
        console.log("Others");
    }

    return currentBrowser;
}

export const Platform = {
    OS: getOperatingSystem(),
    browser: getBrowser(),
}
