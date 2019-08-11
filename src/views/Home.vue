<template>
    <div class="home">
        <h1 class="cl-main fz-30">Home</h1>
        <span class="iconfont iconhome"></span>

        <!-- fliter -->
        <p>{{ 50.1650 | toFixed }}</p>
        <p>{{ '1560843960' | formatTime }}</p>
        <div v-for="item in list" :key="item.state">{{ item.state | stateType(['已结束', '进行中', '已超时']) }}</div>

        <!-- modal components -->
        <modal modalTitle="活动申请" confirmText="好的" v-model="modalFlag" @closeModal="modalFlag = false" :mask="false">
            <div slot="content">
                <div>asdasdasd</div>
            </div>
        </modal>

        <div class="box back-color-main" @click="modalFlag = true"></div>

        <router-link :to="{ name: 'user/about' }">router-path</router-link>

        <!-- toast btn -->
        <div class="flex flex-column-center flex-warp btn-group">
            <button @click="showToast">提示</button>
            <button @click="showAlert">alert</button>
            <button @click="showOther">其他toast 测试</button>
            <button @click="formFilter">表单验证</button>
        </div>

        <!-- swiper -->
        <div class="banner-wapper mt-20">
            <ul 
            class="swiper-container" 
            :style="{'transform': touchuMoveType === 'slide-left' ?
            `translateX(${currentIndex * -100}%)` : touchuMoveType === 'slide-right' ?
            `translateX(${currentIndex * -100}%)` : ''}">
                <li 
                    class="swiper-slide" 
                    v-for="(item, index) in bannerList" 
                    :key="index" 
                    @touchstart="touchStart"
                    @touchend="touchEnd">
                    <div class="content radius-10" :class="{'current-active' : currentIndex === index}">{{item}}</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { environment, schema, scrollBottom } from '@/utils/util';
import { testApi } from '../api/home';
import { mapState } from 'vuex';

const modal = () => import('@/components/modal');

export default {
    name: 'home',
    components: {
        modal
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
            // 幻灯片滑动
            bannerList: [1, 2, 3, 4, 5, 6, 7, 8],
            touchStartPos: null, // 起始X
            touchuMoveType: '', // 活动方向
            currentIndex: 0,
        };
    },

    created() {
        console.log(environment().isAndroid);
        testApi();
        /* 轻提示
         * type 支持的类型为 none, success, error, success
         */
        // this.$toast('成功', 'none');

        this.$nextTick(() => {
            scrollBottom(() => {
                if (this.loadMore) this.getList();
            });
        });
        // console.log(scrollBottom());
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
            schema.bind(this)({
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

        touchStart(event) {
            // 触摸起始坐标 X
            this.touchStartPos = event.changedTouches[0].clientX;
        },
        
        touchEnd(event) {
            // 触摸结束坐标 X
            let touchEndPos = event.changedTouches[0].clientX;
            // 计算滑动距离，小于35 不切换
            let moveLeft = touchEndPos - this.touchStartPos < 0 ? -(touchEndPos - this.touchStartPos) : touchEndPos - this.touchStartPos;
            if (moveLeft < 35) return;

            // 检测滑动方向 currentIndex = 当前Index
            if (touchEndPos < this.touchStartPos && this.currentIndex < this.bannerList.length - 1) {
                this.touchuMoveType = 'slide-left';
                this.currentIndex += 1;
            } else if (touchEndPos > this.touchStartPos && this.currentIndex >= 1) {
                this.touchuMoveType = 'slide-right';
                this.currentIndex -= 1;
            }
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

.banner-wapper {
    width: 100%;
    margin: 20px auto;  
    overflow: hidden;
    
    .swiper-container {
        display: flex;
        transition: .5s;
        margin: 10px 30px;

        .swiper-slide {
            flex: 0 0 auto; 
            width: 100%;
            padding: 0 10px;

            .content {
                width: 100%;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid $success;
                background: linear-gradient(to right, $danger, $warning);
                transition: all .3s;
                
                &.current-active {
                    animation: scale .5s ease forwards;

                    @keyframes scale {
                        to { transform: scale(1.1); }
                    }
                    
                }
            }
        }
    }
}
</style>
