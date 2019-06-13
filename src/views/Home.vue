<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <svg width="488" height="618" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <!--<ellipse cx="200" cy="180" rx="70" ry="50" style="fill:rgba(255,255,255,0);stroke:#000;stroke-width:2" ref="boll" @click="aa" class="boll"/>-->
            <text x="165" y="185" fill="#000">人工智能</text>
            <!--<path d="M 280 260 q 200 450 80 0" stroke="#000" stroke-width="1" fill="none" />-->
            <!--<path d="M 150 220 q -30 10 -50 80 q 100 30 200 0 q 10 0 -30 -100" stroke="#000" stroke-width="2" fill="none" />-->
            <!--<path d="M 100 300 q 0 0 -30 120 q 130 80 260 0 q 20 0 -30 -125" stroke="#000" stroke-width="2" fill="none" />-->
        </svg>
    </div>
</template>

<script>
import { testApi } from '@/api/home';
export default {
    name: 'home',
    components: {
        // HelloWorld
    },
    data() {
        return {}
    },
    created() {
        this.getData();
    },
    methods: {
        aa () {
            this.$refs.boll.style = 'fill:red;'
        },
        getData () {
            testApi().then(res => {
                console.log('first request', res)
            });
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
