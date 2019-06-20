/**
 * @fileName: 工具类
 * @author: yucon
 * @createdTime: 2019-06-14
 */

/**
 * @method: 格式化时间戳 格式 "yyyy.MM.dd hh:mm:ss S"
 * @remark: 连接符可自定义
 */
export function formatTime (timeStamp, fmt = 'yyyy.MM.dd hh:mm') {
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
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

/**
 * @method: 倒计时格式化
 * @remark: 秒级时间戳
 */
export function countSeconds (second = 86400) {
    let s = parseInt(second % 3600 % 60)
    s = s < 10 ? `0${s}` : s
    let m = parseInt(second % 3600 / 60)
    m = m < 10 ? `0${m}` : m
    let h = parseInt(second / 3600 % 24)
    h = h < 10 ? `0${h}` : h
    let d = parseInt(second / 86400)
    if (second < 3600) {
        return `${m} 分钟 ${s} 秒`
    } else {
        return `${d} 天 ${h} 小时 ${m} 分钟 ${s} 秒`
    }
}

/**
 * filters 全局过滤器
 */
export const filters = {
    // 保留两位小数点
    toFixed (val) {
        if (!val) return ''
        return val.toFixed(2)
    },

    // 格式化时间 timeStamp： 时间戳  fmt： 格式
    formatTime (timeStamp, fmt) {
        if (!timeStamp) return ''
        return formatTime(timeStamp, fmt)
    },

    // 状态显示，例：state { 1 => 进行中，2 => 已结束，3 => 已超时 }
    stateType (state, stateName) {
        return stateName[state]
    }
}

/**
 * 判断设备
 */
export const environment = () => {
    let ua = navigator.userAgent
    return {
        isAndroid: ua.includes('Android') || ua.includes('Adr'),
        isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isWechat: !!(ua.match(/MicroMessenger/i) === 'MicroMessenger'),
        isQQ: ua.includes('qq'),
        is360: ua.includes('chrome') && _mine('type', 'application/vnd.chromium.remoting-viewer')
    }
}

// 检测是是否360浏览器
function _mine (option, value) {
    let mimeTypes = navigator.mimeTypes;
    for (let mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
            return true;
        }
    }
    return false;
}
