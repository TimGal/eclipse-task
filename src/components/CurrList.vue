<template>
    <v-row no-gutters>
      <v-col cols="6">
        <v-autocomplete
          class="mt-4"
          v-model="selectedCurrency"
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
      </v-col>
      <v-col cols="6" class="btn__group">
        <v-btn @click="clearSelectedCurrency">Сбросить выбранную валюту</v-btn>
        <v-btn @click="reversingCurrencyList">Переключить</v-btn>
      </v-col>
    </v-row>
    <div v-if="currencyStore.loading">Загрузка...</div>
    <div class="curr__group" v-else>
      <div class="curr__item" v-for="currency in currencyStore.filteredCurrencies" :key="currency.ID">
        <h2 class="curr__text" v-if="!reverseCurrency" >
          {{ currencyExpression(currency.CharCode, currency.Value) }}
          <span class="curr_diff" :class="{green: currency.Value > currency.Previous, red: currency.Value < currency.Previous }">{{ currency.Value > currency.Previous ? '▲' : '▼' }} {{ Math.abs(currency.Previous - currency.Value).toFixed(2) }}</span>
        </h2>
        <h2 class="curr__text" v-else-if="reverseCurrency">
          {{ currencyRExpression(currency.CharCode, currency.Value) }}
          <span class="curr_diff" :class="{green: currency.Value > currency.Previous, red: currency.Value < currency.Previous }">{{ currency.Value > currency.Previous ? '▲' : '▼' }} {{ Math.abs(currency.Previous - currency.Value).toFixed(2) }}</span>
        </h2>
        <h2 class="curr__text" v-else>Валюта {{ currency.Name }} не загрузилась</h2>
        <v-tooltip
          activator="parent"
          location="top"
        >{{ currency.Name }}</v-tooltip>
      </div>
      <!-- <h2>1 {{ currency.Name }} -  {{ currency.Value.toFixed(2) }} рублей </h2> -->
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCurrencyStore } from '@/stores/CurrencyStore';
const currencyStore = useCurrencyStore();
const selectedCurrency = ref('');
const reverseCurrency = ref(false)

watch(selectedCurrency, () => {
  currencyStore.filter(selectedCurrency.value)
})

const clearSelectedCurrency = () => {
  selectedCurrency.value = ''
}

// const CurrencyExpression = (name, value) => {
//   return !reverseCurrency.value ? `1 ${name} - ${value.toFixed(2)} RUB` : `${(1 / value).toFixed(2)} RUB - 1 ${name}`
// }
const currencyExpression = (name, value) => {
  return `1 ${name} - ${value.toFixed(2)} RUB`
}

const currencyRExpression = (name, value) => {
  return `${(1 / value).toFixed(2)} RUB - 1 ${name}`
}

const reversingCurrencyList = () => {
  if (!reverseCurrency.value) {
    reverseCurrency.value = true
  } else {
    reverseCurrency.value = false
  }
}; 
</script>

<style scoped>
.curr__group {
  display: flex;
  column-gap: 1rem;
  row-gap: 1rem;
  flex-wrap: wrap;
}
.curr__item {
  border: 1px solid black;
  padding: 1rem;
  border-radius: 0.5rem;
  width: calc((100% - 2rem) / 3);
}
.curr__text {
  font-weight: 300;
  text-align: center;
}
.curr_diff {
font-weight: 400;
}
.btn__group {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>