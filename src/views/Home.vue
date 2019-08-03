<template>
    <div class="home">
        <p class="cl-main">Home</p>
        <span class="iconfont iconhome"></span>
        <p>{{ 50.1650 | toFixed }}</p>
        <p>{{ '1560843960' | formatTime }}</p>
        <div v-for="item in list" :key="item.state">{{ item.state | stateType({ 0: '已结束', 1: '进行中', 2:'已超时' }) }}</div>

        <modal modalTitle="活动申请" confirmText="好的" v-model="modalFlag" @closeModal="modalFlag = false" :mask="false">
            <div slot="content">
                <div>asdasdasd</div>
            </div>
        </modal>

        <div class="box back-color-main" @click="modalFlag = true"></div>
        <router-link :to="{ name: 'user/about' }">router -> user/about</router-link>
    </div>
</template>

<script>
import { addProduct } from '@/api/home'
import { countSeconds, environment } from '@/utils/util'
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
            modalFlag: true
        }
    },
    created() {
        this.getData()
        this.checkUtil()
        console.log(environment().isAndroid);
        this.$toast({ title: 'toast' });
    },
    computed: {
        ...mapState(['user_Info'])
    },
    methods: {
        aa() {
            this.$refs.boll.style = 'fill:red;'
        },
        getData() {
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
        checkUtil() {
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
