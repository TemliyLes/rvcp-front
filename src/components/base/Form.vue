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
        {{ t("form.name") }}
      </label>

      <input
        id="feedback-name"
        v-model="formData.name"
        name="name"
        type="text"
        autocomplete="name"
        :placeholder="t('form.namePlaceholder')"
        :class="[inputClass(errors.name), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-phone"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        {{ t("form.phone") }}
      </label>

      <input
        id="feedback-phone"
        v-model="formData.phone"
        @input="formatPhone"
        @keydown="protectPrefix"
        name="phone"
        type="tel"
        autocomplete="tel"
        :placeholder="t('form.phonePlaceholder')"
        :class="[inputClass(errors.phone), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-city"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        {{ t("form.city") }}
      </label>

      <input
        id="feedback-city"
        v-model="formData.city"
        name="city"
        type="text"
        autocomplete="address-level2"
        :placeholder="t('form.cityPlaceholder')"
        :class="[inputClass(errors.city), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-email"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        {{ t("form.email") }}
      </label>

      <input
        id="feedback-email"
        v-model="formData.email"
        @blur="validateEmail"
        name="email"
        type="email"
        autocomplete="email"
        :placeholder="t('form.emailPlaceholder')"
        :class="[inputClass(errors.email), defaultClass]"
      />
    </div>

    <div class="group">
      <label
        for="feedback-area"
        class="mb-1 block text-xs text-black/80 font-bold"
      >
        {{ t("form.area") }}
      </label>

      <div class="relative">
        <input
          id="feedback-area"
          v-model="formData.area"
          name="area"
          type="text"
          inputmode="decimal"
          :placeholder="t('form.areaPlaceholder')"
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
        {{ t("form.description") }}
      </label>

      <textarea
        id="feedback-description"
        v-model="formData.description"
        name="description"
        :placeholder="t('form.descriptionPlaceholder')"
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
        {{ loading ? t("form.sending") : t("form.submit") }}
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
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

import { useDataLayer } from "@/utils/metrix";
const { formSubmitSuccess } = useDataLayer();
const { t, locale } = useI18n();
const phonePrefix = computed(() => (locale.value === "cz" ? "+420" : "+421"));

const onFormSuccess = () => {
  formSubmitSuccess();
};
const formData = reactive({
  name: "",
  phone: phonePrefix.value,
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

  if (event.key === "Backspace" && input.selectionStart <= phonePrefix.value.length) {
    event.preventDefault();
  }
};

const formatPhone = () => {
  let digits = formData.phone.replace(/\D/g, "");

  const prefixDigits = phonePrefix.value.replace(/\D/g, "");

  if (!digits.startsWith(prefixDigits)) {
    digits = prefixDigits + digits.replace(/^0/, "");
  }

  digits = digits.slice(0, prefixDigits.length + 9);

  let result = phonePrefix.value;
  const rest = digits.slice(prefixDigits.length);

  if (rest.length > 0) {
    result += " " + rest.slice(0, 3);
  }

  if (rest.length > 3) {
    result += " " + rest.slice(3, 6);
  }

  if (rest.length > 6) {
    result += " " + rest.slice(6, 9);
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

  return !Object.values(errors).some(Boolean);
};
const resetForm = () => {
  Object.keys(formData).forEach((key) => {
    formData[key] = key === "phone" ? phonePrefix.value : "";
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
    showMessage(t("form.validationError"));

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

    showMessage(t("form.success"));

    resetForm();

    setTimeout(() => {
      onFormSuccess();
      emit("close");
    }, 1500);
  } catch (error) {
    console.error(error);

    showMessage(t("form.failure"));
  } finally {
    loading.value = false;
  }
};
</script>
