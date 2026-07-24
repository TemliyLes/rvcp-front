<template>
  <div class="relative h-dvh overflow-hidden">
    <video
      ref="videoRef"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      class="absolute inset-0 h-full w-full object-cover"
    >
      <source src="../../assets/video/furniture_hero.mp4" type="video/mp4" />
    </video>
  </div>

  <div class="h-dvh">123213</div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const videoRef = ref(null);

onMounted(() => {
  const video = videoRef.value;

  if (!video) return;

  // Дополнительная фиксация для Safari
  video.muted = true;
  video.defaultMuted = true;

  video.play().catch((error) => {
    console.error("Автовоспроизведение видео заблокировано:", error);
  });
});
</script>
