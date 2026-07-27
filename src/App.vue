<template>
  <Loader @complete="handleLoaderComplete" />

  <div id="teleports">
    <Modal :video="video" v-model="isModalOpen" />
    <ModalForm v-model="isFormOpen" />
  </div>

  <div id="wrap" ref="wrap" class="h-dvh overflow-x-hidden overflow-y-auto">
    <Header @open="openForm" :width="wrapWidth"><Menu /></Header>

    <main>
      <Title>2</Title>

      <Hero @open="openForm" :ready="animationsReady" />
      <div
        class="md:flex justify-between container pt-24 cursor-pointer px-4 md:px-0"
      >
        <Title>Vybrané realizace</Title>
        <Title tag="h3" class="grid place-items-center md:-mb-4 w-fit"
          ><a
            href="https://www.youtube.com/@ObkladaFinalizácia"
            class="flex gap-3"
            ><span>Zobrazit vše</span> <Arrow /></a
        ></Title>
      </div>
      <CardGrid @show="showModal" />

      <div class="container pt-24">
        <Title>O nás</Title>
        <About />
      </div>
      <FAQ />
      <Feedback />
      <Footer />
    </main>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayout } from "./composables/useLayout";

import Loader from "./components/base/Loader.vue";
import Header from "./components/base/Header.vue";
import Title from "./components/base/Title.vue";
import Hero from "./components/screens/Hero.vue";
import Arrow from "./components/icons/Arrow.vue";
import CardGrid from "./components/cards/Grid.vue";
import Modal from "./components/modal/Modal.vue";
import About from "./components/screens/About.vue";
import FAQ from "./components/screens/FAQ.vue";
import Feedback from "./components/screens/Feedback.vue";
import ModalForm from "./components/modal/ModalForm.vue";
import Footer from "./components/screens/Footer.vue";
import Menu from "./components/base/Menu.vue";

const wrap = ref(null);
const animationsReady = ref(false);

const { wrapWidth } = useLayout(wrap);

const video = ref();

const isModalOpen = ref(false);
const showModal = (val) => {
  video.value = val;
  requestAnimationFrame(() => {
    isModalOpen.value = true;
  });
};

const isFormOpen = ref(false);

const openForm = () => {
  // alert(1);
  isFormOpen.value = true;
};

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
