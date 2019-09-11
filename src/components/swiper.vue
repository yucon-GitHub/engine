<template>
    <div class="banner-wapper mt-20">
        <div
            class="swiper-container"
            :style="{'transform': touchMoveType === 'slide-left' ?
            `translateX(${currentIndex * -100}%)` : touchMoveType === 'slide-right' ?
            `translateX(${currentIndex * -100}%)` : ''}"
            @touchstart="touchStart"
            @touchend="touchEnd"
            ref="swiper">
            <slot name="item"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'swiper',

    data() {
        return {
            // 幻灯片滑动
            touchStartPos: null, // 起始X
            touchMoveType: '', // 活动方向
            currentIndex: 0
        };
    },
    props: {
        list: Array
    },

    created() {
        this.$nextTick(() => {
            console.log(this.$refs.swiper);
        });
    },

    methods: {
        // 开始滑动
        touchStart(event) {
            // 触摸起始坐标 X
            this.touchStartPos = event.changedTouches[0].clientX;
        },
        // 结束滑动
        touchEnd(event) {
            // 触摸结束坐标 X
            let touchEndPos = event.changedTouches[0].clientX;
            // 计算滑动距离，小于35 不切换
            let moveLeft = touchEndPos - this.touchStartPos < 0 ? -(touchEndPos - this.touchStartPos) : touchEndPos - this.touchStartPos;
            if (moveLeft < 35) return;

            // 检测滑动方向 currentIndex = 当前Index
            if (touchEndPos < this.touchStartPos && this.currentIndex < this.list.length - 1) {
                this.touchMoveType = 'slide-left';
                this.currentIndex += 1;
            } else if (touchEndPos > this.touchStartPos && this.currentIndex >= 1) {
                this.touchMoveType = 'slide-right';
                this.currentIndex -= 1;
            }
        }
    }
};
</script>

<style scoped lang="scss">
.banner-wapper {
    width: 100%;
    margin: 20px auto;
    overflow: hidden;

    .swiper-container {
        display: flex;
        transition: .5s;
        margin: 10px 30px;

        > div {
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
                        to {
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
    }
}
</style>
