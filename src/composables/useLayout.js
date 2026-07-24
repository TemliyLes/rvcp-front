import { ref, readonly, onMounted, onBeforeUnmount, nextTick } from "vue";

const wrapWidth = ref(0);
const scrollbarWidth = ref(0);

export function useLayout(wrapRef = null) {
  let resizeObserver = null;

  const updateLayout = () => {
    const element = wrapRef?.value;

    if (!element) return;

    // Ширина внутренней области без scrollbar
    wrapWidth.value = element.clientWidth;

    // Ширина scrollbar
    scrollbarWidth.value = element.offsetWidth - element.clientWidth;
  };

  if (wrapRef) {
    onMounted(async () => {
      await nextTick();

      updateLayout();

      resizeObserver = new ResizeObserver(() => {
        updateLayout();
      });

      resizeObserver.observe(wrapRef.value);

      window.addEventListener("resize", updateLayout);
    });

    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateLayout);
    });
  }

  return {
    wrapWidth: readonly(wrapWidth),
    scrollbarWidth: readonly(scrollbarWidth),
    updateLayout,
  };
}
