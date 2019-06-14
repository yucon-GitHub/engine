/**
 * @fileName: 工具类
 * @author: yucon
 * @createdTime: 2019-06-14
 */

/**
 * @method: 格式化时间戳 格式 "yyyy-MM-dd hh:mm:ss S"
 * @remark: 连接符可自定义
 */
export function formatTime (fmt, timeStamp) {
    var date = new Date(timeStamp * 1000)
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

/**
 * @method: 倒计时格式化
 * @remark: 秒级时间戳
*/
export function countSeconds (second = 86400) {
    let s = parseInt(second % 3600 % 60);
    s = s < 10 ? `0${s}` : s;
    let m = parseInt(second % 3600 / 60);
    m = m < 10 ? `0${m}` : m;
    let h = parseInt(second / 3600 % 24);
    h = h < 10 ? `0${h}` : h;
    let d = parseInt(second / 86400);
    if (second < 3600) {
        return `${m}分${s}`
    } else {
        return `${d} 天 ${h} 小时 ${m} 分钟 ${s} 秒`
    }
}
