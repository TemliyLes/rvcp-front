<template>
  <div
    class="relative z-[435] inline-flex cursor-pointer -translate-y-0.5"
    @click="show = true"
  >
    <Phone class="translate -translate-x-1.5" />
    <a
      :href="show ? `tel:${phone}` : '#'"
      class="text-sm text-white"
      @click.prevent="onClick"
    >
      <span>{{ phone }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Phone from "../icons/Phone.vue";
const props = defineProps({
  phone: {
    type: String,
    default: "+420 949 73....",
  },
});
const emit = defineEmits(["open"]);

const show = ref(false);
const onClick = () => {
  emit("open");
};
</script>
