export function showWeatherData(
  {
    clouds: { all },
    main: { feels_like, humidity, pressure, temp },
    weather: [...weatherDescriptions],
    wind: { speed },
    name,
  },
  parentElem
) {
  const template = dataWeatherTemplate(
    name,
    weatherDescriptions,
    temp,
    feels_like,
    pressure,
    humidity,
    speed
  );
  parentElem.insertAdjacentHTML("beforeend", template);
}

function dataWeatherTemplate(
  name,
  weatherDescriptions,
  temp,
  feels_like,
  pressure,
  humidity,
  speed
) {
  let description = "";
  weatherDescriptions.forEach((item) => {
    let tmp = item.description[0].toUpperCase() + item.description.slice(1);
    description += tmp + ". ";
  });
  description.trimRight();

  return `
    <div class="result">
      <h3 class="result__title">${name}</h3>
      <div class="result__main-content">
        <img
          class="result__img"
          src="https://openweathermap.org/img/wn/${
            weatherDescriptions[0]["icon"]
          }@2x.png"
          alt=""
        />
        <p class="result__temp">${Math.round(temp)}&deg;C</p>
      </div>
      <p class="result__small-descr"><b>Feels like ${Math.round(
        feels_like
      )}&deg;C. ${description}</b></p>
      <p class="result__pressure">Pressure: ${pressure} hPa</p>
      <p class="result__humidity">Humidity: ${humidity} %</p>
      <p class="result__wind-speed">Wind speed: ${speed} m/s</p>
    </div>
  `;
}
