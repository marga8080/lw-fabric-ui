/**
 * Created by mawei on 2017/7/10.
 */
/* eslint-disable */
const JsonUtil = {

    isJson(obj) {
        let isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    },


    formatJson(json) {
        if (!json) {
            return null;
        }
        try {
            JSON.parse(json)
        } catch (e) {
            return json;
        }
        return require('js-beautify')(json);
    },

    isEmptyJson(json) {
        if (!json) {
            return true;
        }
        for(let key in json) {
            return false
        };
        return true;
    },
}

module.exports = JsonUtil;