<template>
  <div class="module-video">
    <div class="content">
      <div class="p-20">
        <video
          controls
          :src="$attrs.item.src"
          :poster="$attrs.item.poster"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "module-video"
};
</script>
