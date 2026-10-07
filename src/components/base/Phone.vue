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
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
// const props = defineProps({
//   phone: {
//     type: String,
//     default: "+420 949 73....",
//   },
// });
const emit = defineEmits(["open"]);

const isCz = computed(() => locale?.value === "sk");

const phone = computed(() =>
  isCz.value ? "+420 949 73...." : "+421 940 40....",
);

const show = ref(false);
const onClick = () => {
  emit("open");
};
</script>
