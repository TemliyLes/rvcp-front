<template>
  <div id="teleports"></div>
  <div id="wrap" ref="wrap">
    <Loader />
    <header>
      <Header :width="wrapWidth" />
    </header>

    <main>
      <Title>2</Title>
      <Hero />
    </main>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Title from "./components/base/Title.vue";
import Hero from "./components/screens/Hero.vue";
import Header from "./components/base/Header.vue";
import { useLayout } from "./composables/useLayout";
import Loader from "./components/base/Loader.vue";

const wrap = ref();

const { wrapWidth, scrollbarWidth } = useLayout(wrap);

onMounted(() => {
  // console.log(wrapWidth);
});
</script>
