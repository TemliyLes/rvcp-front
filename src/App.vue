<template>
  <div id="teleports"></div>
  <div id="wrap" ref="wrap">
    <header><Header :width="wrapWidth" /></header>
    {{ wrapWidth }}
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

const wrap = ref();

const { wrapWidth, scrollbarWidth } = useLayout(wrap);

onMounted(() => {
  console.log(wrapWidth);
});
</script>
