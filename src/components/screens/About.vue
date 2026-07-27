<template>
  <section
    id="o-nas"
    ref="section"
    data-anchor-progress="0.92"
    class="relative mt-8 h-[220dvh] bg-white sm:h-[230dvh] lg:mt-12 lg:h-[240dvh]"
  >
    <div
      class="sticky top-0 isolate h-dvh overflow-hidden bg-white [perspective:1600px]"
    >
      <!-- Изображение -->
      <div
        ref="media"
        class="absolute inset-0 overflow-hidden [contain:paint] [transform:translateZ(0)]"
      >
        <img
          ref="background"
          class="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)] [will-change:transform]"
          src="../../assets/img/bg.jpg"
          alt=""
        />

        <div
          ref="shade"
          class="absolute inset-0 bg-black opacity-0 [will-change:opacity]"
        />

        <!-- Дополнительный градиент для читаемости на мобильных -->
        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:hidden"
        />
      </div>

      <!-- Белая раскрывающаяся поверхность -->
      <div
        ref="grayCover"
        class="pointer-events-none absolute inset-0 z-[4] bg-white [transform:translateZ(0)] [will-change:transform]"
      />

      <!-- Панель с текстом -->
      <div
        ref="contentPanel"
        class="absolute inset-x-0 bottom-0 z-[7] flex max-h-[78dvh] w-full items-end bg-black/65 px-5 pb-7 pt-8 text-white opacity-0 [contain:paint] [transform:translateZ(0)] [will-change:transform,opacity] sm:px-8 sm:pb-9 lg:right-0 lg:top-0 lg:bottom-auto lg:left-auto lg:h-full lg:max-h-none lg:w-1/2 lg:items-center lg:bg-black/55 lg:p-12"
      >
        <div
          ref="contentInner"
          class="w-full max-w-[680px] [will-change:transform,opacity]"
        >
          <!-- Автор -->
          <div
            ref="portrait"
            class="mb-5 [backface-visibility:hidden] [transform:translateZ(0)] [will-change:transform,opacity] sm:mb-6 lg:mb-10"
          >
            <div class="flex items-center gap-4 lg:gap-5">
              <img
                class="size-16 shrink-0 rounded-full object-cover sm:size-20 lg:size-24"
                src="../../assets/img/man.png"
                alt="Stano Zachar"
              />

              <div class="min-w-0">
                <h3
                  class="text-xl font-medium leading-tight sm:text-2xl lg:text-3xl"
                >
                  Stano Zachar
                </h3>

                <p
                  class="mt-1 text-sm text-white/60 sm:mt-1.5 lg:mt-2 lg:text-base"
                >
                  Zakladatel firmy
                </p>
              </div>
            </div>
          </div>

          <!-- Текст -->
          <div class="space-y-3.5 sm:space-y-4 lg:space-y-7">
            <p
              class="about-text text-sm leading-[1.55] text-white/85 sm:text-[15px] lg:text-lg lg:leading-relaxed lg:text-white/90"
            >
              Ve stavebnictví a rekonstrukcích působím více než 30 let. Za tu
              dobu jsem získal bohaté zkušenosti s rekonstrukcemi bytů, domů i
              komerčních prostorů. Své odborné znalosti jsem dále rozšířil během
              školení a pracovní praxe v Německu, kde jsem si osvojil moderní
              stavební postupy a vysoké standardy kvality.
            </p>

            <p
              class="about-text text-sm leading-[1.55] text-white/85 sm:text-[15px] lg:text-lg lg:leading-relaxed lg:text-white/90"
            >
              U každého projektu kladu důraz na preciznost, kvalitu a
              spolehlivost, protože věřím, že dobrá práce nemá jen dobře
              vypadat, ale musí vydržet dlouhá léta.
            </p>
          </div>
        </div>
      </div>

      <!-- Подпись -->
      <div
        ref="label"
        class="absolute left-5 top-5 z-[8] max-w-[230px] text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/70 opacity-0 [transform:translateZ(0)] [will-change:transform,opacity] sm:left-8 sm:top-8 sm:text-xs lg:bottom-8 lg:left-8 lg:top-auto lg:max-w-none lg:text-sm lg:tracking-[0.2em]"
      >
        Více než 30 let zkušeností
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const section = ref(null);
const media = ref(null);
const background = ref(null);
const shade = ref(null);
const grayCover = ref(null);
const contentPanel = ref(null);
const contentInner = ref(null);
const portrait = ref(null);
const label = ref(null);

let context = null;
let mediaContext = null;
let refreshFrame = null;

const refreshScrollTrigger = () => {
  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  refreshFrame = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

const createDesktopAnimation = (scroller) => {
  const paragraphs = contentInner.value.querySelectorAll(".about-text");

  gsap.set(background.value, {
    scale: 1.14,
    xPercent: -4,
    yPercent: -2,
    force3D: true,
  });

  gsap.set(grayCover.value, {
    xPercent: 0,
    yPercent: 0,
    force3D: true,
  });

  gsap.set(contentPanel.value, {
    autoAlpha: 0,
    x: 30,
    y: 0,
    force3D: true,
  });

  gsap.set(contentInner.value, {
    autoAlpha: 0,
    y: 35,
    force3D: true,
  });

  gsap.set(portrait.value, {
    autoAlpha: 0,
    y: 22,
    scale: 0.96,
    force3D: true,
  });

  gsap.set(paragraphs, {
    autoAlpha: 0,
    y: 24,
    force3D: true,
  });

  gsap.set(label.value, {
    autoAlpha: 0,
    y: 18,
    force3D: true,
  });

  gsap.set(shade.value, {
    opacity: 0,
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: section.value,
      scroller,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.8,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to(
      grayCover.value,
      {
        xPercent: 100,
        duration: 0.42,
        force3D: true,
      },
      0,
    )
    .to(
      background.value,
      {
        scale: 1.02,
        xPercent: 0,
        yPercent: 3,
        duration: 1.3,
        force3D: true,
      },
      0,
    )
    .to(
      shade.value,
      {
        opacity: 0.48,
        duration: 0.28,
      },
      0.4,
    )
    .to(
      contentPanel.value,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.22,
        force3D: true,
      },
      0.56,
    )
    .to(
      label.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.22,
        force3D: true,
      },
      0.62,
    )
    .to(
      contentInner.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        force3D: true,
      },
      0.7,
    )
    .to(
      portrait.value,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.26,
        force3D: true,
      },
      0.76,
    )
    .to(
      paragraphs,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.09,
        force3D: true,
      },
      0.86,
    );
};

const createMobileAnimation = (scroller) => {
  const paragraphs = contentInner.value.querySelectorAll(".about-text");

  gsap.set(background.value, {
    scale: 1.1,
    xPercent: 0,
    yPercent: -3,
    force3D: true,
  });

  /*
   * На мобильных белая поверхность уходит вверх,
   * а не вправо.
   */
  gsap.set(grayCover.value, {
    xPercent: 0,
    yPercent: 0,
    force3D: true,
  });

  gsap.set(shade.value, {
    opacity: 0,
  });

  gsap.set(contentPanel.value, {
    autoAlpha: 0,
    yPercent: 14,
    force3D: true,
  });

  gsap.set(contentInner.value, {
    autoAlpha: 0,
    y: 24,
    force3D: true,
  });

  gsap.set(portrait.value, {
    autoAlpha: 0,
    y: 16,
    scale: 0.97,
    force3D: true,
  });

  gsap.set(paragraphs, {
    autoAlpha: 0,
    y: 18,
    force3D: true,
  });

  gsap.set(label.value, {
    autoAlpha: 0,
    y: -12,
    force3D: true,
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: section.value,
      scroller,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to(
      grayCover.value,
      {
        yPercent: -100,
        duration: 0.4,
        force3D: true,
      },
      0,
    )
    .to(
      background.value,
      {
        scale: 1,
        yPercent: 2,
        duration: 1.2,
        force3D: true,
      },
      0,
    )
    .to(
      shade.value,
      {
        opacity: 0.2,
        duration: 0.25,
      },
      0.34,
    )
    .to(
      label.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.22,
        force3D: true,
      },
      0.43,
    )
    .to(
      contentPanel.value,
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.34,
        ease: "power2.out",
        force3D: true,
      },
      0.52,
    )
    .to(
      contentInner.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.28,
        force3D: true,
      },
      0.62,
    )
    .to(
      portrait.value,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.24,
        force3D: true,
      },
      0.68,
    )
    .to(
      paragraphs,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.07,
        force3D: true,
      },
      0.76,
    );
};

onMounted(async () => {
  await nextTick();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const scroller = document.querySelector("#wrap");

  if (
    !scroller ||
    !section.value ||
    !media.value ||
    !background.value ||
    !shade.value ||
    !grayCover.value ||
    !contentPanel.value ||
    !contentInner.value ||
    !portrait.value ||
    !label.value
  ) {
    return;
  }

  context = gsap.context(() => {
    mediaContext = gsap.matchMedia();

    mediaContext.add("(max-width: 1023px)", () => {
      createMobileAnimation(scroller);
    });

    mediaContext.add("(min-width: 1024px)", () => {
      createDesktopAnimation(scroller);
    });
  }, section.value);

  refreshScrollTrigger();
});

onBeforeUnmount(() => {
  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  mediaContext?.revert();
  context?.revert();

  refreshFrame = null;
  mediaContext = null;
  context = null;
});
</script>
