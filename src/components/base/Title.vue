<template>
  <component :is="tag" class="relative">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  tag: { type: String, default: "h2" },
});
</script>
