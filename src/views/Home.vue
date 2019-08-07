<template>
    <div class="home">
        <p class="cl-main">Home</p>
        <span class="iconfont iconhome"></span>
        <p>{{ 50.1650 | toFixed }}</p>
        <p>{{ '1560843960' | formatTime }}</p>
        <div v-for="item in list" :key="item.state">{{ item.state | stateType(['已结束', '进行中', '已超时']) }}</div>

        <modal modalTitle="活动申请" confirmText="好的" v-model="modalFlag" @closeModal="modalFlag = false" :mask="false">
            <div slot="content">
                <div>asdasdasd</div>
            </div>
        </modal>

        <div class="box back-color-main" @click="modalFlag = true"></div>
        <router-link :to="{ name: 'user/about' }">router -> user/about</router-link>
        <button @click="showToast">提示</button>
        <button @click="showAlert">alert</button>
        <button @click="showOther">其他toast 测试</button>
    </div>
</template>

<script>
import { environment } from '@/utils/util'
import { mapState } from 'vuex'

const modal = () => import('@/components/modal')

export default {
    name: 'home',
    components: {
        modal
    },
    data() {
        return {
            timer: null,
            list: [
                { state: 1 },
                { state: 0 },
                { state: 2 }
            ],
            modalFlag: false,
            index: 1
        }
    },

    created() {
        console.log(environment().isAndroid);

        /* 轻提示
         * type 支持的类型为 none, success, error, success
         */
        this.$toast('成功', 'none');
    },
    computed: {
        ...mapState(['user_Info'])
    },
    methods: {
        /* 轻提示 loading */
        showToast() {
            this.index += 1;

            // loading
            this.$toast(this.index, 'loading');

            // hide() 用于关闭 type = loading 的 toast
            setTimeout(() => {
                this.$toast.hide();
            }, 3000)
        },

        /* 模态框 */
        showAlert() {
            this.$alert({
                title: '温馨提示',
                content: 'hahah ',
                onConfirm: res => {
                    console.log(res);
                    /* 这里是点击了确认的回调 */
                },
                onCancel: res => {
                    console.log(res);
                    /* 这里是点击了取消的回调 */
                }
            })
        },

        showOther() {
            this.$toast('失败', 'error', 20000);
        }
    }
}
</script>
<style lang="scss" scoped>
.boll {
    :hover {
        fill: red;
    }
}
.box{
    width: 50px;
    height: 50px;
}
</style>
