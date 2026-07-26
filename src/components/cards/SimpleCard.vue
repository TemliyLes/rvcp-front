<template>
  <div class="shadow-md grid place-items-center relative w-full h-full">
    <!-- <div class="absolute">{{ data?.poster }}</div> -->
    <img
      class="absolute w-full h-full object-cover z-[-1]"
      :src="getImageUrl(data?.poster)"
      :alt="item?.alt"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  data: { type: Object },
});
const getImageUrl = (path) => {
  if (!path) return "";

  return new URL(path, window.location.origin).href;
};
</script>
