<template>
  <div class="module-text">
    <div class="content">
      <div
        class="p-10"
        :style="{
          color: $attrs.item.color,
          fontSize: $attrs.item.fontSize + 'px',
          textAlign: $attrs.item.textAlign,
          backgroundColor: $attrs.item.backgroundColor
        }"
        :class="[
          $attrs.item.isUnderLine ? 'font-underline' : '',
          $attrs.item.isBold ? 'font-bold' : '',
          $attrs.item.textClassName
        ]"
      >
        <div v-html="$attrs.item.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "module-text"
};
</script>
