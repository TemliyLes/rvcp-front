<template>
  <header class="fixed left-0 top-0 z-[888] h-[90px]" :style="headerStyle">
    <div
      class="flex h-full w-full box-border items-center gap-4 px-12 backdrop-blur-2xl"
    >
      <Logo class="relative shrink-0" />
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

let wrap = null;
let frameId = null;

const updateBackground = () => {
  if (!wrap) return;

  const screenHeight = wrap.clientHeight;
  const progress = screenHeight ? wrap.scrollTop / screenHeight : 0;

  backgroundOpacity.value = Math.min(Math.max(progress, 0), 1);
};

const handleScroll = () => {
  if (frameId) return;

  frameId = requestAnimationFrame(() => {
    updateBackground();
    frameId = null;
  });
};

const headerStyle = computed(() => ({
  width: props.width ? `${props.width}px` : "100%",
  backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity.value})`,
}));

onMounted(() => {
  wrap = document.querySelector("#wrap");

  if (!wrap) return;

  updateBackground();

  wrap.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", updateBackground);
});

onBeforeUnmount(() => {
  wrap?.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateBackground);

  if (frameId) {
    cancelAnimationFrame(frameId);
  }
});
</script>
