import Vue from 'vue';
import template from './index.vue';
// vue 构造组件
const ComponentsController = Vue.extend(template);

/**
 *  [method] Toast 组件
 *  [params] 配置参数：
 *  title = '提示文案'
 *  type = 显示类型（支持 'none', 'success', 'error', 'loading')
 *  mask = 遮罩层 (true 时禁止用户其他行为)
 *  duration = 显示时间
 */
const Toast = function(title = '', type = 'none', duration = 1500, mask = false) {
    const components = {
        /* data 对象为 template 里的data */
        data() {
            let params = {
                title,
                type,
                duration,
                mask: type === 'loading' || type === 'alert'
            };
            return params;
        }
    };

    let initToast = new ComponentsController(components);
    initToast.$mount();

    /*  如存在toast 清空之前的节点重新生成 */
    if (document.querySelector('#Toast')) {
        const toastDom = document.getElementById('Toast');
        document.getElementsByTagName('body')[0].removeChild(toastDom);
    }

    document.body.appendChild(initToast.$el);

    // 非loading 模式下自动关闭
    if (type !== 'loading' && type !== 'alert') {
        setTimeout(() => {
            document.body.removeChild(initToast.$el);
        }, duration);
    }

    return initToast;
};

/**
 *  [method] Alert 组件
 *  [options] 配置参数： title = '提示文案', onConfirm = 确认回调函数， onCancel = 取消回调函数
 */

const Alert = function(options) {
    let { title, content, onConfirm, onCancel } = options;
    const components = {
        /* data 对象为 template 里的data */
        data() {
            let params = {
                title: title,
                type: 'alert',
                content,
                mask: true
            }
            return params
        },
        methods: { onConfirm, onCancel }
    }
    let initToast = new ComponentsController(components);

    initToast.$mount();
    document.body.appendChild(initToast.$el);
};

/* 抛出的方法挂载到vue原型链 */
const ToastComponents = function() {
    Vue.prototype.$toast = Toast;
    Vue.prototype.$toast.hide = function() {
        const toastDom = document.getElementById('Toast');
        document.getElementsByTagName('body')[0].removeChild(toastDom);
    };
};

const AlertComponents = function() {
    Vue.prototype.$alert = Alert;
    Vue.prototype.$alert.hide = function() {
        const toastDom = document.getElementById('Toast');
        document.getElementsByTagName('body')[0].removeChild(toastDom);
    };
};

export {
    ToastComponents,
    AlertComponents
};
