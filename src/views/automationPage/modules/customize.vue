<template>
  <div class="module-customize">
    <div
      class="content"
      :class="[isAbsoluteType ? 'absolute' : 'fixed']"
      ref="preview"
    >
      <div v-for="(item, index) in $attrs.item.list" :key="index">
        <div
          class="dom-config"
          :style="{
            left: item.left + '%',
            top: item.bottom == 0 ? 'null' : item.top + '%',
            width: item.width + '%',
            bottom: item.bottom + '%'
          }"
          @click="$emit('operate', item)"
        >
          <!-- 二维码模式示例图 -->
          <img
            :src="qrCode(item)"
            class="block"
            width="100%"
            style="pointer-events: none;"
            v-if="item.showQr"
          />

          <!-- 自定义上传图  -->
          <img
            class="block"
            :src="item.bgImg"
            width="100%"
            style="pointer-events: none;"
            @touchmove.prevent.stop
            v-else
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "module-customize",

  computed: {
    // 是否固定模式
    isAbsoluteType() {
      return this.$attrs.item.componentName === "customizeAbsolute";
    },

    // 当前关联的二维码
    qrCode() {
      return item => {
        return this.qrCodeGroup[`no${item.linkQrCodeNo}`];
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.module-customize {
  height: initial;

  /* 固定定位 */
  .absolute {
    .dom-config {
      position: absolute !important;
    }
  }

  .fixed {
    .dom-config {
      position: fixed !important;
      z-index: 99;
    }
  }

  .dom-config {
    pointer-events: auto;
    z-index: 98;
    cursor: pointer;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    -webkit-touch-callout: none;
    user-select: none;

    &::after {
      content: attr(data-text);
    }
  }
}
</style>
