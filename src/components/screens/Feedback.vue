<template>
  <section
    id="kontakt"
    ref="section"
    data-anchor-progress-desktop="0.16"
    data-anchor-progress-mobile="0.12"
    class="relative bg-white lg:h-[220dvh]"
  >
    <div
      class="relative min-h-dvh overflow-hidden bg-white lg:sticky lg:top-0 lg:h-dvh"
    >
      <div
        ref="contentStage"
        class="relative min-h-dvh bg-white text-[#111] lg:absolute lg:inset-0 lg:h-dvh lg:[perspective:1400px] lg:[transform-style:preserve-3d]"
      >
        <div
          class="container grid min-h-dvh grid-cols-1 gap-8 md:py-20 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:items-start lg:gap-16 lg:pb-8 lg:pt-28 xl:gap-24"
        >
          <!-- Изображение -->
          <div
            ref="imageBlock"
            class="relative h-[65dvh] min-h-[480px] overflow-hidden bg-[#e9e9e9] [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity,clip-path] lg:h-[calc(100dvh-144px)] lg:self-start"
          >
            <img
              ref="image"
              :src="formImage"
              :alt="t('feedback.imageAlt')"
              class="absolute inset-0 h-full w-full object-cover [will-change:transform]"
              @load="refreshScrollTrigger"
            />

            <div
              class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/75"
            />

            <div
              class="relative z-[2] flex h-full flex-col justify-between p-6 text-white md:p-8 lg:p-10 xl:p-12"
            >
              <h2
                ref="imageTitle"
                class="!text-white max-w-[720px] text-3xl font-medium uppercase leading-[0.98] tracking-[-0.035em] md:text-5xl lg:text-5xl xl:text-6xl"
              >
                {{ t("feedback.title") }}
              </h2>

              <p
                ref="imageDescription"
                class="max-w-[680px] text-base leading-relaxed text-white/75 md:text-lg"
              >
                {{ t("feedback.description") }}
              </p>
            </div>
          </div>

          <!-- Форма -->
          <div
            ref="formBlock"
            class="relative flex [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity] lg:h-[calc(100dvh-144px)] lg:min-h-[480px] lg:self-start lg:items-center"
          >
            <div
              ref="formContent"
              class="w-full max-w-[720px] [will-change:transform,opacity]"
            >
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "vue-i18n";

import Form from "../base/Form.vue";
import formImage from "../../assets/img/bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

const section = ref(null);
const contentStage = ref(null);

const imageBlock = ref(null);
const image = ref(null);
const imageTitle = ref(null);
const imageDescription = ref(null);

const formBlock = ref(null);
const formContent = ref(null);

let context = null;
let mediaContext = null;
let refreshFrame = null;

const refreshScrollTrigger = () => {
  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  refreshFrame = requestAnimationFrame(() => {
    refreshFrame = null;
    ScrollTrigger.refresh();
  });
};

// ==========================================
// DESKTOP ANIMATION
// ==========================================

const createDesktopAnimation = (scroller) => {
  // Начальное состояние сцены
  gsap.set(contentStage.value, {
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotationX: 0,
    rotationY: 0,
    transformOrigin: "50% 50%",
    force3D: true,
  });

  // Начальное состояние изображения
  gsap.set(imageBlock.value, {
    autoAlpha: 0,
    x: -65,
    z: -100,
    scale: 0.96,
    rotationY: -5,
    clipPath: "inset(0 12% 0 0)",
    transformOrigin: "100% 50%",
    force3D: true,
  });

  gsap.set(image.value, {
    scale: 1.1,
    xPercent: -2,
    force3D: true,
  });

  gsap.set(imageTitle.value, {
    autoAlpha: 0,
    y: -18,
    z: 25,
    force3D: true,
  });

  gsap.set(imageDescription.value, {
    autoAlpha: 0,
    y: 18,
    z: 25,
    force3D: true,
  });

  // Начальное состояние формы
  gsap.set(formBlock.value, {
    autoAlpha: 0,
    x: 65,
    z: -90,
    scale: 0.97,
    rotationY: 5,
    transformOrigin: "0% 50%",
    force3D: true,
  });

  gsap.set(formContent.value, {
    autoAlpha: 0,
    y: 22,
    z: 25,
    force3D: true,
  });

  // Анимация привязана к прокрутке
  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: section.value,
      ...(scroller ? { scroller } : {}),
      start: "top 85%",
      end: "top top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to(
      imageBlock.value,
      {
        autoAlpha: 1,
        x: 0,
        z: 0,
        scale: 1,
        rotationY: 0,
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        force3D: true,
      },
      0,
    )
    .to(
      formBlock.value,
      {
        autoAlpha: 1,
        x: 0,
        z: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        force3D: true,
      },
      0,
    )
    .to(
      image.value,
      {
        scale: 1,
        xPercent: 0,
        duration: 1,
        force3D: true,
      },
      0,
    )
    .to(
      imageTitle.value,
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        duration: 0.75,
        force3D: true,
      },
      0.15,
    )
    .to(
      imageDescription.value,
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        duration: 0.65,
        force3D: true,
      },
      0.35,
    )
    .to(
      formContent.value,
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        duration: 0.85,
        force3D: true,
      },
      0.15,
    );
};

// ==========================================

const createMobileAnimation = (scroller) => {
  gsap.set(contentStage.value, {
    clearProps: "transform",
  });

  gsap.set(imageBlock.value, {
    autoAlpha: 0,
    y: 30,
    scale: 0.97,
    rotationY: 0,
    z: 0,
    clipPath: "inset(0 0% 0 0)",
    force3D: true,
  });

  gsap.set(image.value, {
    scale: 1.08,
    xPercent: 0,
    force3D: true,
  });

  gsap.set(imageTitle.value, {
    autoAlpha: 0,
    y: 20,
    z: 0,
  });

  gsap.set(imageDescription.value, {
    autoAlpha: 0,
    y: 20,
    z: 0,
  });

  gsap.set(formBlock.value, {
    autoAlpha: 0,
    x: 0,
    y: 30,
    z: 0,
    scale: 1,
    rotationY: 0,
    force3D: true,
  });

  gsap.set(formContent.value, {
    autoAlpha: 0,
    y: 20,
    z: 0,
  });

  // ИЗОБРАЖЕНИЕ
  const imageTimeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: imageBlock.value,
      scroller,
      start: "top 95%",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  imageTimeline
    .to(
      imageBlock.value,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
      },
      0,
    )
    .to(
      image.value,
      {
        scale: 1,
        duration: 1,
      },
      0,
    )
    .to(
      imageTitle.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
      },
      0.15,
    )
    .to(
      imageDescription.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
      },
      0.3,
    );

  // ФОРМА
  const formTimeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: formBlock.value,
      scroller,
      start: "top 95%",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  formTimeline
    .to(
      formBlock.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
      },
      0,
    )
    .to(
      formContent.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
      },
      0.15,
    );
};

// ==========================================
// LIFECYCLE
// ==========================================

onMounted(async () => {
  await nextTick();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  if (
    !section.value ||
    !contentStage.value ||
    !imageBlock.value ||
    !image.value ||
    !imageTitle.value ||
    !imageDescription.value ||
    !formBlock.value ||
    !formContent.value
  ) {
    return;
  }

  const scroller = document.querySelector("#wrap") || undefined;

  context = gsap.context(() => {
    mediaContext = gsap.matchMedia();

    mediaContext.add("(min-width: 1024px)", () => {
      createDesktopAnimation(scroller);
    });

    mediaContext.add("(max-width: 1023px)", () => {
      createMobileAnimation(scroller);
    });
  }, section.value);

  refreshScrollTrigger();
});

onBeforeUnmount(() => {
  mediaContext?.revert();
  context?.revert();

  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  mediaContext = null;
  context = null;
  refreshFrame = null;
});
</script>
