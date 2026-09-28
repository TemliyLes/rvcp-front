<template>
  <section id="online" ref="section" class="relative bg-white lg:h-[320dvh]">
    <div
      ref="stage"
      class="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-white px-5 py-20 sm:px-8 lg:sticky lg:top-0 lg:h-dvh lg:min-h-0 lg:px-12 lg:py-0"
    >
      <div
        ref="collage"
        class="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <div
          data-parallax-y="-130"
          class="js-online-item absolute left-[29%] top-[12%] aspect-[1.42/1] w-[15%] overflow-hidden bg-neutral-200 [will-change:transform,opacity]"
        >
          <img :class="imageClass" src="../../assets/sup/1.png" alt="" />
        </div>

        <div
          data-parallax-y="-220"
          class="js-online-item absolute right-[25%] top-[4%] aspect-[0.82/1] w-[15%] overflow-hidden bg-neutral-200 [will-change:transform,opacity]"
        >
          <img :class="imageClass" src="../../assets/sup/2.png" alt="" />
        </div>

        <div
          data-parallax-y="-95"
          class="js-online-item absolute right-[14.5%] top-[16%] z-10 w-[220px] bg-neutral-950 px-5 py-4 text-white [will-change:transform,opacity] xl:w-[250px]"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-9 shrink-0 items-center justify-center text-[10px] font-medium"
            >
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.1475 0.00655677C19.8458 0.00546386 20.625 0.00655677 21.5003 0.00655677C28.5028 0.00655677 29.3327 0.031694 32.098 0.157379C34.6551 0.27432 36.0429 0.701648 36.9674 1.06067C38.1913 1.53608 39.0638 2.1044 39.9812 3.02244C40.8992 3.94049 41.4674 4.81481 41.9438 6.03887C42.3028 6.96238 42.7306 8.35038 42.847 10.9078C42.9727 13.6729 43 14.5035 43 21.5035C43 28.5036 42.9727 29.3343 42.847 32.0993C42.7301 34.6567 42.3028 36.0447 41.9438 36.9682C41.4685 38.1923 40.8992 39.0639 39.9812 39.9814C39.0633 40.8994 38.1918 41.4677 36.9674 41.9432C36.044 42.3038 34.6551 42.73 32.098 42.847C29.3333 42.9727 28.5028 43 21.5003 43C14.4973 43 13.6673 42.9727 10.9026 42.847C8.34549 42.729 6.95768 42.3016 6.03264 41.9426C4.80874 41.4672 3.93452 40.8989 3.01659 39.9808C2.09867 39.0628 1.53043 38.1907 1.05398 36.966C0.695003 36.0425 0.267183 34.6545 0.150803 32.0971C0.0251345 29.3321 0 28.5014 0 21.497C0 14.4925 0.0251345 13.6663 0.150803 10.9012C0.26773 8.34382 0.695003 6.95582 1.05398 6.03122C1.52933 4.80716 2.09867 3.93284 3.01659 3.01479C3.93452 2.09675 4.80874 1.52843 6.03264 1.05193C6.95713 0.691265 8.34549 0.265031 10.9026 0.147543C13.322 0.0382523 14.2596 0.00546455 19.1475 0V0.00655677ZM35.4998 4.3618C34.8773 4.3618 34.2687 4.54643 33.7512 4.89234C33.2336 5.23825 32.8302 5.7299 32.592 6.30511C32.3539 6.88032 32.2916 7.51325 32.4131 8.12385C32.5347 8.73445 32.8345 9.29529 33.2748 9.73545C33.715 10.1756 34.2759 10.4753 34.8865 10.5966C35.497 10.7179 36.1298 10.6555 36.7049 10.4171C37.28 10.1787 37.7714 9.77505 38.1171 9.25729C38.4628 8.73953 38.6472 8.13087 38.6469 7.50829C38.6469 5.77056 37.2373 4.3618 35.4998 4.3618ZM21.5003 8.03944C14.0623 8.03944 8.03187 14.0707 8.03187 21.5096C8.03187 28.9485 14.0623 34.9769 21.5003 34.9769C28.9382 34.9769 34.967 28.9485 34.967 21.5096C34.967 14.0707 28.9382 8.03944 21.5003 8.03944ZM21.5003 12.7663C26.3281 12.7663 30.2424 16.6805 30.2424 21.5096C30.2424 26.338 26.3281 30.2528 21.5003 30.2528C16.6719 30.2528 12.7581 26.338 12.7581 21.5096C12.7581 16.6805 16.6719 12.7663 21.5003 12.7663Z"
                  fill="white"
                />
              </svg>
            </div>

            <div>
              <div class="text-lg font-semibold leading-none">25 000+</div>

              <div class="mt-1 text-[10px] text-white/45">sledujících</div>
            </div>
          </div>

          <div class="relative mt-5 h-12">
            <svg
              viewBox="0 0 180 50"
              class="h-full w-full overflow-visible"
              fill="none"
            >
              <path
                d="M2 44 C30 31, 42 35, 62 27 S97 23, 116 15 S150 9, 178 2"
                stroke="rgba(255,255,255,.22)"
                stroke-width="1.5"
              />

              <circle cx="2" cy="44" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="36" cy="31" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="68" cy="26" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="103" cy="20" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="138" cy="11" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="178" cy="2" r="3" fill="white" />
            </svg>
          </div>
        </div>

        <div
          data-parallax-y="-175"
          class="js-online-item absolute left-[15%] top-[37%] aspect-[0.82/1] w-[13%] overflow-hidden bg-neutral-200 [will-change:transform,opacity]"
        >
          <img :class="imageClass" src="../../assets/sup/5.png" alt="" />
        </div>

        <div
          data-parallax-y="-260"
          class="js-online-item absolute bottom-[5%] left-[39%] aspect-[0.82/1] w-[15%] overflow-hidden bg-neutral-200 [will-change:transform,opacity]"
        >
          <img :class="imageClass" src="../../assets/sup/4.png" alt="" />
        </div>

        <div
          data-parallax-y="-115"
          class="js-online-item absolute bottom-[9%] left-[15%] z-10 w-[220px] bg-neutral-950 px-5 py-4 text-white [will-change:transform,opacity] xl:w-[250px]"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black"
            >
              f
            </div>

            <div>
              <div class="text-lg font-semibold leading-none">25 000+</div>

              <div class="mt-1 text-[10px] text-white/45">sledujících</div>
            </div>
          </div>

          <div class="relative mt-5 h-12">
            <svg
              viewBox="0 0 180 50"
              class="h-full w-full overflow-visible"
              fill="none"
            >
              <path
                d="M2 44 C30 31, 42 35, 62 27 S97 23, 116 15 S150 9, 178 2"
                stroke="rgba(255,255,255,.22)"
                stroke-width="1.5"
              />

              <circle cx="2" cy="44" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="36" cy="31" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="68" cy="26" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="103" cy="20" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="138" cy="11" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="178" cy="2" r="3" fill="white" />
            </svg>
          </div>
        </div>

        <div
          data-parallax-y="-195"
          class="js-online-item absolute bottom-[10%] right-[25%] aspect-[0.82/1] w-[15%] overflow-hidden bg-neutral-200 [will-change:transform,opacity]"
        >
          <img :class="imageClass" src="../../assets/sup/3.png" alt="" />
        </div>

        <div
          data-parallax-y="-75"
          class="js-online-item absolute bottom-[14%] right-[14.5%] z-10 w-[220px] bg-neutral-950 px-5 py-4 text-white [will-change:transform,opacity] xl:w-[250px]"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex h-7 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[9px] font-bold text-black"
            >
              ▶
            </div>

            <div>
              <div class="text-lg font-semibold leading-none">25 000+</div>

              <div class="mt-1 text-[10px] text-white/45">odběratelů</div>
            </div>
          </div>

          <div class="relative mt-5 h-12">
            <svg
              viewBox="0 0 180 50"
              class="h-full w-full overflow-visible"
              fill="none"
            >
              <path
                d="M2 44 C30 31, 42 35, 62 27 S97 23, 116 15 S150 9, 178 2"
                stroke="rgba(255,255,255,.22)"
                stroke-width="1.5"
              />

              <circle cx="2" cy="44" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="36" cy="31" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="68" cy="26" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="103" cy="20" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="138" cy="11" r="2.5" fill="rgba(255,255,255,.35)" />

              <circle cx="178" cy="2" r="3" fill="white" />
            </svg>
          </div>
        </div>
      </div>

      <div
        ref="content"
        class="relative z-30 mx-auto flex w-full max-w-[720px] flex-col items-center text-center lg:w-[48%]"
      >
        <!-- <div
          class="text-[10px] uppercase tracking-[0.12em] text-neutral-500 sm:text-xs"
        >
          Najdete nás i online
        </div> -->

        <h2
          class="mt-4 max-w-[720px] text-[34px] font-light uppercase leading-[0.96] tracking-[-0.04em] text-black! sm:text-[46px] lg:text-[50px] xl:text-[58px]"
        >
          Najdete nás i online

          <br class="hidden sm:block" />
        </h2>

        <p
          class="mt-6 max-w-[660px] text-sm leading-relaxed text-black! sm:text-[15px]"
        >
          Odvážné nápady, precizní provedení a bezchybná kvalita — vytváříme
          interiéry, které inspirují, dodávají energii a přinášejí pocit
          skutečného pohodlí.
        </p>

        <a
          target="_blank"
          href="https://www.youtube.com/@ObkladaFinaliz%C3%A1cia"
          class="mt-8 inline-flex min-h-11 items-center justify-center bg-neutral-950 px-7 text-[10px] font-medium uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-80"
        >
          Přechod na YouTube
        </a>
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
const stage = ref(null);
const collage = ref(null);
const content = ref(null);

let context = null;
let mediaContext = null;
let refreshFrame = null;

const imageClass = "w-full  h-full object-cover ";

/* =========================================================
   REFRESH
   ========================================================= */

const refreshScrollTrigger = () => {
  if (refreshFrame) {
    cancelAnimationFrame(refreshFrame);
  }

  refreshFrame = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
};

/* =========================================================
   SCROLLER
   ========================================================= */

const getScroller = () => {
  const wrap = document.querySelector("#wrap");

  if (!wrap) {
    return null;
  }

  const styles = window.getComputedStyle(wrap);

  const overflowY = styles.overflowY;

  const canScroll =
    (overflowY === "auto" || overflowY === "scroll") &&
    wrap.scrollHeight > wrap.clientHeight;

  if (canScroll) {
    return wrap;
  }

  return null;
};

/* =========================================================
   CENTER OFFSET
   ========================================================= */

const getCenterOffset = (element) => {
  if (!collage.value) {
    return {
      x: 0,
      y: 0,
    };
  }

  const centerX = collage.value.clientWidth / 2;

  const centerY = collage.value.clientHeight / 2;

  const elementCenterX = element.offsetLeft + element.offsetWidth / 2;

  const elementCenterY = element.offsetTop + element.offsetHeight / 2;

  return {
    x: centerX - elementCenterX,
    y: centerY - elementCenterY,
  };
};

/* =========================================================
   ПРЕДВАРИТЕЛЬНО СКРЫВАЕМ КАРТОЧКИ

   Вызывается ДО ожидания fonts.ready.

   Поэтому пользователь никогда не увидит
   конечную композицию до инициализации GSAP.
   ========================================================= */

const hideDesktopItems = () => {
  if (!collage.value || !window.matchMedia("(min-width: 1024px)").matches) {
    return;
  }

  const items = Array.from(collage.value.querySelectorAll(".js-online-item"));

  gsap.set(items, {
    autoAlpha: 0,
    scale: 0.42,

    transformOrigin: "50% 50%",

    force3D: true,
  });
};

/* =========================================================
   DESKTOP ANIMATION
   ========================================================= */

const createDesktopAnimation = (scroller) => {
  if (!section.value || !stage.value || !collage.value || !content.value) {
    return;
  }

  const items = Array.from(collage.value.querySelectorAll(".js-online-item"));

  if (!items.length) {
    return;
  }

  const scrollConfig = scroller
    ? {
        scroller,
      }
    : {};

  /*
   * -------------------------------------------------------
   * Сразу устанавливаем стартовое состояние.
   *
   * ВАЖНО:
   * не fromTo внутри timeline, а gsap.set ДО ScrollTrigger.
   *
   * Поэтому до начала анимации карточки гарантированно
   * находятся в центре.
   * -------------------------------------------------------
   */

  items.forEach((item) => {
    const offset = getCenterOffset(item);

    gsap.set(item, {
      x: offset.x,
      y: offset.y,

      scale: 0.42,

      autoAlpha: 0,

      transformOrigin: "50% 50%",

      force3D: true,
    });
  });

  gsap.set(content.value, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
  });

  /*
   * -------------------------------------------------------
   * ОДИН ScrollTrigger.
   *
   * Никакого переключения между двумя ScrollTrigger.
   * Поэтому transform непрерывный.
   * -------------------------------------------------------
   */

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section.value,

      ...scrollConfig,

      start: "top top",
      end: "bottom bottom",

      scrub: 2,

      invalidateOnRefresh: true,

      // markers: true,
    },
  });

  /*
   * -------------------------------------------------------
   * ФАЗА 1
   * Разлёт из центра.
   *
   * power4.out даёт эффект доводчика:
   * движение сильно тормозит в конце.
   * -------------------------------------------------------
   */

  timeline.to(
    items,
    {
      x: 0,
      y: 0,

      scale: 1,

      autoAlpha: 1,

      duration: 2,

      ease: "power4.out",

      stagger: {
        each: 0.025,
        from: "center",
      },

      force3D: true,
    },
    0,
  );

  /*
   * -------------------------------------------------------
   * ФАЗА 2
   * Parallax.
   *
   * Начинается прямо из y: 0,
   * которым закончилась предыдущая фаза.
   *
   * Никакого скачка между состояниями нет.
   * -------------------------------------------------------
   */

  timeline.to(
    items,
    {
      y: (index, element) => {
        return Number(element.dataset.parallaxY || -100);
      },

      duration: 1.6,

      ease: "none",

      force3D: true,
    },

    /*
     * Небольшое наложение фаз.
     *
     * Параллакс начинает подключаться,
     * пока "доводчик" ещё совсем немного работает.
     *
     * Это убирает ощущение:
     *
     * остановились → поехали
     */
    ">-0.18",
  );
};
/* =========================================================
   MOUNT
   ========================================================= */

onMounted(async () => {
  await nextTick();

  if (!section.value || !stage.value || !collage.value || !content.value) {
    return;
  }

  /*
   * ВАЖНО:
   * прячем карточки сразу.
   *
   * До fonts.ready и ScrollTrigger.refresh().
   */
  hideDesktopItems();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const scroller = getScroller();

  context = gsap.context(() => {
    mediaContext = gsap.matchMedia();

    mediaContext.add("(min-width: 1024px)", () => {
      createDesktopAnimation(scroller);
    });
  }, section.value);

  refreshScrollTrigger();
});

/* =========================================================
   DESTROY
   ========================================================= */

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
