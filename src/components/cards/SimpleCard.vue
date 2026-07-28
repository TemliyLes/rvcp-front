<template>
  <div
    class="shadow-md grid place-items-center relative w-full h-full overflow-hidden"
  >
    <img
      class="absolute inset-0 w-full h-full object-cover z-0"
      :src="data?.poster"
      :alt="data?.alt"
    />

    <!-- затемнение снизу для читаемости -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
    ></div>

    <!-- контент прижат к низу -->
    <div class="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
      <h3 class="text-xl font-semibold mb-2 text-white!">
        {{ data?.title }}
      </h3>

      <p class="text-sm opacity-90 mb-4">
        {{ data?.description }}
      </p>

      <a
        v-if="data?.link"
        :href="data.link"
        :target="data.target || '_self'"
        class="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
      >
        Zobrazit realizaci
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
