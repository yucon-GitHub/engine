<template>
  <div class="module-image">
    <!-- 预览 -->
    <div class="content">
      <div
        v-for="(item, index) in $attrs.item.list"
        :key="index"
        @click="$emit('operate', item)"
      >
        <img class="full-width block" :src="item.src" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "module-image"
};
</script>
