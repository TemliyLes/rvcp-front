<template>
  <Loader @complete="handleLoaderComplete" />

  <div id="teleports"></div>

  <div id="wrap" ref="wrap" class="h-dvh overflow-x-hidden overflow-y-auto">
    <Header :width="wrapWidth" />

    <main>
      <Title>2</Title>

      <Hero :ready="animationsReady" />

      <section class="grid min-h-dvh place-items-center bg-white text-black">
        Следующий блок
      </section>
    </main>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/base/Loader.vue";
import Header from "./components/base/Header.vue";
import Title from "./components/base/Title.vue";
import Hero from "./components/screens/Hero.vue";
import { useLayout } from "./composables/useLayout";

const wrap = ref(null);
const animationsReady = ref(false);

const { wrapWidth } = useLayout(wrap);

const handleLoaderComplete = async () => {
  await nextTick();

  requestAnimationFrame(() => {
    animationsReady.value = true;

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
};
</script>
