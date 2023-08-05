<template>
<div v-if="loading">Загрузка...</div>
<div v-else>
  <h2>Конвертер валют</h2>
  <v-autocomplete
      class="mt-4"
      v-model="fromCurrency"
      label="Выберите валюту"
      :items="currencyStore.currencies"
      variant="outlined"
      item-title="FullName"
      item-value="CharCode"
      >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="`${item.raw.Name} (${item.raw.CharCode})`"></v-list-item>
    </template>
  </v-autocomplete>
  <v-autocomplete
      class="mt-4"
      v-model="toCurrency"
      label="Выберите валюту"
      :items="currencyStore.currencies"
      variant="outlined"
      item-title="FullName"
      item-value="CharCode"
      >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" :title="`${item.raw.Name} (${item.raw.CharCode})`"></v-list-item>
    </template>
  </v-autocomplete>
  <input v-model="amount" type="number" placeholder="Сумма">
  <select v-model="fromCurrency">
    <option v-for="currency in currencies" :key="currency.id" :value="currency.charCode">{{ currency.Name }}</option>
  </select>
  <select v-model="toCurrency">
    <option v-for="currency in currencies" :key="currency.id" :value="currency.charCode">{{ currency.Name }}</option>
  </select>
  <button @click="changeCurrentCurrency">Конвертировать</button>
  <p v-if="convertedAmount">Результат: {{ convertedAmount }}</p>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCurrencyStore } from '@/stores/CurrencyStore';
import { apiService } from '@/api/apiService';
import MoneyLib from '@/lib/money'

const currencyStore = useCurrencyStore();
const loading = ref(true);
const amount = ref(0);
const fromCurrency = ref('');
const toCurrency = ref('');
const convertedAmount = ref(0);
const currencies = ref([]);
const moneyLib = MoneyLib;

onMounted(() => {
  changeCurrentCurrency();
  loading.value = false;
});

const changeCurrentCurrency = async () => {
  try {
    const response = await apiService.get('/latest.js')
    // console.log("response is:", response.data);
    const data = response.data;
    moneyLib.fx.rates = data.rates
    moneyLib.fx.base = data.base
    console.log(moneyLib.fx(100000).from("USD").to("RUB"))
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>

</style>
@/api/apiService