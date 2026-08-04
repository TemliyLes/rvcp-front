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
      <span>{{ visiblePart }}</span>

      <span
        v-if="!show"
        class="bg-gradient-to-r from-white to-transparent bg-clip-text text-transparent"
      >
        {{ hiddenPart }}
      </span>

      <span v-else>
        {{ hiddenPart }}
      </span>
    </a>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Phone from "../icons/Phone.vue";
const props = defineProps({
  phone: {
    type: String,
    default: "+421 900 123 456",
  },
});
const emit = defineEmits(["open"]);

const show = ref(false);
const onClick = () => {
  if (!show.value) {
    show.value = true;
  } else {
    emit("open");
  }
};

const visiblePart = computed(() => {
  return props.phone.slice(0, -3);
});

const hiddenPart = computed(() => {
  return props.phone.slice(-3);
});
</script>
