import axios from 'axios';

export const apiService = axios.create({
  baseURL: 'https://www.cbr-xml-daily.ru',
});

export const fetchCurrencies = () => {
  return apiService.get('/daily_json.js');
};