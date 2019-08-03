import Vue from 'vue';
import ToastComponents from './index.vue';
const ToastController = Vue.extend(ToastComponents);

let Toast = function(params = {
    type: 'none',
    duration: 1500,
    title: ''
}) {
    let data = function() {
        return params;
    }
    let initToast = new ToastController({ data });
    initToast.$mount();
    document.body.appendChild(initToast.$el);

    setTimeout(() => {
        document.body.removeChild(initToast.$el);
    }, params.duration)

    return initToast;
};

export default function() {
    Vue.prototype.$toast = Toast;
};
