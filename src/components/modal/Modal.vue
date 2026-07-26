<template>
  <Teleport to="body">
    <div
      v-if="isRendered"
      ref="root"
      class="fixed inset-0 z-[9999] overflow-hidden [perspective:1400px]"
      role="dialog"
      aria-modal="true"
    >
      <div class="pointer-events-none absolute inset-0 z-0 grid grid-rows-6">
        <div
          v-for="item in 6"
          :key="item"
          ref="panels"
          class="bg-[#111] [will-change:transform]"
        ></div>
      </div>

      <button
        type="button"
        aria-label="Закрыть модальное окно"
        class="absolute inset-0 z-10 cursor-default"
        @click="handleBackdrop"
      />

      <div
        class="pointer-events-none relative z-20 flex min-h-dvh items-center justify-center p-6"
      >
        <div
          ref="modal"
          class="pointer-events-auto relative w-full max-w-[900px] bg-white text-[#111] shadow-2xl [backface-visibility:hidden] [transform-style:preserve-3d] [will-change:transform,opacity]"
        >
          <video controls="" autoplay="" muted class="w-full h-[70dvh]">
            <source :src="getSrc(video)" type="video/mp4" />
          </video>
          <button
            type="button"
            aria-label="Закрыть"
            class="absolute cursor-pointer right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full bg-[#111] text-white transition-transform duration-300 hover:rotate-90"
            @click="requestClose"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L16 16M16 2L2 16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";

import { gsap } from "gsap";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  video: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue", "opened", "closed"]);

const root = ref(null);
const modal = ref(null);
const panels = ref([]);
const isRendered = ref(false);

let timeline = null;
let scroller = null;
let previousOverflow = "";

const lockScroll = () => {
  scroller = document.querySelector("#wrap");

  if (!scroller) return;

  previousOverflow = scroller.style.overflowY;
  scroller.style.overflowY = "hidden";
};

const unlockScroll = () => {
  if (!scroller) return;

  scroller.style.overflowY = previousOverflow;
  scroller = null;
};

const getSrc = (path) => {
  if (!path) return "";

  return new URL(path, window.location.origin).href;
};

const handleKeydown = (event) => {
  if (event.key === "Escape" && props.closeOnEscape) {
    requestClose();
  }
};

const openModal = async () => {
  timeline?.kill();

  isRendered.value = true;

  await nextTick();

  lockScroll();

  window.addEventListener("keydown", handleKeydown);

  gsap.set(root.value, {
    autoAlpha: 1,
  });

  gsap.set(panels.value, {
    scaleX: 0,
    transformOrigin: (index) => (index % 2 === 0 ? "0% 50%" : "100% 50%"),
  });

  gsap.set(modal.value, {
    autoAlpha: 0,
    y: 60,
    z: -180,
    scale: 0.92,
    rotationX: 10,
    transformOrigin: "50% 50%",
  });

  timeline = gsap.timeline({
    onComplete: () => {
      emit("opened");
    },
  });

  timeline
    .to(panels.value, {
      scaleX: 1,
      duration: 0.7,
      stagger: 0.055,
      ease: "power4.inOut",
    })
    .to(
      modal.value,
      {
        autoAlpha: 1,
        y: 0,
        z: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.75,
        ease: "power3.out",
      },
      "-=0.25",
    );
};

const closeModal = () => {
  if (!isRendered.value) return;

  timeline?.kill();

  gsap.set(panels.value, {
    transformOrigin: (index) => (index % 2 === 0 ? "100% 50%" : "0% 50%"),
  });

  timeline = gsap.timeline({
    onComplete: () => {
      isRendered.value = false;

      unlockScroll();

      window.removeEventListener("keydown", handleKeydown);

      emit("closed");
    },
  });

  timeline
    .to(modal.value, {
      autoAlpha: 0,
      y: -40,
      z: -150,
      scale: 0.94,
      rotationX: -8,
      duration: 0.4,
      ease: "power2.in",
    })
    .to(
      panels.value,
      {
        scaleX: 0,
        duration: 0.65,
        stagger: {
          each: 0.05,
          from: "end",
        },
        ease: "power4.inOut",
      },
      "-=0.1",
    );
};

const requestClose = () => {
  emit("update:modelValue", false);
};

const handleBackdrop = () => {
  if (props.closeOnBackdrop) {
    requestClose();
  }
};

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      openModal();
    } else {
      closeModal();
    }
  },
  {
    immediate: true,
  },
);

onBeforeUnmount(() => {
  timeline?.kill();

  unlockScroll();

  window.removeEventListener("keydown", handleKeydown);
});
</script>
