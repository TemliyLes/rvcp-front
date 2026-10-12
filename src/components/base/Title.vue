<template>
  <component :is="tag" class="relative" :class="paddingClass">
    <slot />
  </component>

</template>

<script setup>
import { computed } from 'vue';
  const props = defineProps({
    tag: { type: String, default: "h2" },
    pad: {type: Boolean, default: false}
  });
  const paddingClass = computed(()=>!props.pad ? "": "px-4 sm:px-0 lg:px-0")
</script>
