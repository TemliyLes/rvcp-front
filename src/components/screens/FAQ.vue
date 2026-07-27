<template>
  <section
    id="proces"
    ref="section"
    class="relative bg-[#111] lg:h-[300dvh] lg:bg-white"
  >
    <div
      class="relative bg-[#111] lg:sticky lg:top-0 lg:h-dvh lg:overflow-hidden"
    >
      <div
        ref="scene"
        class="relative bg-[#111] text-white lg:absolute lg:inset-0"
      >
        <div
          ref="contentStage"
          class="relative [transform:translate3d(0,0,0)] [will-change:transform,opacity] lg:absolute lg:inset-0"
        >
          <div
            class="container grid grid-cols-1 gap-8 pb-16 md:pt-6 sm:gap-10 sm:pb-20 sm:pt-8 lg:h-full lg:grid-cols-2 lg:items-start lg:gap-16 lg:pb-8 lg:pt-28 xl:gap-24"
          >
            <!-- Изображение -->
            <div
              ref="imageBlock"
              class="relative h-[62dvh] min-h-[420px] max-h-[680px] w-full overflow-hidden bg-[#222] opacity-0 [backface-visibility:hidden] [transform:translate3d(0,0,0)] [will-change:transform,opacity] sm:h-[68dvh] lg:h-[calc(100dvh-144px)] lg:max-h-none lg:min-h-[480px] lg:self-start"
            >
              <img
                :src="faqImage"
                alt="Průběh realizace projektu"
                class="absolute inset-0 h-full w-full object-cover"
                @load="refreshScrollTrigger"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/15"
              />

              <div
                ref="imageContent"
                class="absolute inset-x-0 bottom-0 z-[2] p-5 opacity-0 sm:p-8 lg:p-10"
              >
                <p
                  class="text-[11px] uppercase tracking-[0.22em] text-white/55 sm:text-xs lg:text-sm lg:tracking-[0.24em]"
                >
                  Jak pracujeme
                </p>

                <h2
                  class="mt-3 max-w-[580px] text-3xl font-medium leading-[1.05] sm:mt-4 sm:text-4xl lg:text-5xl xl:text-6xl"
                >
                  Od první konzultace až po finální předání
                </h2>
              </div>
            </div>

            <!-- FAQ -->
            <div
              ref="faqBlock"
              class="p-4 md:p-0 relative w-full self-start overflow-visible opacity-0 [backface-visibility:hidden] [transform:translate3d(0,0,0)] [will-change:transform,opacity]"
            >
              <div ref="heading" class="mb-5 opacity-0 sm:mb-6">
                <p
                  class="text-[11px] uppercase tracking-[0.22em] text-white/45 sm:text-xs lg:text-sm lg:tracking-[0.24em]"
                >
                  Průběh spolupráce
                </p>

                <h2
                  class="mt-2.5 max-w-[720px] text-3xl font-medium leading-[1.08] sm:mt-3 sm:text-4xl lg:text-[44px]"
                >
                  Jednoduchý a přehledný proces
                </h2>
              </div>

              <div class="border-t border-white/20">
                <article
                  v-for="(item, index) in steps"
                  :key="item.id"
                  :ref="(element) => setItemRef(element, index)"
                  class="group relative border-b border-white/20 opacity-0"
                >
                  <button
                    type="button"
                    class="grid w-full grid-cols-[32px_minmax(0,1fr)_36px] items-start gap-3 py-4 text-left sm:grid-cols-[42px_minmax(0,1fr)_40px] sm:gap-4 lg:grid-cols-[54px_minmax(0,1fr)_42px] lg:py-4"
                    :aria-expanded="activeIndex === index"
                    :aria-controls="`faq-answer-${item.id}`"
                    @click="toggleItem(index)"
                  >
                    <span
                      class="pt-1 text-xs tabular-nums tracking-[0.14em] transition-colors duration-500 sm:text-sm sm:tracking-[0.16em]"
                      :class="
                        activeIndex === index
                          ? 'text-white'
                          : 'text-white/35 group-hover:text-white/65'
                      "
                    >
                      {{ item.number }}
                    </span>

                    <span class="min-w-0">
                      <span
                        class="block pr-2 text-base font-medium uppercase leading-tight transition-colors duration-500 sm:pr-4 sm:text-lg lg:text-xl"
                        :class="
                          activeIndex === index
                            ? 'text-white'
                            : 'text-white/55 group-hover:text-white/85'
                        "
                      >
                        {{ item.title }}
                      </span>

                      <span
                        :id="`faq-answer-${item.id}`"
                        :ref="(element) => setAnswerRef(element, index)"
                        class="block h-0 overflow-hidden"
                        :aria-hidden="activeIndex !== index"
                      >
                        <span
                          :ref="(element) => setAnswerInnerRef(element, index)"
                          class="block max-w-[680px] pb-1 pt-3 text-sm leading-relaxed text-white/65 opacity-0 [transform:translate3d(0,0,0)] [will-change:transform,opacity] lg:text-base"
                        >
                          {{ item.description }}
                        </span>
                      </span>
                    </span>

                    <span
                      class="flex size-9 items-center justify-center rounded-full border transition-colors duration-500 sm:size-10"
                      :class="
                        activeIndex === index
                          ? 'border-white bg-white text-black'
                          : 'border-white/25 text-white group-hover:border-white/60'
                      "
                    >
                      <span
                        :ref="(element) => setIconRef(element, index)"
                        class="relative block size-3.5 [transform:translate3d(0,0,0)] [will-change:transform] sm:size-4"
                        aria-hidden="true"
                      >
                        <span
                          class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current"
                        />

                        <span
                          class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current"
                        />
                      </span>
                    </span>
                  </button>

                  <span
                    class="pointer-events-none absolute bottom-[-1px] left-0 h-px bg-white transition-[width] duration-700 ease-out"
                    :class="activeIndex === index ? 'w-full' : 'w-0'"
                  />
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Только десктоп -->
      <div
        ref="endShade"
        class="pointer-events-none absolute inset-0 z-30 hidden bg-black opacity-0 [transform:translate3d(0,0,0)] [will-change:opacity] lg:block"
        aria-hidden="true"
      />

      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 z-40 hidden h-px bg-white/10 lg:block"
        aria-hidden="true"
      >
        <div
          ref="endProgress"
          class="h-full w-full origin-left scale-x-0 bg-white/70 [will-change:transform]"
        />
      </div>

      <div
        ref="curtain"
        class="pointer-events-none absolute inset-0 z-50 hidden bg-white [transform:translate3d(0,0,0)] [will-change:transform] lg:block"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import faqImage from "../../assets/img/bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const section = ref(null);
const scene = ref(null);
const contentStage = ref(null);

const curtain = ref(null);
const endShade = ref(null);
const endProgress = ref(null);

const imageBlock = ref(null);
const imageContent = ref(null);

const faqBlock = ref(null);
const heading = ref(null);

const itemRefs = ref([]);
const answerRefs = ref([]);
const answerInnerRefs = ref([]);
const iconRefs = ref([]);

const activeIndex = ref(0);

let context = null;
let mediaContext = null;
let accordionTimeline = null;
let refreshFrame = null;

const steps = [
  {
    id: 1,
    number: "01",
    title: "Úvodní konzultace",
    description:
      "Nejprve probereme vaše představy, potřeby a očekávání. Společně si projdeme základní informace o prostoru, rozsahu prací a cílech projektu.",
  },
  {
    id: 2,
    number: "02",
    title: "Prohlídka a návrh řešení",
    description:
      "Posoudíme prostor, technický stav a možnosti realizace. Poté připravíme řešení, které bude odpovídat vašim požadavkům i charakteru prostoru.",
  },
  {
    id: 3,
    number: "03",
    title: "Cenová nabídka a harmonogram",
    description:
      "Připravíme orientační rozpočet, stanovíme rozsah prací a časový plán realizace, abyste měli jasnou představu o dalším postupu.",
  },
  {
    id: 4,
    number: "04",
    title: "Realizace projektu",
    description:
      "Po schválení zahájíme realizaci. Dbáme na precizní provedení, kvalitní materiály a důslednou kontrolu každého detailu.",
  },
  {
    id: 5,
    number: "05",
    title: "Finální předání",
    description:
      "Po dokončení vám předáme hotový prostor připravený k užívání. Dbáme na estetiku, funkčnost a dlouhodobou kvalitu.",
  },
];

const setItemRef = (element, index) => {
  if (element) {
    itemRefs.value[index] = element;
  }
};

const setAnswerRef = (element, index) => {
  if (element) {
    answerRefs.value[index] = element;
  }
};

const setAnswerInnerRef = (element, index) => {
  if (element) {
    answerInnerRefs.value[index] = element;
  }
};

const setIconRef = (element, index) => {
  if (element) {
    iconRefs.value[index] = element;
  }
};

const refreshScrollTrigger = () => {
  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  refreshFrame = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};

const setInitialAccordionState = () => {
  steps.forEach((_, index) => {
    const answer = answerRefs.value[index];
    const inner = answerInnerRefs.value[index];
    const icon = iconRefs.value[index];

    if (!answer || !inner || !icon) {
      return;
    }

    const isOpen = activeIndex.value === index;

    gsap.set(answer, {
      height: isOpen ? "auto" : 0,
    });

    gsap.set(inner, {
      autoAlpha: isOpen ? 1 : 0,
      y: isOpen ? 0 : 10,
    });

    gsap.set(icon, {
      rotation: isOpen ? 45 : 0,
    });
  });
};

const closeItem = (index, position = 0) => {
  const answer = answerRefs.value[index];
  const inner = answerInnerRefs.value[index];
  const icon = iconRefs.value[index];

  if (!answer || !inner || !icon) {
    return;
  }

  accordionTimeline
    .to(
      inner,
      {
        autoAlpha: 0,
        y: -6,
        duration: 0.2,
        ease: "power2.in",
      },
      position,
    )
    .to(
      answer,
      {
        height: 0,
        duration: 0.5,
        ease: "power3.inOut",
      },
      position,
    )
    .to(
      icon,
      {
        rotation: 0,
        duration: 0.4,
        ease: "power3.inOut",
      },
      position,
    );
};

const openItem = (index, position = 0) => {
  const answer = answerRefs.value[index];
  const inner = answerInnerRefs.value[index];
  const icon = iconRefs.value[index];

  if (!answer || !inner || !icon) {
    return;
  }

  gsap.set(inner, {
    autoAlpha: 0,
    y: 10,
  });

  accordionTimeline
    .to(
      answer,
      {
        height: "auto",
        duration: 0.56,
        ease: "power3.inOut",
      },
      position,
    )
    .to(
      inner,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.36,
        ease: "power2.out",
      },
      position + 0.18,
    )
    .to(
      icon,
      {
        rotation: 45,
        duration: 0.42,
        ease: "power3.inOut",
      },
      position,
    );
};

const toggleItem = (index) => {
  accordionTimeline?.kill();

  const previousIndex = activeIndex.value;
  const nextIndex = previousIndex === index ? null : index;

  activeIndex.value = nextIndex;

  accordionTimeline = gsap.timeline({
    defaults: {
      overwrite: true,
    },
    onComplete: refreshScrollTrigger,
  });

  if (previousIndex !== null) {
    closeItem(previousIndex);
  }

  if (nextIndex !== null) {
    openItem(nextIndex, 0.04);
  }
};

const createDesktopAnimation = (scroller) => {
  gsap.set(curtain.value, {
    scaleY: 1,
    transformOrigin: "50% 100%",
    force3D: true,
  });

  gsap.set(contentStage.value, {
    y: 0,
    scale: 1,
    transformOrigin: "50% 50%",
    force3D: true,
  });

  gsap.set(endShade.value, {
    opacity: 0,
  });

  gsap.set(endProgress.value, {
    scaleX: 0,
    transformOrigin: "0% 50%",
    force3D: true,
  });

  gsap.set(imageBlock.value, {
    autoAlpha: 0,
    x: -48,
    force3D: true,
  });

  gsap.set(imageContent.value, {
    autoAlpha: 0,
    y: 20,
    force3D: true,
  });

  gsap.set(faqBlock.value, {
    autoAlpha: 0,
    x: 48,
    force3D: true,
  });

  gsap.set(heading.value, {
    autoAlpha: 0,
    y: 14,
    force3D: true,
  });

  gsap.set(itemRefs.value, {
    autoAlpha: 0,
    y: 14,
    force3D: true,
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "power2.inOut",
    },
    scrollTrigger: {
      trigger: section.value,
      scroller,
      start: "top top",
      end: "bottom bottom",
      scrub: 2.25,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .to(
      curtain.value,
      {
        scaleY: 0,
        duration: 0.44,
        ease: "none",
        force3D: true,
      },
      0.18,
    )
    .to(
      imageBlock.value,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.3,
        force3D: true,
      },
      0.66,
    )
    .to(
      faqBlock.value,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.3,
        force3D: true,
      },
      0.68,
    )
    .to(
      heading.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.22,
        force3D: true,
      },
      0.73,
    )
    .to(
      itemRefs.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.24,
        stagger: 0.032,
        force3D: true,
      },
      0.76,
    )
    .to(
      imageContent.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.24,
        force3D: true,
      },
      0.78,
    )
    .to(
      contentStage.value,
      {
        y: -18,
        scale: 0.988,
        duration: 0.72,
        force3D: true,
      },
      1.08,
    )
    .to(
      endShade.value,
      {
        opacity: 0.24,
        duration: 0.72,
      },
      1.08,
    )
    .to(
      endProgress.value,
      {
        scaleX: 1,
        duration: 0.72,
        force3D: true,
      },
      1.08,
    );
};

const createMobileAnimation = (scroller) => {
  gsap.set(contentStage.value, {
    clearProps: "transform",
  });

  gsap.set(imageBlock.value, {
    autoAlpha: 0,
    y: 36,
    scale: 0.985,
    force3D: true,
  });

  gsap.set(imageContent.value, {
    autoAlpha: 0,
    y: 20,
    force3D: true,
  });

  gsap.set(faqBlock.value, {
    autoAlpha: 0,
    y: 32,
    force3D: true,
  });

  gsap.set(heading.value, {
    autoAlpha: 0,
    y: 18,
    force3D: true,
  });

  gsap.set(itemRefs.value, {
    autoAlpha: 0,
    y: 18,
    force3D: true,
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: imageBlock.value,
        scroller,
        start: "top 88%",
        once: true,
      },
    })
    .to(imageBlock.value, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      force3D: true,
    })
    .to(
      imageContent.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        force3D: true,
      },
      0.25,
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: faqBlock.value,
        scroller,
        start: "top 88%",
        once: true,
      },
    })
    .to(faqBlock.value, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      force3D: true,
    })
    .to(
      heading.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
      },
      0.15,
    )
    .to(
      itemRefs.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
      },
      0.24,
    );
};

onMounted(async () => {
  await nextTick();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  if (
    !section.value ||
    !scene.value ||
    !contentStage.value ||
    !curtain.value ||
    !endShade.value ||
    !endProgress.value ||
    !imageBlock.value ||
    !imageContent.value ||
    !faqBlock.value ||
    !heading.value ||
    !itemRefs.value.length
  ) {
    return;
  }

  const scroller = document.querySelector("#wrap") || undefined;

  setInitialAccordionState();

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
  accordionTimeline?.kill();

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
