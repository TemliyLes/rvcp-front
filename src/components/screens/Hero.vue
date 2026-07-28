<template>
  <section ref="hero" class="relative h-dvh overflow-hidden bg-[#111]">
    <div ref="perspective" class="absolute inset-0 [perspective:1400px]">
      <div
        ref="content"
        class="absolute inset-0 origin-center opacity-100 [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity]"
      >
        <video
          ref="video"
          autoplay
          muted
          loop
          preload="auto"
          class="absolute inset-0 h-full w-full object-cover"
          @loadeddata="handleVideoLoaded"
          @canplay="handleVideoLoaded"
          @playing="handleVideoPlaying"
        >
          <source :src="heroVideo" type="video/mp4" />
        </video>

        <div class="absolute inset-0 bg-black/25" />

        <div
          class="relative z-10 flex h-full flex-col justify-end p-6 pb-16 text-white md:p-12 md:pb-20"
        >
          <h1 class="max-w-5xl text-5xl font-medium leading-[0.95] md:text-8xl">
            Prémiové rekonstrukce na klíč
          </h1>

          <p class="mt-6 max-w-xl text-base text-white/70 md:text-xl">
            Kompletní rekonstrukce bytů, domů a komerčních prostorů v Česku — od
            návrhu přes plánování až po finální realizaci s důrazem na kvalitu,
            precizní provedení a nadčasový výsledek.
          </p>

          <a
            href="#"
            class="mt-4 flex w-fit items-center justify-center bg-white px-8 py-5 text-base text-black transition hover:bg-[#ccc]"
            @click.prevent="open"
          >
            Domluvit konzultaci
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroVideo from "../../assets/video/furniture_hero.mp4";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  /*
   * Этот проп становится true после
   * завершения Loader.
   *
   * Он управляет только ScrollTrigger-анимацией.
   */
  ready: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["open", "video-ready"]);

const hero = ref(null);
const perspective = ref(null);
const content = ref(null);
const video = ref(null);

let context = null;
let trigger = null;
let animation = null;
let animationFrameId = null;

let videoReadyEmitted = false;
let videoReadyScheduled = false;
let videoFrameCallbackId = null;
let fallbackFrameId = null;

const MAGNET_ZONE = 0.2;
const SCRUB_DELAY = 0.9;
const SNAP_DELAY = 0.08;

const open = () => {
  emit("open");
};

/*
 * Отправляет событие в App.vue только один раз.
 */
const emitVideoReady = () => {
  if (videoReadyEmitted) {
    return;
  }

  videoReadyEmitted = true;
  videoReadyScheduled = false;

  emit("video-ready");
};

/*
 * Ждём кадр, который браузер действительно
 * подготовил к отображению.
 */
const waitForPaintedVideoFrame = () => {
  const videoElement = video.value;

  if (
    !videoElement ||
    videoReadyEmitted ||
    videoReadyScheduled ||
    videoElement.readyState < 2
  ) {
    return;
  }

  videoReadyScheduled = true;

  /*
   * Chrome, Edge, Firefox и современные Safari.
   * Callback срабатывает перед показом кадра видео.
   */
  if (typeof videoElement.requestVideoFrameCallback === "function") {
    videoFrameCallbackId = videoElement.requestVideoFrameCallback(() => {
      videoFrameCallbackId = null;

      /*
       * Даём браузеру ещё один цикл отрисовки,
       * после чего разрешаем Loader раздвигать полосы.
       */
      requestAnimationFrame(() => {
        emitVideoReady();
      });
    });

    return;
  }

  /*
   * Fallback для браузеров без
   * requestVideoFrameCallback.
   */
  fallbackFrameId = requestAnimationFrame(() => {
    fallbackFrameId = requestAnimationFrame(() => {
      fallbackFrameId = null;
      emitVideoReady();
    });
  });
};

/*
 * Запускаем видео.
 */
const startVideo = async () => {
  const videoElement = video.value;

  if (!videoElement) {
    return;
  }

  videoElement.muted = true;
  videoElement.defaultMuted = true;
  videoElement.playsInline = true;

  /*
   * Принудительно запускаем загрузку только тогда,
   * когда браузер ещё её не начал.
   */
  if (videoElement.networkState === HTMLMediaElement.NETWORK_EMPTY) {
    videoElement.load();
  }

  try {
    await videoElement.play();
  } catch (error) {
    console.warn("Не удалось сразу запустить Hero-видео:", error);
  }

  /*
   * Видео могло успеть загрузиться и запуститься
   * до выполнения обработчиков событий.
   */
  if (videoElement.readyState >= 2 && !videoElement.paused) {
    waitForPaintedVideoFrame();
  }
};

/*
 * Данные первого кадра уже загружены.
 * Пытаемся запустить воспроизведение.
 */
const handleVideoLoaded = () => {
  const videoElement = video.value;

  if (!videoElement || videoReadyEmitted) {
    return;
  }

  if (videoElement.paused) {
    startVideo();
    return;
  }

  waitForPaintedVideoFrame();
};

/*
 * Видео действительно начало воспроизводиться.
 */
const handleVideoPlaying = () => {
  waitForPaintedVideoFrame();
};

const getMagneticProgress = (progress) => {
  if (progress <= MAGNET_ZONE) {
    return 0;
  }

  if (progress >= 1 - MAGNET_ZONE) {
    return 1;
  }

  return progress;
};

const destroyAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);

    animationFrameId = null;
  }

  trigger?.kill();
  animation?.kill();
  context?.revert();

  trigger = null;
  animation = null;
  context = null;
};

const resetHeroPosition = () => {
  if (!content.value) {
    return;
  }

  gsap.set(content.value, {
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    opacity: 1,
  });
};

const createAnimation = async () => {
  destroyAnimation();

  await nextTick();

  animationFrameId = requestAnimationFrame(() => {
    animationFrameId = null;

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
        animation,

        start: "top top",
        end: "bottom top",

        scrub: SCRUB_DELAY,

        snap: {
          snapTo: getMagneticProgress,
          delay: SNAP_DELAY,

          duration: {
            min: 0.35,
            max: 0.8,
          },

          ease: "power3.out",
          inertia: false,
        },

        invalidateOnRefresh: true,
      });
    }, hero.value);

    ScrollTrigger.refresh();
  });
};

/*
 * ScrollTrigger запускается только после
 * завершения Loader.
 *
 * Загрузка Hero-видео от этого пропа
 * никак не зависит.
 */
watch(
  () => props.ready,
  (ready) => {
    if (ready) {
      createAnimation();
      return;
    }

    destroyAnimation();
    resetHeroPosition();
  },
  {
    immediate: true,
  },
);

onMounted(async () => {
  await nextTick();

  await startVideo();
});

onBeforeUnmount(() => {
  destroyAnimation();

  const videoElement = video.value;

  if (
    videoElement &&
    videoFrameCallbackId !== null &&
    typeof videoElement.cancelVideoFrameCallback === "function"
  ) {
    videoElement.cancelVideoFrameCallback(videoFrameCallbackId);
  }

  if (fallbackFrameId !== null) {
    cancelAnimationFrame(fallbackFrameId);
  }

  videoElement?.pause();

  videoFrameCallbackId = null;
  fallbackFrameId = null;
  videoReadyScheduled = false;
  videoReadyEmitted = false;
});
</script>
