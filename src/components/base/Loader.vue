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
        ></div>
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
        ></span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";

const props = defineProps({
  minimumDuration: {
    type: Number,
    default: 900,
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

let context;
let exitTimeline;
let scrollElement;
let scrollTop = 0;
let scrollLeft = 0;
let destroyed = false;

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
  if (!scrollElement) return;

  if (
    scrollElement.scrollTop !== scrollTop ||
    scrollElement.scrollLeft !== scrollLeft
  ) {
    scrollElement.scrollTo(scrollLeft, scrollTop);
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

  window.addEventListener("wheel", preventScroll, {
    passive: false,
    capture: true,
  });

  window.addEventListener("touchmove", preventScroll, {
    passive: false,
    capture: true,
  });

  window.addEventListener("keydown", preventKeyboardScroll, true);
};

const unlockScroll = () => {
  scrollElement?.removeEventListener("scroll", preserveScrollPosition);

  window.removeEventListener("wheel", preventScroll, true);

  window.removeEventListener("touchmove", preventScroll, true);

  window.removeEventListener("keydown", preventKeyboardScroll, true);
};

const waitForWindowLoad = () => {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener("load", resolve, {
      once: true,
    });
  });
};

const waitForFonts = () => {
  if (!document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.catch(() => {});
};

const waitForImages = () => {
  const images = Array.from(document.images);

  return Promise.all(
    images.map((image) => {
      if (image.complete) {
        if (typeof image.decode === "function") {
          return image.decode().catch(() => {});
        }

        return Promise.resolve();
      }

      return new Promise((resolve) => {
        image.addEventListener("load", resolve, {
          once: true,
        });

        image.addEventListener("error", resolve, {
          once: true,
        });
      });
    }),
  );
};

const waitForVideos = () => {
  const videos = Array.from(document.querySelectorAll("video"));

  return Promise.all(
    videos.map((video) => {
      if (video.readyState >= 2) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        video.addEventListener("loadeddata", resolve, {
          once: true,
        });

        video.addEventListener("error", resolve, {
          once: true,
        });
      });
    }),
  );
};

const waitForNextFrame = () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};

const waitForTimeout = (duration) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

const waitForContent = async () => {
  await nextTick();
  await waitForNextFrame();

  await Promise.race([
    Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
      waitForImages(),
      waitForVideos(),
    ]),
    waitForTimeout(props.maximumWait),
  ]);

  await nextTick();
  await waitForNextFrame();
};

const createIndicatorAnimation = () => {
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
  unlockScroll();
  isVisible.value = false;
  emit("complete");
};

const animateExit = () => {
  if (destroyed) return;

  context?.revert();

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

onMounted(async () => {
  const mountedAt = performance.now();

  lockScroll();

  await nextTick();

  createIndicatorAnimation();

  await waitForContent();

  const elapsed = performance.now() - mountedAt;
  const remaining = Math.max(0, props.minimumDuration - elapsed);

  if (remaining > 0) {
    await waitForTimeout(remaining);
  }

  animateExit();
});

onBeforeUnmount(() => {
  destroyed = true;

  exitTimeline?.kill();
  context?.revert();

  unlockScroll();
});
</script>
