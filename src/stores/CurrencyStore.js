import { defineStore } from "pinia";
import { fetchCurrencies } from '@/api/apiService'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
      currencies: [],
      filteredCurrencies: [],
      loading: true,
    }),
  actions: {
    async fetchCurrencies() {
      try {
        const data = await fetchCurrencies();
        this.filteredCurrencies = this.currencies = Object.values(data.data.Valute).map((item) => ({...item, FullName: `${item.Name} (${item.CharCode})`}));
        this.loading = false;
      } catch (error) {
        console.error(error);
        // Обработка ошибки при получении курсов валют
      }
    },
    filter(value) {
      this.filteredCurrencies = this.currencies.filter(
        currency => currency.FullName.includes(value)
      )
    }
  },
})