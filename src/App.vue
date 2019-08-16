<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            transitionName: 'slide-right'
        };
    },

    watch: {
        '$route'(to, from) {
            this.transitionName = to.meta.index < from.meta.index ? 'slide-left' : 'slide-right';
        }
    }
};
</script>
<style lang="scss" scoped>
#app{
    width: 100%;
    min-height: 100%;
    position: relative;

}
.slide-right-enter-active {
    animation: enter .3s forwards;
    @keyframes enter {
        0% {
            opacity: 0;
            transform: translateX(100%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
}
.slide-left-enter-active {
    animation: leave .5s;
    @keyframes leave {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
}
</style>
