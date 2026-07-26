<template>
  <div
    ref="section"
    class="container grid min-h-dvh grid-cols-3 gap-3 pt-4 [perspective:1200px]"
  >
    <div
      v-for="item in data"
      :key="item.id"
      ref="cards"
      class="flex-1 [backface-visibility:hidden] [transform-style:preserve-3d]"
    >
      <CardPerProp :simple="!!item.link" @show="show" :data="item" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardPerProp from "./CardPerProp.vue";
import { data } from "../../composables/cards.js";

gsap.registerPlugin(ScrollTrigger);

const section = ref(null);
const cards = ref([]);

const emit = defineEmits(["show"]);
const show = (e) => {
  emit("show", e);
};

let context = null;
let triggers = [];

const showCards = (elements) => {
  gsap.to(elements, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotationX: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    overwrite: true,
  });
};

const hideCardsDown = (elements) => {
  gsap.to(elements, {
    autoAlpha: 0,
    y: -50,
    scale: 0.96,
    rotationX: -8,
    duration: 0.55,
    stagger: 0.06,
    ease: "power2.in",
    overwrite: true,
  });
};

const hideCardsUp = (elements) => {
  gsap.to(elements, {
    autoAlpha: 0,
    y: 50,
    scale: 0.96,
    rotationX: 8,
    duration: 0.55,
    stagger: {
      each: 0.06,
      from: "end",
    },
    ease: "power2.in",
    overwrite: true,
  });
};

onMounted(async () => {
  await nextTick();

  const scroller = document.querySelector("#wrap");

  if (!scroller || !section.value || !cards.value.length) {
    return;
  }

  context = gsap.context(() => {
    gsap.set(cards.value, {
      autoAlpha: 0,
      y: 50,
      scale: 0.96,
      rotationX: 8,
      transformPerspective: 1200,
      transformOrigin: "50% 100%",
    });

    triggers = ScrollTrigger.batch(cards.value, {
      scroller,
      start: "top 88%",
      end: "bottom 12%",

      onEnter: showCards,
      onEnterBack: showCards,
      onLeave: hideCardsDown,
      onLeaveBack: hideCardsUp,
    });
  }, section.value);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

onBeforeUnmount(() => {
  triggers.forEach((trigger) => trigger.kill());
  context?.revert();
});
</script>
