<template>
  <section ref="section" class="relative mt-12 h-[240dvh]">
    <div
      class="sticky top-0 isolate h-dvh overflow-hidden bg-white [perspective:1600px]"
    >
      <div
        ref="media"
        class="absolute inset-0 overflow-hidden [contain:paint] [transform:translateZ(0)]"
      >
        <img
          ref="background"
          class="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)] [will-change:transform]"
          src="../../assets/img/bg.jpg"
          alt=""
        />

        <div
          ref="shade"
          class="absolute inset-0 bg-black opacity-0 [will-change:opacity]"
        />
      </div>

      <div
        ref="grayCover"
        class="pointer-events-none absolute inset-0 z-[4] bg-white [transform:translateZ(0)] [will-change:transform]"
      />

      <div
        ref="contentPanel"
        class="absolute right-0 top-0 z-[7] flex h-full w-1/2 items-center bg-black/55 p-12 text-white opacity-0 [contain:paint] [transform:translateZ(0)] [will-change:opacity]"
      >
        <div
          ref="contentInner"
          class="max-w-[680px] [will-change:transform,opacity]"
        >
          <div
            ref="portrait"
            class="mb-10 [backface-visibility:hidden] [transform:translateZ(0)] [will-change:transform,opacity]"
          >
            <div class="flex items-center gap-5">
              <img
                class="h-24 w-24 shrink-0 rounded-full object-cover"
                src="../../assets/img/man.png"
                alt="Stano Zachar"
              />

              <div>
                <h3 class="text-3xl font-medium leading-tight">Stano Zachar</h3>

                <p class="mt-2 text-base text-white/60">Zakladatel firmy</p>
              </div>
            </div>
          </div>

          <div class="space-y-7">
            <p class="about-text text-lg leading-relaxed text-white/90">
              Ve stavebnictví a rekonstrukcích působím více než 30 let. Za tu
              dobu jsem získal bohaté zkušenosti s rekonstrukcemi bytů, domů i
              komerčních prostorů. Své odborné znalosti jsem dále rozšířil během
              školení a pracovní praxe v Německu, kde jsem si osvojil moderní
              stavební postupy a vysoké standardy kvality.
            </p>

            <p class="about-text text-lg leading-relaxed text-white/90">
              U každého projektu kladu důraz na preciznost, kvalitu a
              spolehlivost, protože věřím, že dobrá práce nemá jen dobře
              vypadat, ale musí vydržet dlouhá léta.
            </p>
          </div>
        </div>
      </div>

      <div
        ref="label"
        class="absolute bottom-8 left-8 z-[8] text-sm uppercase tracking-[0.2em] text-white/70 opacity-0 [transform:translateZ(0)] [will-change:transform,opacity]"
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

onMounted(async () => {
  await nextTick();

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
    const paragraphs = contentInner.value.querySelectorAll(".about-text");

    gsap.set(background.value, {
      scale: 1.14,
      xPercent: -4,
      yPercent: -2,
      force3D: true,
    });

    gsap.set(grayCover.value, {
      xPercent: 0,
      force3D: true,
    });

    gsap.set(contentPanel.value, {
      opacity: 0,
    });

    gsap.set(contentInner.value, {
      opacity: 0,
      y: 35,
      force3D: true,
    });

    gsap.set(portrait.value, {
      opacity: 0,
      y: 22,
      scale: 0.96,
      force3D: true,
    });

    gsap.set(paragraphs, {
      opacity: 0,
      y: 24,
      force3D: true,
    });

    gsap.set(label.value, {
      opacity: 0,
      y: 18,
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
          opacity: 1,
          duration: 0.18,
        },
        0.58,
      )
      .to(
        label.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          force3D: true,
        },
        0.64,
      )
      .to(
        contentInner.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          force3D: true,
        },
        0.72,
      )
      .to(
        portrait.value,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.24,
          force3D: true,
        },
        0.78,
      )
      .to(
        paragraphs,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.09,
          force3D: true,
        },
        0.88,
      );
  }, section.value);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

onBeforeUnmount(() => {
  context?.revert();
});
</script>
