import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import action from './action';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user_Info: {}
    },
    mutations,
    action
});

/* 获取多个状态辅助函数用法 */

/*
// mapState

import { mapState } from 'vuex'
computed: {
    ...mapState(['user_Info', 'others'])
}

*/

/*
// 在组件中分发 Action

import { mapActions } from 'vuex'
methods: {
    ...mapActions(["user_Info", "others"])
}
*/
