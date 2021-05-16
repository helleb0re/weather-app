const UI_localSettings = {
  form: document.forms["location-settings-form"],
  inputCity: document.getElementById("city"),
  warningText: document.querySelector(".warning__text"),
};

const UI_results = {
  resultsBox: document.querySelector(".results__slider-inner"),
};

const UI_slider = {
  slider: document.querySelector(".results__slider"),
  sliderBtnNext: document.querySelector(".results__btn-next"),
  sliderBtnPrev: document.querySelector(".results__btn-prev"),
  sliderInner: document.querySelector(".results__slider-inner"),
  sliderItems: document.querySelectorAll(".result"),
};

export { UI_localSettings, UI_results, UI_slider };
