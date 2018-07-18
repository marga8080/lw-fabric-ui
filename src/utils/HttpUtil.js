/**
 * Created by mawei on 2017/4/28.
 */

const TIMEOUT = 120000;

export default class HttpUtil {

    static get(url, paramters, headers = {}, method = 'GET') {
        return new Promise(function (resolve, reject) {
            let timeoutId = setTimeout(function () {
                reject(new Error("连接超时"))
            }, TIMEOUT);
            url = HttpUtil.urlAppendQeury(url, paramters);
            headers.Accept = 'application/json';

            fetch(url, {
                // credentials: "include",
                method: method,
                headers: headers,
            }).then((response) => response.json())
                .then((json) => {
                    clearTimeout(timeoutId);
                    if (!json.errcode && !json.hasOwnProperty('error')) { // oauth 返回结构不包含errcode
                        json.errcode = '0';
                    }
                    if (json.errcode === '0') {
                        resolve(json);
                    } else {
                        if (json.errcode === '207') {
                            alert(json.errmsg || '频繁操作');
                        }
                        reject(new Error(json.errmsg || json.error || '请求错误'));
                    }
                }).catch((error) => {
                    timeoutId && clearTimeout(timeoutId);
                    reject(error);
                }
            );
        })
    }



    static delete(url, paramters, headers = {},) {
        return this.get(url, paramters, headers, 'DELETE');
    }

    static post(url, paramters, headers = {}, method = 'POST') {
        return new Promise(function (resolve, reject) {
            let timeoutId = setTimeout(function () {
                reject(new Error("连接超时"))
            }, TIMEOUT);

            let headers2 = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            headers = {...headers2, ...headers};

            fetch(url, {
                // credentials: "include",
                method: method,
                headers: headers,
                body: JSON.stringify(paramters)
            }).then((response) => response.json())
                .then((json) => {
                    clearTimeout(timeoutId);
                    if (!json.errcode && !json.hasOwnProperty('error')) { // oauth 返回结构不包含errcode
                        json.errcode = '0';
                    }
                    if (json.errcode === '0') {
                        resolve(json);
                    } else {
                        if (json.errcode === '207') {
                            alert(json.errmsg || '频繁操作');
                        }
                        reject(new Error(json.errmsg || json.error || '请求错误'));
                    }
                }).catch((error) => {
                    timeoutId && clearTimeout(timeoutId);
                    reject(error);
                }
            );
        })
    }



    static put(url, paramters, headers={}) {
        return this.post(url, paramters, headers, 'PUT');
    }

    static urlAppendQeury(url, query){
        if (query) {
            let queryString = Object.keys(query).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(query[key]);
            }).join("&");
            if (url.indexOf('?') === -1) {
                queryString = '?' + queryString;
            } else {
                queryString = '&' + queryString;
            }
            return url + queryString;
        }
        return url;
    }
}
