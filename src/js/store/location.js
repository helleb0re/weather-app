import API_ENV from "../config/api.config";
import { showError } from "../views/showError";

const { apiKey, apiUrl } = API_ENV;

class Location {
  constructor() {
    this.dataForLastCity = {};
    this.dataArray = [];
    this.cityNameSet = new Set();
    this.errorObj = {
      cityNameError: false,
      cityInList: false,
      emptyInput: false,
    };
  }
  async getWeatherByCityName(cityName) {
    try {
      const response = await fetch(
        apiUrl + `q=${cityName}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        switch (response.status) {
          case 404:
            this.errorObj.cityNameError = true;
            return;
          case 400:
            this.errorObj.emptyInput = true;
            return;
        }
      }

      this.dataForLastCity = await response.json();

      if (this.cityNameSet.has(this.dataForLastCity.id)) {
        this.dataForLastCity = {};
        this.errorObj.cityInList = true;
        return;
      }

      this.dataArray.push(this.dataForLastCity);
      this.cityNameSet.add(this.dataForLastCity.id);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
}

const location = new Location();

export default location;
