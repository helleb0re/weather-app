import { UI_localSettings } from "../config/ui.config";

const { form, inputCity, warningText } = UI_localSettings;

export function showError(errorMsg) {
  form.reset();
  inputCity.classList.add("warning");
  warningText.textContent = errorMsg;
  warningText.style.display = "block";
  inputCity.addEventListener(
    "focus",
    () => {
      warningText.style.display = "none";
      inputCity.classList.remove("warning");
    },
    { once: true }
  );
}
