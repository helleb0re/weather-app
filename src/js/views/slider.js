import { UI_slider } from "../config/ui.config";
import location from "../store/location";

let sliderLength;
let amountItemSlider;
let offset = 0;

export function initSlider(length, amountItem) {
  sliderLength = length;
  amountItemSlider = amountItem;
}

const { sliderBtnNext, sliderBtnPrev, sliderInner } = UI_slider;

sliderBtnNext.addEventListener("click", () => {
  offset += sliderLength;

  if (
    offset >
    (Math.ceil(location.dataArray.length / amountItemSlider) - 1) * sliderLength
  ) {
    offset = 0;
  }

  sliderInner.style.left = -offset + "px";
});

sliderBtnPrev.addEventListener("click", () => {
  offset -= sliderLength;

  if (offset < 0) {
    offset =
      (Math.ceil(location.dataArray.length / amountItemSlider) - 1) *
      sliderLength;
  }

  sliderInner.style.left = -offset + "px";
});

function setSliderPosStart() {
  sliderInner.style.left = 0;
}

export { amountItemSlider, setSliderPosStart };
