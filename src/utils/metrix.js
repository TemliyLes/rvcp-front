export const useDataLayer = () => {
  const pushDataLayer = (data) => {
    if (typeof window === "undefined") {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  };

  const formSubmitSuccess = () => {
    pushDataLayer({
      event: "form_submit_success",
    });
  };

  return {
    pushDataLayer,
    formSubmitSuccess,
  };
};
