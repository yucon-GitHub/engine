<template>
    <div class="home">
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <svg width="488" height="618" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <!--<ellipse cx="200" cy="180" rx="70" ry="50" style="fill:rgba(255,255,255,0);stroke:#000;stroke-width:2" ref="boll" @click="aa" class="boll"/>-->
            <text x="165" y="185" fill="#000"></text>
            <!--<path d="M 280 260 q 200 450 80 0" stroke="#000" stroke-width="1" fill="none" />-->
            <!--<path d="M 150 220 q -30 10 -50 80 q 100 30 200 0 q 10 0 -30 -100" stroke="#000" stroke-width="2" fill="none" />-->
            <!--<path d="M 100 300 q 0 0 -30 120 q 130 80 260 0 q 20 0 -30 -125" stroke="#000" stroke-width="2" fill="none" />-->
        </svg>
        <p class="cl-main">Home</p>
        <span class="iconfont iconhome"></span>
        <p>{{ 50.1650 | toFixed }}</p>
        <p>{{ '1560843960' | formatTime }}</p>
        <div v-for="item in list" :key="item.state">{{ item.state | stateType({ 0: '已结束', 1: '进行中', 2:'已超时' }) }}</div>

        <modal modalTitle="活动申请" confirmText="好的" :modalFlag="modalFlag" @closeModal="modalFlag = false" :mask="false">
            <div slot="content">
                <div>asdasdasd</div>
            </div>
        </modal>

        <div class="box back-color-main" @click="modalFlag = true"></div>
        <router-link :to="{ name: 'user/about' }">router -> user/about</router-link>
        <div style="height: 1000px"></div>
    </div>
</template>

<script>
import { testApi, addProduct } from '@/api/home'
import { countSeconds, environment } from '@/utils/util'
import { mapState } from 'vuex'

const modal = () => import('@/components/modal')

export default {
    name: 'home',
    components: {
        modal
    },
    data () {
        return {
            timer: null,
            list: [
                { state: 1 },
                { state: 0 },
                { state: 2 }
            ],
            modalFlag: true
        }
    },
    created () {
        this.getData()
        this.checkUtil()
        console.log(environment().isAndroid)
    },
    computed: {
        ...mapState(['user_Info'])
    },
    methods: {
        aa () {
            this.$refs.boll.style = 'fill:red;'
        },
        getData () {
            // testApi().then(res => {
            //     console.log('first request', res)
            // })
            let params = {
                name: 'aawwa',
                slot: 0,
                price: 10,
                isFree: 0,
                id: 55
            }
            addProduct(params).then(res => {
                console.log(params)
            })
        },
        checkUtil () {
            let deffTime = 10
            this.timer = setInterval(() => {
                if (deffTime <= 0) return clearInterval(this.timer)
                deffTime -= 1
                let timeStr = countSeconds(deffTime)
                console.log(timeStr)
            }, 1000)
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
