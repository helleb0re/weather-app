import location from "./store/location";
import { UI_localSettings, UI_results, UI_slider } from "./config/ui.config";
import { showWeatherData } from "./views/weatherCard";
import "./views/slider";
import "../styles/style.scss";
import { showError } from "./views/showError";
import {
  initSlider,
  amountItemSlider,
  setSliderPosStart,
} from "./views/slider";

const { form, inputCity, warningText } = UI_localSettings;
const { resultsBox } = UI_results;
const {
  sliderBtnNext,
  sliderBtnPrev,
  slider,
  sliderInner,
  sliderItems,
} = UI_slider;

document.addEventListener("DOMContentLoaded", () => {
  setSliderLength();

  window.addEventListener("resize", setSliderLength);

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onSubmit();
  });
});

// Handlers
async function onSubmit() {
  try {
    await location.getWeatherByCityName(inputCity.value);
    form.reset();

    if (location.errorObj.cityNameError) {
      showError("No matching location found!");
      location.errorObj.cityNameError = false;
      return;
    } else if (location.errorObj.cityInList) {
      showError("This city is already on the list!");
      location.errorObj.cityInList = false;
      return;
    } else if (location.errorObj.emptyInput) {
      showError("Input field is empty!");
      location.errorObj.emptyInput = false;
      return;
    }

    showWeatherData(location.dataForLastCity, resultsBox);
    if (location.dataArray.length > amountItemSlider) {
      sliderBtnNext.style.display = "block";
      sliderBtnPrev.style.display = "block";
    }
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

function setSliderLength() {
  if (1200 <= window.screen.width) {
    setSliderPosStart();
    slider.style.width = 1080 + "px";
    initSlider(1080, 4);
  } else if (950 <= window.screen.width && window.screen.width <= 1200) {
    setSliderPosStart();
    slider.style.width = 810 + "px";
    initSlider(810, 3);
  } else if (700 <= window.screen.width && window.screen.width <= 950) {
    setSliderPosStart();
    slider.style.width = 540 + "px";
    initSlider(540, 2);
  } else if (window.screen.width <= 700) {
    setSliderPosStart();
    slider.style.width = 270 + "px";
    initSlider(270, 1);
  }
  if (sliderInner.children.length > amountItemSlider) {
    sliderBtnNext.style.display = "block";
    sliderBtnPrev.style.display = "block";
  } else {
    sliderBtnNext.style.display = "none";
    sliderBtnPrev.style.display = "none";
  }
}
