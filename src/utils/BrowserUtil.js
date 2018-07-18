/**
 * Created by mawei on 2017/7/11.
 * 浏览器 判断
 */

const userAgent = navigator.userAgent;

const BrowserUtil = {

    isOpera() {
        return userAgent.indexOf("Opera") > -1
    },

    isIE() {
        return !!window.ActiveXObject || "ActiveXObject" in window;
    },

    isEdge() {
        return userAgent.indexOf("Edge") > -1;
    },

    isFirefox() {
        return userAgent.indexOf("Firefox") > -1;
    },

    isSafari() {
        return userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1;
    },

    isChrome() {
        return userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
    },

    getIEVersion() {
        if (BrowserUtil.isIE()) {
            let ua = userAgent.toLowerCase();
            let s = ua.match(/rv:([\d.]+)\) like gecko/);
            if (s) {
                return s[1];
            }
            s = ua.match(/msie ([\d.]+)/);
            if (s) {
                return s[1];
            }
        }
        return -1;
    }
}

module.exports = BrowserUtil;