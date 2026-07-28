<template>
  <form
    class="grid h-full min-h-0 w-full grid-rows-[auto_auto_auto_auto_minmax(0,1fr)_auto] gap-3 overflow-hidden p-4 md:p-0"
    @submit.prevent="handleSubmit"
  >
    <!-- Jméno -->
    <div class="group">
      <label
        for="feedback-name"
        class="mb-1 block text-xs text-black/80 font-bold transition-colors group-focus-within:text-black"
      >
        Vaše jméno
      </label>

      <input
        id="feedback-name"
        v-model="formData.name"
        name="name"
        type="text"
        autocomplete="name"
        placeholder="Jak vás můžeme oslovovat"
        class="w-full border-0 border-b border-black/20 bg-transparent px-0 py-1.5 text-lg text-black outline-none transition-colors placeholder:text-black/35 focus:border-black md:text-base"
      />
    </div>

    <!-- Telefon a e-mail -->
    <div class="grid gap-4 md:grid-cols-2">
      <div class="group">
        <label
          for="feedback-phone"
          class="mb-1 block text-xs text-black/80 font-bold transition-colors group-focus-within:text-black"
        >
          Telefon
        </label>

        <input
          id="feedback-phone"
          v-model="formData.phone"
          name="phone"
          type="tel"
          autocomplete="tel"
          placeholder="+421 940 400 000"
          class="w-full border-0 border-b border-black/20 bg-transparent px-0 py-1.5 text-lg text-black outline-none transition-colors placeholder:text-black/35 focus:border-black md:text-base"
        />
      </div>

      <div class="group">
        <label
          for="feedback-email"
          class="mb-1 block text-xs text-black/80 font-bold transition-colors group-focus-within:text-black"
        >
          E-mail
        </label>

        <input
          id="feedback-email"
          v-model="formData.email"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="mail@example.com"
          class="w-full border-0 border-b border-black/20 bg-transparent px-0 py-1.5 text-lg text-black outline-none transition-colors placeholder:text-black/35 focus:border-black md:text-base"
        />
      </div>
    </div>

    <p class="text-[11px] leading-tight text-black/35">
      Uveďte telefon nebo e-mail — jeden kontaktní údaj stačí.
    </p>

    <!-- Plocha -->
    <div class="group">
      <label
        for="feedback-area"
        class="mb-1 block text-xs text-black/80 font-bold transition-colors group-focus-within:text-black"
      >
        Plocha prostoru
      </label>

      <div class="relative">
        <input
          id="feedback-area"
          v-model="formData.area"
          name="area"
          type="text"
          inputmode="decimal"
          placeholder="Například 85"
          class="w-full border-0 border-b border-black/20 bg-transparent px-0 py-1.5 pr-10 text-lg text-black outline-none transition-colors placeholder:text-black/35 focus:border-black md:text-base"
        />

        <span
          class="pointer-events-none absolute bottom-1.5 right-0 text-lg text-black/35"
        >
          m²
        </span>
      </div>
    </div>

    <!-- Popis -->
    <div class="group flex min-h-0 flex-col">
      <label
        for="feedback-description"
        class="mb-1 block shrink-0 text-xs text-black/80 font-bold transition-colors group-focus-within:text-black"
      >
        Co je potřeba zrekonstruovat
      </label>

      <textarea
        id="feedback-description"
        v-model="formData.description"
        name="description"
        placeholder="Stručně popište prostor a požadovaný výsledek ve dvou větách"
        class="min-h-0 w-full flex-1 resize-none overflow-hidden border-0 border-b border-black/20 bg-transparent px-0 py-1.5 text-lg leading-relaxed text-black outline-none transition-colors placeholder:text-black/35 focus:border-black md:text-base"
      />
    </div>

    <!-- Tlačítko -->
    <button
      type="submit"
      class="group flex min-w-[160px] items-center justify-between justify-self-end bg-[#111] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-black"
    >
      <span>Odeslat</span>

      <span
        class="ml-7 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({
  name: "",
  phone: "",
  email: "",
  area: "",
  description: "",
});

const handleSubmit = () => {
  const submittedData = {
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim(),
    area: formData.area.trim(),
    description: formData.description.trim(),
  };

  console.log("Data formuláře:", submittedData);
};
</script>
