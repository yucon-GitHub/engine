<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <ellipse cx="200" cy="180" rx="80" ry="50" style="fill:rgba(255,255,255,0);stroke:#000;stroke-width:1" ref="boll" @click="aa" class="boll"/>
            <text x="165" y="185" fill="#000">人工智能</text>
            <!--<path d="M 280 260 q 200 450 80 0" stroke="#000" stroke-width="1" fill="none" />-->
            <path d="M 160 225 L120 300 L280 300 L240 225" stroke="#000" stroke-width="1" fill="none" />
            <path d="M 120 300 L100 350 L80 400 L90 450 L120 460 L280 460 L300 440 L320 400 L280 300" stroke="#000" stroke-width="1" fill="none" />
            <path d="M 120 460 L120 520" stroke="#000" stroke-width="1" fill="none" />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'home',
    components: {
        // HelloWorld
    },
    data () {
        return {
        }
    },
    created () {
        // this.$nextTick(()=>{
        //     this.$refs.boll.style = 'fill:red;'
        // })
    },
    methods: {
        aa () {
            this.$refs.boll.style = 'fill:red;'
        }
    }

}
</script>
<style lang="scss" scoped>
    .boll{
        :hover{
            fill:red;
        }
    }
</style>
