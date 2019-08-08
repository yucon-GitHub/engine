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

        <router-link :to="{ name: 'user/about' }">router-path</router-link>

        <div class="flex flex-column-center flex-warp btn-group">
            <button @click="showToast">提示</button>
            <button @click="showAlert">alert</button>
            <button @click="showOther">其他toast 测试</button>
            <button @click="formFilter">表单验证</button>
        </div>
        <div style="height: 1000px;"></div>
    </div>
</template>

<script>
import { environment, schema, scrollBottom } from '@/utils/util';
import { mapState } from 'vuex';

const modal = () => import('@/components/modal');

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
            index: 1,
            name: 'hah',
            phone: '',
            loadMore: true
        };
    },

    created() {
        console.log(environment().isAndroid);

        /* 轻提示
         * type 支持的类型为 none, success, error, success
         */
        // this.$toast('成功', 'none');

        scrollBottom(res => {
            if (this.loadMore) this.getList();
        });
        // console.log(scrollBottom());
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
            }, 3000);
        },

        /* 模态框 */
        showAlert() {
            this.$alert({
                title: '温馨提示',
                content: 'hahah ',
                onConfirm: res => {
                    console.log(res);
                    /* 这里是点击了确认的回调 */

                    // 关闭模态框
                    this.$alert.hide();
                },
                onCancel: res => {
                    console.log(res);
                    /* 这里是点击了取消的回调 */
                }
            });
        },

        showOther() {
            this.$toast('失败', 'error');
        },

        // 表单合法检测
        formFilter() {
            schema.bind(this)({
                name: { require: true, message: '请输入您的姓名' },
                phone: { require: true, message: '请输入您的手机号', regexp: /^1\d{10}$/, regexpMsg: '手机号类型错误' }
            }).then(() => {
            // do something
            });
        },

        // 下拉执行方法
        getList() {
            this.loadMore = false;
            let duration = [1000, 2000, 3000, 5000][Math.floor(Math.random() * 3)];
            this.$toast('正在加载', 'loading');
            setTimeout(() => {
                console.log('加载完毕, 释放方法锁');
                this.loadMore = true;
                this.$toast.hide();
            }, duration);
        }
    }
};
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
.btn-group {
    button {
        margin: 5px;
    }
}
</style>
