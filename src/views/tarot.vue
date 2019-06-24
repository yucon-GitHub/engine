<template>
    <div id="tarot" class="container" ref="box">
        <canvas :width="width" :height="height" ref="canvas"></canvas>

    </div>
</template>

<script>
export default {
    name: 'tarot',
    data () {
        return {
            width: 0,
            height: 0,
            cardIdArr: [],
            roaArr: [],
            renderer: null,
            card: null
        }
    },
    created () {
        this.init()
        this.renderer.init()
    },
    methods: {
        // 初始化
        init () {
            for (let i in 78) {
                this.cardIdArr[i] = i
            }
            this.roaArr = this.roa()
            this.renderer = {
                row: 6,
                COLUMN: 13,
                MAX_STATUS_COUNT: 100,
                MAX_WAITING_COUNT: 20,
                MAX_STATUS: 9,
                J: -1,
                C1: [],
                C2: [],
                C3: [],
                init () {

                }
            }
        },
        roa () {
            let temp = [];
            let count = this.cardIdArr.length
            for (let i = 0; i < count; i++) {
                let num = Math.floor(Math.random() * this.cardIdArr.length)
                temp.push(this.cardIdArr[num])
                this.cardIdArr.splice(num, 1)
            }
            return temp;
        }
    }
}
</script>

<style scoped>

</style>
