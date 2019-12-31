<template>
    <div class="home">
        <h1 class="cl-main fz-30">Home</h1>
        <span class="iconfont iconhome"></span>

        <!-- fliter -->
        <p>{{ 50.1650 | toFixed }}</p>
        <p>{{ '1560843960' | formatTime }}</p>
        <div v-for="item in list" :key="item.state">{{ item.state | stateType(['已结束', '进行中', '已超时']) }}</div>

        <!-- modal components -->
        <modal modalTitle="活动申请" confirmText="好的" v-model="modalFlag" @closeModal="modalFlag = false" :mask="true" :maskClick="true">
            <div slot="content">
                <div>asdasdasd</div>
            </div>
        </modal>

        <div class="box back-color-main" @click="modalFlag = true"></div>

        <router-link :to="{ name: 'userAbout' }">router-path</router-link>

        <!-- toast btn -->
        <div class="flex flex-column-center flex-warp btn-group">
            <button @click="showToast">提示</button>
            <button @click="showAlert">alert</button>
            <button @click="showOther">其他toast 测试</button>
            <button @click="formFilter">表单验证</button>
        </div>

        <!-- swiper -->
        <swiper :list="[1, 2]">
            <div slot="item" v-for="(item, index) in [1, 2]" :key="index">
                <div class="content">{{item}}</div>
            </div>
        </swiper>

        <div>
            <p class="mb-10">上传文件</p>
            <input type="file" @change="changeImg" />

            <div v-if="uploadSrc">
                <p class="mt-10" style="word-wrap: break-word;">上传成功：{{uploadSrc}}</p>

                <button
                    class="mt-10"
                    @click="copyText"
                >复制地址</button>
            </div>
        </div>

        <!--<button @click="yuconTest">api test</button>-->
    </div>
</template>

<script>
import { environment, validateForm, scrollBottom, searchParams } from '@/utils/common';
import { testPhp, uploadFile } from '@/api/home';
import { mapState } from 'vuex';

const modal = () => import('@/components/modal');
const swiper = () => import('@/components/swiper');

export default {
    name: 'home',
    components: {
        modal,
        swiper
    },
    data() {
        return {
            // 多状态模板显示
            list: [
                { state: 1 },
                { state: 0 },
                { state: 2 }
            ],
            // modal 组件
            modalFlag: false,
            // 表单过滤
            name: 'hah',
            phone: '1562645588',
            // 下拉加载
            loadMore: true,
            uploadSrc: ''
        };
    },

    created() {
        console.log(environment().isAndroid);
        console.log(searchParams(), 'params');
        // this.yuconTest();
        /* 轻提示
         * type 支持的类型为 none, success, error, success
         */
        this.$toast('成功', 'none');

        // this.$nextTick(() => {
        //     scrollBottom(() => {
        //         if (this.loadMore) this.getList();
        //     });
        // });
        // console.log(scrollBottom());

        // let time = 86400 * 1000;
        // setInterval(() => {
        //     time -= 100;
        //     console.log(countDownText(time, 'd天h小时m分钟 s秒:ms毫秒'));
        // }, 100);

        // this.$nextTick(() => {
        //     let url = urlToBlob(',http://resource.oss.yatiku.com/backstageSystem/babthinking/logo.png');
        //     console.log(url, '11111***')
        // })
    },
    computed: {
        ...mapState(['user_Info'])
    },
    methods: {
        /* 轻提示 loading */
        showToast() {
            // loading
            this.$toast('正在加载', 'loading');

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
            validateForm.bind(this)({
                name: { require: true, message: '请输入您的姓名' },
                phone: { require: true, message: '请输入您的手机号', regexp: /^1\d{10}$/, regexpMsg: '手机号格式错误' }
            }).then(() => {
            // do something
                console.log('验证通过');
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
        },

        yuconTest() {
            let params = {
                id: 2
            };
            testPhp(params);
        },

        async changeImg(event) {
            let formData = new FormData();
            console.log(event.target.files[0]);
            formData.append('file', event.target.files[0]);

            let { code, data } = await uploadFile(formData);
            if (code === 200) {
                this.$toast('上传成功', 'success');
                this.uploadSrc = data;
            }
        },

        copyText() {
            this.$copyText(this.uploadSrc).then(res => {
                this.$toast('复制成功', 'success');
            }).catch(() => {
                this.$toast('复制失败', 'error');
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .home {
        padding: 15px;

        .box{
            width: 50px;
            height: 50px;
        }
        .btn-group {
            button {
                margin: 5px;
            }
        }
    }
</style>
