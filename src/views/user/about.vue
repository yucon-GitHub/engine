<template>
  <div class="about">
      <div class="title">
        <img style="height:66px;object-fit:contain;" src="../../static/img/5.png" alt="">
          <div>陈记士多</div>
      </div>
      <div class="details">
        <div class="details-input flex"> 
          <img class="details-img" src="../../static/img/3.png" alt="">
          <input type="text" placeholder="请输入您的真实姓名" v-model="name">
        </div>
        <div class="details-input flex"> 
          <img class="details-img" src="../../static/img/2.png" alt="">
          <input type="text" placeholder="请输入您的手机号" v-model="phone">
        </div>
        <div class="details-input flex" style="justify-content: space-between;"  @click="showPopup"> 
          <div class="flex">
            <img class="details-img" src="../../static/img/4.png" alt="">
          <div class="color-main-slow" style="margin-left: 20px;">{{address}}</div>
          </div>
          <img style="width:14px;height:14px;object-fit:cover;" src="../../static/img/6.png" alt="">
        </div>
        <div class="confirm">
          <div>确认登陆</div>
        </div>
      </div>
      <van-popup v-model="show" position="bottom"><van-area  value="440100" :area-list="areaList" @cancel="cance" @confirm="confir" /></van-popup>
  </div>
</template>

<script>
import { Area } from 'vant';
import { Popup } from 'vant';
import AreaList from "../../components/area";
import { test } from '../../api/home';
export default {
  name: "about",
  components:{
    "van-area":Area,
    "van-popup":Popup,
    
  },
  data() {
    return{
      name: "",
      phone: "",
      address:"选择您所在的城市",
      areaList:AreaList,
      show:false,
    }
  },
  created() {
    this.get();
  },
  methods:{
    get() {
      let params = {paging:{page:1,limit:10}}
      test(params).then(res =>{
        
      })
    },
     showPopup() {
      this.show = true
    },
    //地址取消
    cance() {
      this.show = false
    },
    //地址完成
    confir(event){
      this.show = false
      this.present = event[2].name
    }

  }
}
</script>

<style lang="scss" scoped>
.title{
  background-image: url('../../static/img/0.png');
  background-size: contain;
  height: 145px;
  width: 100%;
  text-align: center;
  padding-top: 110px;
  
}
.details{
margin-top: 100px;

}
.details-input{
  text-align: center;
  margin: 20px 40px;
  border-radius: 5px;
  padding: 0 20px; 
  border: 1px solid$main;
  height: 50px;
  display: flex;
  align-items: center;
  input{
    border: none;
    height: 40px;
    width: 100%;
    margin-left: 20px;
    outline: none;
  }
  .details-img{
  width: 25px;
  height: 25px;
  object-fit: contain;
}
}
.confirm{
  background: $main;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 30px 40px 0 40px;
  border-radius: 5px;
  color: $white;
}
</style>
