/**
 * Created by mawei on 2017/9/14.
 */
const env = "dev";
let server_host = 'http://localhost:9090';

if (env === 'test') {
    server_host = 'http://27.154.58.94:9090';
} else if (env === 'prod') {
    server_host = 'http://27.154.58.94:9090';
}



/**
 * 联盟列表
 * @type {string}
 */
export const URL_LEAGUE_LIST = server_host + "/web/league/list";

/**
 * 联盟 增、删、改、查
 * @type {string}
 */
export const URL_LEAGUE = server_host + "/web/league";

/**
 * 批量删除
 * @type {string}
 */
export const URL_LEAGUE_DELETE_BATCH = server_host + "/web/league/deleteBatch";