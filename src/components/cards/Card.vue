<template>
  <div class="shadow-md grid place-items-center relative w-full h-full">
    <div @click="show(data?.video)" class="relative z-8 cursor-pointer">
      <Play />
    </div>
    <!-- <div class="absolute">{{ data?.poster }}</div> -->
    <img
      class="absolute w-full h-full object-cover z-[-1]"
      :src="getImageUrl(data?.poster)"
      :alt="item?.alt"
    />
  </div>
</template>
<script setup>
import { getImageUrl } from "@/composables/src.js";
import Play from "../icons/Play.vue";
const props = defineProps({
  data: { type: Object },
});

const emit = defineEmits("show");
const show = (e) => {
  emit("show", e);
};
</script>
