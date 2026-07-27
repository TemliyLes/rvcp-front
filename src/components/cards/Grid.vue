<template>
  <div
    ref="section"
    id="realizace"
    class="container grid min-h-dvh w-full grid-cols-1 gap-3 pt-4 [perspective:1200px] md:grid-cols-3"
  >
    <div
      v-for="(item, index) in data"
      :key="item.id"
      :ref="(element) => setCardRef(element, index)"
      class="aspect-[3/4] w-full min-w-0 overflow-hidden [backface-visibility:hidden] [transform-style:preserve-3d]"
    >
      <CardPerProp
        class="h-full w-full"
        :simple="!!item.link"
        :data="item"
        @show="show"
      />
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

let context = null;
let mediaContext = null;
let triggers = [];
let refreshFrame = null;

const show = (event) => {
  emit("show", event);
};

const setCardRef = (element, index) => {
  if (element) {
    cards.value[index] = element;
  }
};

const setHiddenState = (element) => {
  gsap.set(element, {
    autoAlpha: 0,
    y: 50,
    scale: 0.96,
    rotationX: 8,
    transformPerspective: 1200,
    transformOrigin: "50% 100%",
    force3D: true,
  });
};

const showCard = (element) => {
  gsap.to(element, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotationX: 0,
    duration: 0.8,
    ease: "power3.out",
    overwrite: true,
    force3D: true,
  });
};

const hideCardDown = (element) => {
  gsap.to(element, {
    autoAlpha: 0,
    y: -50,
    scale: 0.96,
    rotationX: -8,
    duration: 0.55,
    ease: "power2.in",
    overwrite: true,
    force3D: true,
  });
};

const hideCardUp = (element) => {
  gsap.to(element, {
    autoAlpha: 0,
    y: 50,
    scale: 0.96,
    rotationX: 8,
    duration: 0.55,
    ease: "power2.in",
    overwrite: true,
    force3D: true,
  });
};

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
    force3D: true,
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
    force3D: true,
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
    force3D: true,
  });
};

const createMobileTriggers = (scroller) => {
  cards.value.forEach((card) => {
    const trigger = ScrollTrigger.create({
      trigger: card,
      scroller,
      start: "top 88%",
      end: "bottom 12%",

      onEnter: () => showCard(card),
      onEnterBack: () => showCard(card),
      onLeave: () => hideCardDown(card),
      onLeaveBack: () => hideCardUp(card),
    });

    triggers.push(trigger);
  });
};

const createDesktopTriggers = (scroller) => {
  const batchTriggers = ScrollTrigger.batch(cards.value, {
    scroller,
    start: "top 88%",
    end: "bottom 12%",

    onEnter: showCards,
    onEnterBack: showCards,
    onLeave: hideCardsDown,
    onLeaveBack: hideCardsUp,
  });

  triggers.push(...batchTriggers);
};

onMounted(async () => {
  await nextTick();

  const scroller = document.querySelector("#wrap");

  if (!scroller || !section.value || !cards.value.length) {
    return;
  }

  context = gsap.context(() => {
    cards.value.forEach(setHiddenState);

    mediaContext = gsap.matchMedia();

    mediaContext.add("(max-width: 767px)", () => {
      createMobileTriggers(scroller);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        triggers = [];
      };
    });

    mediaContext.add("(min-width: 768px)", () => {
      createDesktopTriggers(scroller);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        triggers = [];
      };
    });
  }, section.value);

  refreshFrame = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

onBeforeUnmount(() => {
  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  triggers.forEach((trigger) => trigger.kill());

  mediaContext?.revert();
  context?.revert();

  triggers = [];
  mediaContext = null;
  context = null;
});
</script>
