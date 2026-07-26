<template>
  <Card v-if="!simple" @show="show" :data="data" />
  <SimpleCard v-if="simple" :data="data" />
</template>

<script setup>
import Card from "./Card.vue";
import SimpleCard from "./SimpleCard.vue";
const emit = defineEmits("show");
const props = defineProps({
  data: { type: Object },
  simple: { type: Boolean, default: false },
});
const show = (e) => {
  emit("show", e);
};
</script>
