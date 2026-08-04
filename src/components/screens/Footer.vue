<template>
  <footer
    ref="footer"
    class="relative overflow-hidden bg-[#111] text-white [perspective:1200px] p-4 md:p-0"
  >
    <div class="container">
      <!-- Основная часть -->
      <div
        ref="mainGrid"
        class="grid gap-7 py-8 md:grid-cols-2 lg:grid-cols-[0.65fr_1.25fr_1fr] lg:gap-10 lg:py-10"
      >
        <!-- Заголовок -->
        <div
          ref="intro"
          class="[backface-visibility:hidden] [will-change:transform,opacity]"
        >
          <p class="text-xs uppercase tracking-[0.22em] text-white/40">
            Kontakt
          </p>

          <h2
            class="mt-3 max-w-[320px] text-3xl font-medium leading-none tracking-[-0.04em] sm:text-4xl lg:text-5xl"
          >
            Spojte se s námi
          </h2>
        </div>

        <!-- Контакты -->
        <div
          ref="contacts"
          class="flex flex-col items-start [backface-visibility:hidden] [will-change:transform,opacity]"
        >
          <p class="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
            Kontaktní údaje
          </p>

          <a
            href="mailto:obklad.finalizacia@gmail.com"
            class="break-all text-base leading-tight transition-opacity duration-300 hover:opacity-55 sm:text-lg lg:text-xl"
          >
            obklad.finalizacia@gmail.com
          </a>

          <a
            @click.prevent="open"
            href="tel:+421 900 123 456"
            class="mt-2.5 text-base leading-tight transition-opacity duration-300 hover:opacity-55 sm:text-lg lg:text-xl"
          >
            +421 900 123 456
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Šancová+45,+811+05+Bratislava,+Slovensko"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-3 max-w-[360px] text-sm leading-relaxed text-white/55 transition-colors duration-300 hover:text-white"
          >
            Šancová 45, 811 05 Bratislava, Slovensko
          </a>
        </div>

        <!-- Документы -->
        <nav
          ref="legal"
          class="flex flex-col items-start [backface-visibility:hidden] [will-change:transform,opacity] md:col-span-2 lg:col-span-1"
          aria-label="Právní informace"
        >
          <p class="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/35">
            Informace
          </p>

          <RouterLink
            to="/zasady-ochrany-osobnich-udaju"
            class="border-b border-white/15 py-2 text-sm leading-relaxed text-white/60 transition-colors duration-300 hover:border-white hover:text-white"
          >
            Zásady ochrany osobních údajů
          </RouterLink>

          <RouterLink
            to="/zasady-pouzivani-cookies"
            class="border-b border-white/15 py-2 text-sm leading-relaxed text-white/60 transition-colors duration-300 hover:border-white hover:text-white"
          >
            Zásady používání cookies
          </RouterLink>
        </nav>
      </div>

      <!-- Анимированная линия -->
      <div
        ref="divider"
        class="h-px w-full origin-left scale-x-0 bg-white/15 [will-change:transform]"
        aria-hidden="true"
      />

      <!-- Нижняя часть -->
      <div
        ref="bottomRow"
        class="flex flex-col gap-5 py-6 sm:flex-row sm:items-end sm:justify-between lg:py-7"
      >
        <div
          ref="copyright"
          class="[backface-visibility:hidden] [will-change:transform,opacity]"
        >
          <p class="text-[11px] uppercase tracking-[0.18em] text-white/35">
            © {{ currentYear }}
          </p>

          <p class="mt-1 text-xs text-white/45">Všechna práva vyhrazena</p>
        </div>

        <div
          ref="brand"
          class="flex items-end gap-3 [backface-visibility:hidden] [transform-style:preserve-3d] sm:flex-col sm:items-end sm:gap-0"
          aria-label="Real Stav Dizajn"
        >
          <span
            ref="brandMain"
            class="text-[clamp(34px,5.5vw,76px)] font-medium uppercase leading-[0.82] tracking-[-0.06em] [will-change:transform,opacity]"
          >
            Real Stav
          </span>

          <span
            ref="brandSecondary"
            class="text-[clamp(16px,2vw,28px)] font-medium uppercase leading-none tracking-[-0.035em] text-white/35 [will-change:transform,opacity]"
          >
            Dizajn
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import { gsap, ScrollTrigger } from "@/utils/gsap";

gsap.registerPlugin(ScrollTrigger);

const currentYear = new Date().getFullYear();

const footer = ref(null);
const mainGrid = ref(null);

const intro = ref(null);
const contacts = ref(null);
const legal = ref(null);

const divider = ref(null);

const bottomRow = ref(null);
const copyright = ref(null);
const brand = ref(null);
const brandMain = ref(null);
const brandSecondary = ref(null);

const emit = defineEmits(["open"]);

const open = () => {
  emit("open");
};

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

const createAnimation = (scroller) => {
  const topItems = [intro.value, contacts.value, legal.value];

  gsap.set(topItems, {
    autoAlpha: 0,
    y: 24,
    z: -30,
    rotationX: 3,
    transformPerspective: 1200,
    transformOrigin: "50% 100%",
    force3D: true,
  });

  gsap.set(divider.value, {
    scaleX: 0,
    transformOrigin: "0% 50%",
    force3D: true,
  });

  gsap.set(copyright.value, {
    autoAlpha: 0,
    y: 16,
    force3D: true,
  });

  gsap.set(brandMain.value, {
    autoAlpha: 0,
    y: 24,
    z: -20,
    rotationX: 3,
    force3D: true,
  });

  gsap.set(brandSecondary.value, {
    autoAlpha: 0,
    y: 14,
    force3D: true,
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: footer.value,
        scroller,
        start: "top 88%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    })
    .to(topItems, {
      autoAlpha: 1,
      y: 0,
      z: 0,
      rotationX: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      force3D: true,
    })
    .to(
      divider.value,
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power3.inOut",
        force3D: true,
      },
      "-=0.5",
    )
    .to(
      copyright.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        force3D: true,
      },
      "-=0.45",
    )
    .to(
      brandMain.value,
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        rotationX: 0,
        duration: 0.9,
        ease: "power3.out",
        force3D: true,
      },
      "-=0.65",
    )
    .to(
      brandSecondary.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        force3D: true,
      },
      "-=0.6",
    );
};

onMounted(async () => {
  await nextTick();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  if (
    !footer.value ||
    !mainGrid.value ||
    !intro.value ||
    !contacts.value ||
    !legal.value ||
    !divider.value ||
    !bottomRow.value ||
    !copyright.value ||
    !brand.value ||
    !brandMain.value ||
    !brandSecondary.value
  ) {
    return;
  }

  const scroller = document.querySelector("#wrap") || undefined;

  context = gsap.context(() => {
    mediaContext = gsap.matchMedia();

    mediaContext.add(
      {
        animate: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (matchContext) => {
        const { animate } = matchContext.conditions;

        if (animate) {
          createAnimation(scroller);
        } else {
          gsap.set(
            [
              intro.value,
              contacts.value,
              legal.value,
              divider.value,
              copyright.value,
              brandMain.value,
              brandSecondary.value,
            ],
            {
              clearProps: "all",
              autoAlpha: 1,
            },
          );
        }
      },
    );
  }, footer.value);

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
