<template>
  <div class="module-button">
    <div class="content">
      <ul
        class="box box-wrap box-between"
        :class="$attrs.item.containerClassName"
        :style="{ background: $attrs.item.containerBackground }"
      >
        <li
          class="text-center pointer"
          :class="[
            !item.title || !item.desc ? 'box box-center' : '',
            $attrs.item.buttonClassName
          ]"
          v-for="(item, index) in $attrs.item.list"
          :key="index"
          :style="{
            background: item.background,
            width: item.width + '%',
            color: item.fontColor
          }"
          @click="$emit('operate', item)"
        >
          <p v-if="item.title">{{ item.title }}</p>
          <p class="text-center fz-12" v-if="item.desc">{{ item.desc }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "module-button"
};
</script>
