<template>
<div v-if="loading">Загрузка...</div>
<div v-else>
  <h2>Конвертер валют</h2>
  <v-row>
    <v-col cols="6">
      <v-autocomplete
        class="mt-4"
        v-model="fromCurrency"
        label="Выберите валюту"
        :items="currencyStore.convertCurrencies"
        variant="outlined"
        item-title="FullName"
        item-value="CharCode"
        :append-icon="'mdi-swap-horizontal'"
        @click:append="changeCurrencies"   
        >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="`${item.raw.Name} (${item.raw.CharCode})`"></v-list-item>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="6">
      <v-autocomplete
      class="mt-4"
      v-model="toCurrency"
      label="Выберите валюту"
      :items="currencyStore.convertCurrencies"
      variant="outlined"
      item-title="FullName"
      item-value="CharCode"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="`${item.raw.Name} (${item.raw.CharCode})`"></v-list-item>
        </template>
      </v-autocomplete>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model="amount"
        label="Введите сумму"
        variant="outlined"
        :append-icon="'s'"
        @input="calculateCurrency"
        />
    </v-col>
    <v-col cols="6">
      <h2 class="curr__result" v-if="convertedAmount">Результат: {{ convertedAmount === "0.00" ? 'запрашиваемая сумма < 0.01' : convertedAmount }}</h2>
    </v-col>
  </v-row>
  <v-btn class="curr__convert__btn" color="#02111B" @click="calculateCurrency">Конвертировать</v-btn>

</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCurrencyStore } from '@/stores/CurrencyStore';
import { apiService } from '@/api/apiService';
import MoneyLib from '@/lib/money'

const currencyStore = useCurrencyStore();
const loading = ref(true);
const amount = ref(1);
const fromCurrency = ref('RUB');
const toCurrency = ref('USD');
const convertedAmount = ref(0);
const moneyLib = MoneyLib;

onMounted(() => {
  initMoneyLib();
  currencyStore.currencyUnshift({
    "ID": "R13322111", // случайные цифры для уникальности, они не используются в коде
    "NumCode": "1123213213", // случайные цифры для уникальности, они не используются в коде
    "CharCode": "RUB",
    "Nominal": 1,
    "Name": "Российский рубль",
    "Value": 1,
    "Previous": 1,
    "FullName": "Российский рубль (RUB)"
  })
  loading.value = false;
});

const initMoneyLib = async () => {
  try {
    const response = await apiService.get('/latest.js')
    const data = response.data;
    moneyLib.fx.rates = data.rates
    moneyLib.fx.base = data.base
    calculateCurrency();
  } catch (error) {
    console.error(error)
  }
}

const calculateCurrency = () => {
  convertedAmount.value = moneyLib.fx(amount.value).from(fromCurrency.value).to(toCurrency.value).toFixed(2);
}
const changeCurrencies = () => {
  const CurrBuffer = toCurrency.value;
  toCurrency.value = fromCurrency.value;
  fromCurrency.value = CurrBuffer
  calculateCurrency()
}
watch(fromCurrency, () => {
  calculateCurrency();
})
watch(toCurrency, () => {
  calculateCurrency();
})
</script>

<style scoped>
.curr__result {
  line-height: 56px;
  padding-left: 1rem;
}

.curr__convert__btn {
  color: #eee;
}
</style>
