<template>
  <header
    class="fixed left-0 top-0 z-[888] h-[90px] grid place-items-center"
    :style="headerStyle"
  >
    <div
      class="box-border flex justify-between h-full w-full items-center gap-4 px-4 md:px-12 backdrop-blur-2xl"
    >
      <Logo class="hidden md:block md:relative shrink-0 absolute" />
      <slot />
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

const BASE_OPACITY = 0.85;

const backgroundOpacity = ref(BASE_OPACITY);

const emit = defineEmits(["open"]);

let wrap = null;
let animationFrame = null;
let targetOpacity = BASE_OPACITY;

const INERTIA = 0.075;
const STOP_THRESHOLD = 0.001;

const getTargetOpacity = () => {
  if (!wrap) return BASE_OPACITY;

  const screenHeight = wrap.clientHeight;

  if (!screenHeight) return BASE_OPACITY;

  const progress = wrap.scrollTop / screenHeight;

  return BASE_OPACITY + Math.min(Math.max(progress, 0), 1) * (1 - BASE_OPACITY);
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

  // стартуем сразу с базовой темной полоски
  backgroundOpacity.value = BASE_OPACITY;

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
