<template>
  <header
    class="fixed left-0 top-0 z-[888] h-[90px] grid place-items-center"
    :style="headerStyle"
  >
    <div
      class="box-border flex h-full w-full items-center gap-4 px-12 backdrop-blur-2xl"
    >
      <Logo class="relative shrink-0" />
      <slot />
      <!-- <div @click="openModal">1</div> -->
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import Logo from "../icons/Logo.vue";

const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },

  active: {
    type: Number,
    default: 0,
  },
});

const backgroundOpacity = ref(0);
const emit = defineEmits("open");

let wrap = null;
let animationFrame = null;
let targetOpacity = 0;

const INERTIA = 0.075;
const STOP_THRESHOLD = 0.001;

const getTargetOpacity = () => {
  if (!wrap) return 0;

  const screenHeight = wrap.clientHeight;

  if (!screenHeight) return 0;

  const progress = wrap.scrollTop / screenHeight;

  return Math.min(Math.max(progress, 0), 1);
};

const animateBackground = () => {
  const difference = targetOpacity - backgroundOpacity.value;

  backgroundOpacity.value += difference * INERTIA;

  if (Math.abs(difference) > STOP_THRESHOLD) {
    animationFrame = requestAnimationFrame(animateBackground);

    return;
  }

  backgroundOpacity.value = targetOpacity;
  animationFrame = null;
};

const openModal = () => {
  emit("open");
};

const startBackgroundAnimation = () => {
  targetOpacity = getTargetOpacity();

  if (animationFrame) return;

  animationFrame = requestAnimationFrame(animateBackground);
};

const handleScroll = () => {
  startBackgroundAnimation();
};

const handleResize = () => {
  startBackgroundAnimation();
};

const headerStyle = computed(() => ({
  width: props.width ? `${props.width}px` : "100%",

  backgroundColor: `rgba(
    17,
    17,
    17,
    ${backgroundOpacity.value}
  )`,
}));

onMounted(() => {
  wrap = document.querySelector("#wrap");

  if (!wrap) return;

  targetOpacity = getTargetOpacity();
  backgroundOpacity.value = targetOpacity;

  wrap.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  wrap?.removeEventListener("scroll", handleScroll);

  window.removeEventListener("resize", handleResize);

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
});
</script>
