<template>
  <div
    class="fixed top-0 h-[90px] bg-red-300 z-[888] left-0"
    :style="widthStyle"
  >
    <p class="font-noto font-bold">123123</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  width: { type: Number },
});
const widthStyle = computed(() =>
  props?.width ? `width: ${props.width}px` : "",
);
</script>
