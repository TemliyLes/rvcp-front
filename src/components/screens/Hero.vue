<template>
  <section ref="hero" class="relative h-dvh overflow-hidden bg-[#111]">
    <div ref="perspective" class="absolute inset-0 [perspective:1400px]">
      <div
        ref="content"
        class="absolute inset-0 origin-center [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity]"
      >
        <video
          ref="video"
          autoplay
          muted
          playsinline
          preload="auto"
          class="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="../../assets/video/furniture_hero.mp4"
            type="video/mp4"
          />
        </video>

        <div class="absolute inset-0 bg-black/25"></div>

        <div
          class="relative z-10 flex h-full flex-col justify-end p-6 pb-16 text-white md:p-12 md:pb-20"
        >
          <h1 class="max-w-5xl text-5xl font-medium leading-[0.95] md:text-8xl">
            Furniture collection
          </h1>

          <p class="mt-6 max-w-xl text-base text-white/70 md:text-xl">
            Современная мебель и выразительный интерьер
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  ready: {
    type: Boolean,
    default: false,
  },
});

const hero = ref(null);
const perspective = ref(null);
const content = ref(null);
const video = ref(null);

let context = null;
let trigger = null;
let animation = null;
let frameId = null;

const destroyAnimation = () => {
  if (frameId) {
    cancelAnimationFrame(frameId);
    frameId = null;
  }

  trigger?.kill();
  animation?.kill();
  context?.revert();

  trigger = null;
  animation = null;
  context = null;
};

const createAnimation = async () => {
  destroyAnimation();

  await nextTick();

  frameId = requestAnimationFrame(() => {
    const scroller = document.querySelector("#wrap");

    if (!scroller || !hero.value || !perspective.value || !content.value) {
      return;
    }

    context = gsap.context(() => {
      gsap.set(content.value, {
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        opacity: 1,
        transformPerspective: 1400,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      animation = gsap.to(content.value, {
        y: -45,
        z: -260,
        scale: 0.88,
        rotationX: -11,
        rotationY: 5,
        opacity: 0.25,
        ease: "none",
        paused: true,
        force3D: true,
      });

      trigger = ScrollTrigger.create({
        trigger: hero.value,
        scroller,
        start: "top top",
        end: "bottom top",
        invalidateOnRefresh: true,

        onUpdate(self) {
          animation.progress(self.progress);
        },

        onRefresh(self) {
          animation.progress(self.progress);
        },
      });

      animation.progress(trigger.progress);
    }, hero.value);

    ScrollTrigger.refresh();
  });
};

watch(
  () => props.ready,
  (ready) => {
    if (ready) {
      createAnimation();
    } else {
      destroyAnimation();
    }
  },
  {
    immediate: true,
  },
);

onBeforeUnmount(() => {
  destroyAnimation();
});
</script>
