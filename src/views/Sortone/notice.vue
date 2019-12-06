<template>
  <div class="notice">
    <h1>This is an notice page</h1>
    <div @click="alert">验证</div>
    <div @click="tan">弹窗</div>
    <p>{{1987854687 | formatTime}}</p>
    <div :class="{'one':pan == true}">{{pan? "正确" :"错误"}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        pan:true,
    }
  },
  created() {
    
  },
  methods: {
      alert() {
        this.$alert({
          title: "温馨提示",
          content: "hah",
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

        })
      },
      tan() {
        this.$toast("弹窗提示")
        this.pan = !this.pan
      }
  },
}

</script>

<style lang="scss" scoped>
.one{
  color: red;
}
.two{
  color: #000;
}
</style>