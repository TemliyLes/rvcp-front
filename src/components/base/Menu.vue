<template>
  <header
    ref="header"
    class="fixed inset-x-0 top-0 z-[100] h-[90px] text-white"
  >
    <div
      class="container flex h-full items-center justify-end px-4 lg:justify-center"
    >
      <!-- Десктопное меню -->
      <nav
        class="-mt-2 hidden items-center justify-center gap-7 lg:flex xl:gap-10"
        aria-label="Hlavní navigace"
      >
        <a
          v-for="item in safeMenuItems"
          :key="item.id"
          :href="`#${item.id}`"
          class="group relative flex items-center py-1.5 text-sm leading-none transition-colors duration-300"
          :class="
            activeSection === item.id
              ? 'text-white'
              : 'text-white/50 hover:text-white'
          "
          @click.prevent="scrollToSection(item.id)"
        >
          {{ item.label }}

          <span
            class="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-white transition-transform duration-500"
            :class="
              activeSection === item.id
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100'
            "
          />
        </a>
      </nav>

      <!-- Бургер -->
      <button
        type="button"
        class="relative z-[102] -mt-3 flex size-11 translate-y-1 items-center justify-center lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        :aria-label="menuOpen ? 'Zavřít menu' : 'Otevřít menu'"
        @click="toggleMenu"
      >
        <span class="relative block h-4 w-7">
          <span
            class="absolute left-0 top-0 h-px w-full bg-white transition-transform duration-500"
            :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
          />

          <span
            class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white transition-opacity duration-300"
            :class="menuOpen ? 'opacity-0' : 'opacity-100'"
          />

          <span
            class="absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-500"
            :class="menuOpen ? '-translate-y-[8px] -rotate-45' : ''"
          />
        </span>
      </button>
    </div>
  </header>

  <!-- Мобильное меню -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="-translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div
        v-if="menuOpen"
        id="mobile-navigation"
        class="fixed inset-x-0 bottom-0 top-[90px] z-[99] overflow-y-auto overscroll-contain bg-[#111] text-white lg:hidden"
      >
        <nav class="flex flex-col pt-3" aria-label="Mobilní navigace">
          <a
            v-for="(item, index) in safeMenuItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="group grid min-h-[64px] grid-cols-[32px_minmax(0,1fr)_20px] items-center border-b border-white/15 px-4"
            @click.prevent="scrollToSection(item.id)"
          >
            <span
              class="text-[10px] tabular-nums tracking-[0.14em] text-white/25"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <span
              class="text-xl font-medium uppercase leading-none transition-colors duration-300"
              :class="
                activeSection === item.id ? 'text-white' : 'text-white/50'
              "
            >
              {{ item.label }}
            </span>

            <span class="text-lg text-white/30" aria-hidden="true"> → </span>
          </a>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_HEIGHT = 90;
const MOBILE_BREAKPOINT = 1023;

const header = ref(null);
const menuOpen = ref(false);
const activeSection = ref("");

/*
 * НАСТРОЙКА ЯКОРЕЙ
 *
 * progressDown — переход к секции сверху.
 * progressUp — переход к секции снизу.
 *
 * 0 = начало ScrollTrigger.
 * 1 = конец ScrollTrigger.
 *
 * triggerId — ID основного ScrollTrigger секции.
 *
 * Даже если triggerId не найден, Menu.vue
 * использует progress относительно высоты секции.
 */
const menuItems = [
  {
    id: "realizace",
    label: "Realizace",

    triggerId: null,

    progressDown: null,
    progressUp: null,

    offsetDown: {
      desktop: 0,
      mobile: 0,
    },

    offsetUp: {
      desktop: 0,
      mobile: 0,
    },
  },

  {
    id: "o-nas",
    label: "O nás",

    triggerId: {
      desktop: "o-nas-animation-desktop",
      mobile: "o-nas-animation-mobile",
    },

    progressDown: {
      desktop: 0.92,
      mobile: 0.92,
    },

    progressUp: {
      desktop: 0.92,
      mobile: 0.92,
    },

    offsetDown: {
      desktop: 0,
      mobile: 0,
    },

    offsetUp: {
      desktop: 0,
      mobile: 0,
    },
  },

  {
    id: "proces",
    label: "Jak pracujeme",

    triggerId: {
      desktop: "proces-animation-desktop",
      mobile: "proces-animation-mobile",
    },

    progressDown: {
      desktop: 0.57,
      mobile: 0.72,
    },

    progressUp: {
      desktop: 0.57,
      mobile: 0.72,
    },

    offsetDown: {
      desktop: 0,
      mobile: 0,
    },

    offsetUp: {
      desktop: 0,
      mobile: 0,
    },
  },

  {
    id: "kontakt",
    label: "Kontakt",

    triggerId: {
      desktop: "kontakt-animation-desktop",
      mobile: "kontakt-animation-mobile",
    },

    progressDown: {
      desktop: 0.5,
      mobile: 0.62,
    },

    progressUp: {
      desktop: 0.5,
      mobile: 0.62,
    },

    offsetDown: {
      desktop: 0,
      mobile: 0,
    },

    offsetUp: {
      desktop: 0,
      mobile: 0,
    },
  },
];

/*
 * Защита от пустых элементов массива.
 */
const safeMenuItems = menuItems.filter((item) => {
  return (
    item &&
    typeof item.id === "string" &&
    item.id.length > 0 &&
    typeof item.label === "string"
  );
});

let sectionTriggers = [];
let scrollTween = null;
let resizeFrame = null;
let interruptionTarget = null;

let isNavigating = false;
let navigationToken = 0;

const isMobileViewport = () => {
  return window.innerWidth <= MOBILE_BREAKPOINT;
};

/*
 * Все компоненты анимации используют #wrap,
 * поэтому меню использует тот же scroller.
 */
const getScroller = () => {
  return document.querySelector("#wrap") || null;
};

const getResponsiveValue = (value, fallback = null) => {
  if (value !== null && typeof value === "object") {
    const result = isMobileViewport() ? value.mobile : value.desktop;

    return result ?? fallback;
  }

  return value ?? fallback;
};

const getConfiguredProgress = ({ item, direction }) => {
  if (!item) {
    return null;
  }

  const value =
    direction === "up"
      ? getResponsiveValue(item.progressUp, null)
      : getResponsiveValue(item.progressDown, null);

  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return gsap.utils.clamp(0, 1, parsedValue);
};

const waitForRender = () => {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};

const getScrollTop = (scroller) => {
  if (scroller) {
    return scroller.scrollTop;
  }

  return window.scrollY || document.documentElement.scrollTop || 0;
};

const setScrollTop = (scroller, scrollTop) => {
  if (scroller) {
    scroller.scrollTop = scrollTop;
    return;
  }

  window.scrollTo({
    top: scrollTop,
    left: 0,
    behavior: "auto",
  });
};

const getViewportHeight = (scroller) => {
  return scroller ? scroller.clientHeight : window.innerHeight;
};

const getMaximumScrollTop = (scroller) => {
  if (scroller) {
    return Math.max(0, scroller.scrollHeight - scroller.clientHeight);
  }

  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
};

const clampScrollTop = (scrollTop, scroller) => {
  const parsedValue = Number(scrollTop);

  if (!Number.isFinite(parsedValue)) {
    return 0;
  }

  return Math.min(Math.max(0, parsedValue), getMaximumScrollTop(scroller));
};

/*
 * Координата начала секции относительно
 * текущего scroll-контейнера.
 */
const getSectionTop = (target, scroller) => {
  const targetRect = target.getBoundingClientRect();

  if (scroller) {
    const scrollerRect = scroller.getBoundingClientRect();

    return scroller.scrollTop + targetRect.top - scrollerRect.top;
  }

  return getScrollTop(null) + targetRect.top;
};

/*
 * Определяем, находится пользователь
 * выше или ниже выбранной секции.
 */
const getScrollDirection = ({ target, scroller }) => {
  const currentTop = getScrollTop(scroller);

  const sectionTop = getSectionTop(target, scroller);

  const sectionDistance = Math.max(
    0,
    target.offsetHeight - getViewportHeight(scroller),
  );

  const sectionEnd = sectionTop + sectionDistance;

  if (currentTop < sectionTop) {
    return "down";
  }

  if (currentTop > sectionEnd) {
    return "up";
  }

  const sectionMiddle = sectionTop + sectionDistance / 2;

  return currentTop > sectionMiddle ? "up" : "down";
};

/*
 * Прогресс, указанный через data-атрибуты.
 *
 * Поддерживаются:
 *
 * data-anchor-progress
 * data-anchor-progress-desktop
 * data-anchor-progress-mobile
 *
 * data-anchor-progress-desktop-down
 * data-anchor-progress-desktop-up
 *
 * data-anchor-progress-mobile-down
 * data-anchor-progress-mobile-up
 */
const getDatasetProgress = (target, direction) => {
  const mobile = isMobileViewport();

  const directionalValue = mobile
    ? direction === "up"
      ? target.dataset.anchorProgressMobileUp
      : target.dataset.anchorProgressMobileDown
    : direction === "up"
      ? target.dataset.anchorProgressDesktopUp
      : target.dataset.anchorProgressDesktopDown;

  const breakpointValue = mobile
    ? target.dataset.anchorProgressMobile
    : target.dataset.anchorProgressDesktop;

  const rawValue =
    directionalValue ?? breakpointValue ?? target.dataset.anchorProgress;

  if (rawValue === undefined || rawValue === "") {
    return null;
  }

  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  return gsap.utils.clamp(0, 1, parsedValue);
};

/*
 * Получаем реальный ScrollTrigger секции.
 */
const getItemScrollTrigger = (item) => {
  if (!item) {
    return null;
  }

  const triggerId = getResponsiveValue(item.triggerId, null);

  if (!triggerId) {
    return null;
  }

  return ScrollTrigger.getById(triggerId) || null;
};

/*
 * Общий progress выбранного якоря.
 *
 * Приоритет:
 * 1. progress из Menu.vue;
 * 2. data-anchor-progress на секции.
 */
const getAnchorProgress = ({ target, item, direction }) => {
  const configuredProgress = getConfiguredProgress({
    item,
    direction,
  });

  if (configuredProgress !== null) {
    return configuredProgress;
  }

  return getDatasetProgress(target, direction);
};

/*
 * Положение через реальный ScrollTrigger.
 */
const getTriggerTargetTop = ({ target, item, direction }) => {
  const progress = getAnchorProgress({
    target,
    item,
    direction,
  });

  if (progress === null) {
    return null;
  }

  const trigger = getItemScrollTrigger(item);

  if (!trigger) {
    return null;
  }

  const start = Number(trigger.start);
  const end = Number(trigger.end);

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return null;
  }

  return start + (end - start) * progress;
};

/*
 * Запасной расчёт через высоту секции.
 *
 * Работает даже тогда, когда ScrollTrigger
 * по triggerId не найден.
 */
const getProgressFallbackTargetTop = ({
  target,
  item,
  scroller,
  direction,
}) => {
  const progress = getAnchorProgress({
    target,
    item,
    direction,
  });

  if (progress === null) {
    return null;
  }

  const sectionTop = getSectionTop(target, scroller);

  const scrollDistance = Math.max(
    0,
    target.offsetHeight - getViewportHeight(scroller),
  );

  return sectionTop + scrollDistance * progress;
};

/*
 * Обычный якорь через offset.
 */
const getOffsetTargetTop = ({
  target,
  item,
  scroller,
  direction,
  headerHeight,
}) => {
  const sectionTop = getSectionTop(target, scroller);

  const configuredOffset =
    direction === "up"
      ? getResponsiveValue(item?.offsetUp, 0)
      : getResponsiveValue(item?.offsetDown, 0);

  const parsedOffset = Number(configuredOffset);

  const offset = Number.isFinite(parsedOffset) ? parsedOffset : 0;

  return sectionTop - headerHeight + offset;
};

/*
 * Приоритет вычисления позиции:
 *
 * 1. Реальный start/end ScrollTrigger.
 * 2. Тот же progress через высоту секции.
 * 3. Ручной offset.
 */
const getAnchorTargetTop = ({
  target,
  item,
  scroller,
  direction,
  headerHeight,
}) => {
  const triggerTarget = getTriggerTargetTop({
    target,
    item,
    direction,
  });

  if (triggerTarget !== null) {
    return triggerTarget;
  }

  const progressTarget = getProgressFallbackTargetTop({
    target,
    item,
    scroller,
    direction,
  });

  if (progressTarget !== null) {
    return progressTarget;
  }

  return getOffsetTargetTop({
    target,
    item,
    scroller,
    direction,
    headerHeight,
  });
};

/*
 * После завершения перехода точно
 * синхронизируем ScrollTrigger.
 */
const synchronizeTrigger = ({ item }) => {
  const trigger = getItemScrollTrigger(item);

  if (!trigger) {
    ScrollTrigger.update();
    return;
  }

  ScrollTrigger.update();

  /*
   * Не уничтожаем scrub-tween.
   * Только мгновенно доводим его до цели.
   */
  const scrubTween = trigger.getTween?.();

  if (scrubTween && typeof scrubTween.progress === "function") {
    scrubTween.progress(1);
  }

  ScrollTrigger.update();
};

const openMenu = () => {
  menuOpen.value = true;
};

const closeMenu = async () => {
  if (!menuOpen.value) {
    return;
  }

  menuOpen.value = false;

  await nextTick();
  await waitForRender();
};

const toggleMenu = async () => {
  if (menuOpen.value) {
    await closeMenu();
    return;
  }

  openMenu();
};

const setActiveSection = (id) => {
  if (isNavigating) {
    return;
  }

  activeSection.value = id;
};

const destroySectionTriggers = () => {
  sectionTriggers.forEach((trigger) => {
    trigger?.kill();
  });

  sectionTriggers = [];
};

/*
 * Отслеживание активного пункта
 * при ручной прокрутке.
 */
const createSectionTriggers = () => {
  destroySectionTriggers();

  const scroller = getScroller();

  safeMenuItems.forEach((item, index) => {
    const target = document.getElementById(item.id);

    if (!target) {
      console.warn(`Секция с id="${item.id}" не найдена`);

      return;
    }

    const trigger = ScrollTrigger.create({
      id: `menu-section-${item.id}`,

      trigger: target,
      scroller: scroller || undefined,

      start: `top ${HEADER_HEIGHT}px`,
      end: `bottom ${HEADER_HEIGHT}px`,

      onEnter: () => {
        setActiveSection(item.id);
      },

      onEnterBack: () => {
        setActiveSection(item.id);
      },

      onLeave: () => {
        const nextItem = safeMenuItems[index + 1];

        if (nextItem) {
          setActiveSection(nextItem.id);
        }
      },

      onLeaveBack: () => {
        const previousItem = safeMenuItems[index - 1];

        setActiveSection(previousItem?.id || "");
      },

      invalidateOnRefresh: true,
    });

    sectionTriggers.push(trigger);
  });
};

/*
 * Плавная GSAP-прокрутка.
 */
const animateScroll = ({ scroller, targetTop, token, onComplete }) => {
  scrollTween?.kill();
  scrollTween = null;

  const currentTop = getScrollTop(scroller);

  const distance = Math.abs(targetTop - currentTop);

  const duration = gsap.utils.clamp(0.65, 1.65, distance / 1400);

  if (distance < 1) {
    setScrollTop(scroller, targetTop);

    ScrollTrigger.update();
    onComplete?.();

    return;
  }

  if (scroller) {
    scrollTween = gsap.to(scroller, {
      scrollTop: targetTop,

      duration,
      ease: "power2.inOut",
      overwrite: "auto",

      onUpdate: () => {
        ScrollTrigger.update();
      },

      onComplete: () => {
        scrollTween = null;

        if (token !== navigationToken) {
          return;
        }

        onComplete?.();
      },
    });

    return;
  }

  const proxy = {
    value: currentTop,
  };

  scrollTween = gsap.to(proxy, {
    value: targetTop,

    duration,
    ease: "power2.inOut",
    overwrite: "auto",

    onUpdate: () => {
      window.scrollTo(0, proxy.value);

      ScrollTrigger.update();
    },

    onComplete: () => {
      scrollTween = null;

      if (token !== navigationToken) {
        return;
      }

      onComplete?.();
    },
  });
};

/*
 * Финальная точная фиксация.
 */
const finalizeNavigation = ({ item, scroller, id, token, targetTop }) => {
  if (token !== navigationToken) {
    return;
  }

  const correctedTop = clampScrollTop(targetTop, scroller);

  setScrollTop(scroller, correctedTop);

  ScrollTrigger.update();
  synchronizeTrigger({ item });

  requestAnimationFrame(() => {
    if (token !== navigationToken) {
      return;
    }

    setScrollTop(scroller, correctedTop);

    ScrollTrigger.update();
    synchronizeTrigger({ item });

    requestAnimationFrame(() => {
      if (token !== navigationToken) {
        return;
      }

      setScrollTop(scroller, correctedTop);

      ScrollTrigger.update();
      synchronizeTrigger({ item });

      isNavigating = false;
      activeSection.value = id;
    });
  });
};

const scrollToSection = async (id) => {
  if (!id) {
    return;
  }

  const target = document.getElementById(id);

  if (!target) {
    console.warn(`Секция с id="${id}" не найдена`);

    return;
  }

  const currentItem = safeMenuItems.find((item) => item.id === id);

  if (!currentItem) {
    console.warn(`Пункт меню с id="${id}" не найден`);

    return;
  }

  const token = ++navigationToken;

  let scroller = getScroller();

  /*
   * Направление определяем до закрытия
   * мобильного меню.
   */
  const direction = getScrollDirection({
    target,
    scroller,
  });

  isNavigating = true;
  activeSection.value = id;

  await closeMenu();

  if (token !== navigationToken) {
    return;
  }

  scroller = getScroller();

  /*
   * Даём компонентам закончить обновление DOM.
   */
  await waitForRender();

  ScrollTrigger.refresh();
  ScrollTrigger.update();

  /*
   * После refresh start/end могут измениться,
   * поэтому ждём ещё один цикл отрисовки.
   */
  await waitForRender();

  if (token !== navigationToken) {
    return;
  }

  const headerHeight = header.value?.offsetHeight || HEADER_HEIGHT;

  const requestedTop = getAnchorTargetTop({
    target,
    item: currentItem,
    scroller,
    direction,
    headerHeight,
  });

  const targetTop = clampScrollTop(requestedTop, scroller);

  animateScroll({
    scroller,
    targetTop,
    token,

    onComplete: () => {
      finalizeNavigation({
        item: currentItem,
        scroller,
        id,
        token,
        targetTop,
      });
    },
  });

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}#${id}`,
  );
};

const handleEscape = async (event) => {
  if (event.key === "Escape") {
    await closeMenu();
  }
};

function cancelProgrammaticScroll() {
  if (!scrollTween) {
    return;
  }

  navigationToken += 1;

  scrollTween.kill();
  scrollTween = null;

  isNavigating = false;

  ScrollTrigger.update();
}

const unbindInterruptionEvents = () => {
  if (!interruptionTarget) {
    return;
  }

  interruptionTarget.removeEventListener(
    "touchstart",
    cancelProgrammaticScroll,
  );

  interruptionTarget.removeEventListener("wheel", cancelProgrammaticScroll);

  interruptionTarget = null;
};

const bindInterruptionEvents = () => {
  unbindInterruptionEvents();

  interruptionTarget = getScroller() || window;

  interruptionTarget.addEventListener("touchstart", cancelProgrammaticScroll, {
    passive: true,
  });

  interruptionTarget.addEventListener("wheel", cancelProgrammaticScroll, {
    passive: true,
  });
};

const handleResize = () => {
  if (resizeFrame) {
    cancelAnimationFrame(resizeFrame);
  }

  resizeFrame = requestAnimationFrame(async () => {
    if (window.innerWidth >= 1024) {
      await closeMenu();
    }

    createSectionTriggers();
    bindInterruptionEvents();

    ScrollTrigger.refresh();
    ScrollTrigger.update();

    resizeFrame = null;
  });
};

onMounted(async () => {
  await nextTick();

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  createSectionTriggers();
  bindInterruptionEvents();

  window.addEventListener("keydown", handleEscape);

  window.addEventListener("resize", handleResize);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.update();

    const initialHash = window.location.hash.slice(1);

    const initialItem = safeMenuItems.find((item) => item.id === initialHash);

    if (initialItem) {
      scrollToSection(initialItem.id);
    }
  });
});

onBeforeUnmount(() => {
  navigationToken += 1;

  destroySectionTriggers();

  scrollTween?.kill();
  scrollTween = null;

  if (resizeFrame) {
    cancelAnimationFrame(resizeFrame);
  }

  window.removeEventListener("keydown", handleEscape);

  window.removeEventListener("resize", handleResize);

  unbindInterruptionEvents();

  isNavigating = false;
});
</script>
