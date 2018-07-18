/**
 * Created by mawei on 2017/6/15.
 */


export default class ArrayUtils {

    //数组去重
    static unique(list) {
        var res = [];
        var json = {};
        for (let i = 0; i < list.length; i++) {
            if (!json[list[i]]) {
                res.push(list[i]);
                json[list[i]] = 1;
            }
        }
        return res;
    }

    //删除指定元素
    static removeByValue(list, val) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === val) {
                list.splice(i, 1);
                break;
            }
        }
    }

    //删除指定元素
    static removeByKeyValue(list, key, value) {
        for (let i = 0; i < list.length; i++) {
            let val = list[i];
            if (val[key] === value) {
                list.splice(i, 1);
                break;
            }
        }
    }
}