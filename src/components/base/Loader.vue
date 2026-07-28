<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      ref="loader"
      class="fixed inset-0 z-[99999] h-dvh w-full overflow-hidden"
      aria-hidden="true"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="index in sliceCount"
          :key="index"
          ref="slices"
          class="absolute left-0 w-full bg-[#111] [will-change:transform]"
          :style="{
            top: `${((index - 1) / sliceCount) * 100}%`,
            height: `calc(${100 / sliceCount}% + 2px)`,
          }"
        />
      </div>

      <div
        ref="indicator"
        class="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[7px]"
      >
        <span
          v-for="index in 7"
          :key="index"
          ref="bars"
          class="h-12 w-px origin-center bg-white [will-change:transform,opacity]"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { gsap } from "gsap";

const props = defineProps({
  ready: {
    type: Boolean,
    default: false,
  },

  minimumDuration: {
    type: Number,
    default: 900,
  },

  /*
   * Пауза после получения ready.
   * За это время видео успевает отрисоваться
   * под непрозрачным Loader.
   */
  readyDelay: {
    type: Number,
    default: 350,
  },

  maximumWait: {
    type: Number,
    default: 8000,
  },

  scrollSelector: {
    type: String,
    default: "#wrap",
  },

  sliceCount: {
    type: Number,
    default: 16,
  },
});

const emit = defineEmits(["complete"]);

const loader = ref(null);
const indicator = ref(null);
const bars = ref([]);
const slices = ref([]);
const isVisible = ref(true);

let context = null;
let exitTimeline = null;

let scrollElement = null;
let scrollTop = 0;
let scrollLeft = 0;

let destroyed = false;
let exitStarted = false;

let minimumDurationPassed = false;
let readyDelayPassed = false;
let readyProcessingStarted = false;

let minimumTimer = null;
let maximumTimer = null;
let readyTimer = null;

let firstFrameId = null;
let secondFrameId = null;

const scrollingKeys = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

const preventScroll = (event) => {
  event.preventDefault();
};

const preventKeyboardScroll = (event) => {
  if (scrollingKeys.has(event.key)) {
    event.preventDefault();
  }
};

const preserveScrollPosition = () => {
  if (!scrollElement) {
    return;
  }

  if (
    scrollElement.scrollTop !== scrollTop ||
    scrollElement.scrollLeft !== scrollLeft
  ) {
    scrollElement.scrollTo({
      top: scrollTop,
      left: scrollLeft,
      behavior: "auto",
    });
  }
};

const lockScroll = () => {
  scrollElement = document.querySelector(props.scrollSelector);

  if (scrollElement) {
    scrollTop = scrollElement.scrollTop;
    scrollLeft = scrollElement.scrollLeft;

    scrollElement.style.scrollbarGutter = "stable";

    scrollElement.addEventListener("scroll", preserveScrollPosition);
  }

  window?.addEventListener("wheel", preventScroll, {
    passive: false,
    capture: true,
  });

  window?.addEventListener("touchmove", preventScroll, {
    passive: false,
    capture: true,
  });

  window?.addEventListener("keydown", preventKeyboardScroll, true);
};

const unlockScroll = () => {
  scrollElement?.removeEventListener("scroll", preserveScrollPosition);

  window?.removeEventListener("wheel", preventScroll, true);

  window?.removeEventListener("touchmove", preventScroll, true);

  window?.removeEventListener("keydown", preventKeyboardScroll, true);

  scrollElement = null;
};

const createIndicatorAnimation = () => {
  if (!loader.value || !indicator.value || !bars.value.length) {
    return;
  }

  context = gsap.context(() => {
    gsap.set(indicator.value, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.set(bars.value, {
      scaleY: 0.2,
      opacity: 0.25,
    });

    gsap.to(indicator.value, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(bars.value, {
      scaleY: 1,
      opacity: 1,
      duration: 0.55,

      stagger: {
        each: 0.08,
        from: "center",
        repeat: -1,
        yoyo: true,
      },

      ease: "sine.inOut",
    });
  }, loader.value);
};

const removeLoader = () => {
  if (destroyed) {
    return;
  }

  unlockScroll();

  isVisible.value = false;

  emit("complete");
};

const animateExit = () => {
  if (
    destroyed ||
    exitStarted ||
    !loader.value ||
    !indicator.value ||
    !slices.value.length
  ) {
    return;
  }

  exitStarted = true;

  if (maximumTimer !== null) {
    window.clearTimeout(maximumTimer);
    maximumTimer = null;
  }

  context?.revert();
  context = null;

  /*
   * После revert возвращаем видимое
   * состояние индикатора.
   */
  gsap.set(indicator.value, {
    opacity: 1,
    scale: 1,
  });

  /*
   * Гарантируем начальное положение полос.
   */
  gsap.set(slices.value, {
    xPercent: 0,
    skewX: 0,
    scaleX: 1,
  });

  exitTimeline = gsap.timeline({
    onComplete: removeLoader,
  });

  exitTimeline
    .to(indicator.value, {
      opacity: 0,
      scale: 1.4,
      duration: 0.25,
      ease: "power3.in",
    })
    .to(
      slices.value,
      {
        xPercent: (index) => (index % 2 === 0 ? -110 : 110),

        skewX: (index) => (index % 2 === 0 ? -4 : 4),

        scaleX: 1.08,
        duration: 1.1,

        stagger: {
          each: 0.025,
          from: "center",
        },

        ease: "power4.inOut",
      },
      "-=0.05",
    )
    .set(loader.value, {
      pointerEvents: "none",
    });
};

const tryToComplete = () => {
  if (destroyed || exitStarted) {
    return;
  }

  if (minimumDurationPassed && readyDelayPassed) {
    animateExit();
  }
};

/*
 * После ready ждём:
 *
 * 1. следующий кадр;
 * 2. ещё один кадр;
 * 3. readyDelay миллисекунд.
 *
 * Только после этого разрешаем разъезд полос.
 */
const processReady = async () => {
  if (destroyed || readyProcessingStarted || !props.ready) {
    return;
  }

  readyProcessingStarted = true;

  await nextTick();

  firstFrameId = requestAnimationFrame(() => {
    firstFrameId = null;

    secondFrameId = requestAnimationFrame(() => {
      secondFrameId = null;

      readyTimer = window.setTimeout(() => {
        readyTimer = null;
        readyDelayPassed = true;

        tryToComplete();
      }, props.readyDelay);
    });
  });
};

watch(
  () => props.ready,
  (ready) => {
    if (ready) {
      processReady();
    }
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  lockScroll();

  await nextTick();

  if (destroyed) {
    return;
  }

  createIndicatorAnimation();

  minimumTimer = window.setTimeout(() => {
    minimumTimer = null;
    minimumDurationPassed = true;

    tryToComplete();
  }, props.minimumDuration);

  /*
   * Защита на случай, если ready не придёт.
   */
  maximumTimer = window.setTimeout(() => {
    maximumTimer = null;

    animateExit();
  }, props.maximumWait);

  /*
   * Проп мог стать true до onMounted.
   */
  if (props.ready) {
    processReady();
  }
});

onBeforeUnmount(() => {
  destroyed = true;

  if (minimumTimer !== null) {
    window.clearTimeout(minimumTimer);
  }

  if (maximumTimer !== null) {
    window.clearTimeout(maximumTimer);
  }

  if (readyTimer !== null) {
    window.clearTimeout(readyTimer);
  }

  if (firstFrameId !== null) {
    cancelAnimationFrame(firstFrameId);
  }

  if (secondFrameId !== null) {
    cancelAnimationFrame(secondFrameId);
  }

  minimumTimer = null;
  maximumTimer = null;
  readyTimer = null;
  firstFrameId = null;
  secondFrameId = null;

  exitTimeline?.kill();
  context?.revert();

  exitTimeline = null;
  context = null;

  unlockScroll();
});
</script>
