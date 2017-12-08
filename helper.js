
import axios from 'axios';
const API_KEY = 'fc9e50ba954c37424ef33df15255ca1f';

export const fetchWeather = async ({city, countryCode}) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${API_KEY}`;
  return axios.get(url)
    .then( response => response.data);      
}
export const avg = (obj, total) => obj.reduce( (a, b) => a + b, 0)  / total;
export const toFarenheit = temp => ( (temp * 9/5) - 459.67 ).toFixed(2)
export const toCelsius = temp => ( temp - 273.15 ).toFixed(2)
export const toKelvin = temp => temp.toFixed(2);
