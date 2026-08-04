<template>
  <form
    class="grid h-full min-h-0 w-full grid-rows-[auto_auto_auto_auto_auto_minmax(0,1fr)_auto] gap-3 overflow-hidden p-4 md:p-0"
    @submit.prevent="handleSubmit"
  >
    <div class="group">
      <label
        for="feedback-name"
        class="mb-1 block text-xs text-black/80 font-bold"
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
        :class="[inputClass(errors.name), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-phone"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        Telefon
      </label>

      <input
        id="feedback-phone"
        v-model="formData.phone"
        @input="formatPhone"
        @keydown="protectPrefix"
        name="phone"
        type="tel"
        autocomplete="tel"
        placeholder="+421 940 400 000"
        :class="[inputClass(errors.phone), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-city"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        Město realizace prací
      </label>

      <input
        id="feedback-city"
        v-model="formData.city"
        name="city"
        type="text"
        autocomplete="address-level2"
        placeholder="Například Praha"
        :class="[inputClass(errors.city), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-email"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        E-mail
      </label>

      <input
        id="feedback-email"
        v-model="formData.email"
        @blur="validateEmail"
        name="email"
        type="email"
        autocomplete="email"
        placeholder="mail@example.com"
        :class="[inputClass(errors.email), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-area"
        class="mb-1 block text-xs text-black/80 font-bold"
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
          :class="[inputClass(errors.area), defaultClass, 'pr-10']"
        />

        <span
          class="pointer-events-none absolute bottom-1.5 right-0 text-lg text-black/35"
        >
          m²
        </span>
      </div>
    </div>

    <div class="group flex min-h-0 flex-col">
      <label
        for="feedback-description"
        class="mb-1 block shrink-0 text-xs text-black/80 font-bold"
      >
        Co je potřeba zrekonstruovat
      </label>

      <textarea
        id="feedback-description"
        v-model="formData.description"
        name="description"
        placeholder="Stručně popište prostor a požadovaný výsledek ve dvou větách"
        :class="[
          inputClass(errors.description),
          defaultClass,
          'flex-1 resize-none overflow-hidden leading-relaxed',
        ]"
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="group flex min-w-[160px] items-center justify-between justify-self-end bg-[#111] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-black disabled:opacity-50"
    >
      <span>
        {{ loading ? "Odesílání..." : "Odeslat" }}
      </span>

      <span
        class="ml-7 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </button>

    <div
      v-if="message"
      class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-[#111] px-6 py-3 text-sm text-white shadow-xl"
    >
      {{ message }}
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";

const formData = reactive({
  name: "",
  phone: "+4",
  city: "",
  email: "",
  area: "",
  description: "",
});

const defaultClass = "text-[12px]!";

const errors = reactive({
  name: false,
  phone: false,
  city: false,
  email: false,
  area: false,
  description: false,
});

const emit = defineEmits(["close"]);

const loading = ref(false);
const message = ref("");

const inputClass = (error) => [
  "w-full border-0 border-b bg-transparent px-0 py-1.5 text-lg text-black outline-none transition-colors placeholder:text-black/35 md:text-base",
  error ? "border-red-500" : "border-black/20 focus:border-black",
];

const protectPrefix = (event) => {
  const input = event.target;

  if (event.key === "Backspace" && input.selectionStart <= 2) {
    event.preventDefault();
  }
};

const formatPhone = () => {
  let digits = formData.phone.replace(/\D/g, "");

  if (!digits.startsWith("4")) {
    digits = "4" + digits;
  }

  digits = digits.slice(0, 12);

  let result = "+4";

  const rest = digits.slice(1);

  if (rest.length > 0) {
    result += rest.slice(0, 2);
  }

  if (rest.length > 2) {
    result += " " + rest.slice(2, 5);
  }

  if (rest.length > 5) {
    result += " " + rest.slice(5, 8);
  }

  if (rest.length > 8) {
    result += " " + rest.slice(8, 11);
  }

  formData.phone = result;
};

const validatePhone = () => {
  const phone = formData.phone.trim();

  errors.phone = phone.length <= 5;

  return !errors.phone;
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  errors.email = !emailRegex.test(formData.email.trim());

  return !errors.email;
};

const validateForm = () => {
  errors.name = formData.name.trim().length === 0;
  errors.city = formData.city.trim().length === 0;
  errors.area = formData.area.trim().length === 0;
  errors.description = formData.description.trim().length === 0;

  validatePhone();
  validateEmail();

  console.log("PHONE VALUE:", formData.phone);
  console.log("PHONE DIGITS:", formData.phone.replace(/\D/g, ""));

  console.log("EMAIL VALUE:", formData.email);

  console.log({
    phoneError: errors.phone,
    emailError: errors.email,
  });

  return !Object.values(errors).some(Boolean);
};
const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = key === "phone" ? "+4" : "";
  });

  Object.keys(errors).forEach((key) => {
    errors[key] = false;
  });
};

const showMessage = (text) => {
  message.value = text;

  setTimeout(() => {
    message.value = "";
  }, 4000);
};

const handleSubmit = async () => {
  if (!validateForm()) {
    showMessage("Zkontrolujte telefon a e-mail");

    return;
  }

  loading.value = true;

  try {
    const response = await fetch("/send.php", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: formData.name.trim(),

        phone: formData.phone.trim(),

        city: formData.city.trim(),

        email: formData.email.trim(),

        area: formData.area.trim(),

        description: formData.description.trim(),
      }),
    });

    const text = await response.text();

    console.log("SERVER:", text);

    const result = JSON.parse(text);

    if (!result.success) {
      throw new Error(result.message || "Server error");
    }

    showMessage("Žádost byla odeslána");

    resetForm();

    setTimeout(() => {
      emit("close");
    }, 1500);
  } catch (error) {
    console.error(error);

    showMessage("Nepodařilo se odeslat žádost");
  } finally {
    loading.value = false;
  }
};
</script>
