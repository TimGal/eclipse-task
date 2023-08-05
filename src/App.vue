<template>
  <v-app>
    <v-main class="bg">
      <CurrencyInfoProvider/>
    </v-main>
  </v-app>
</template>

<script setup>
import CurrencyInfoProvider from '@/pages/currInfoProvider.vue'
import { useCurrencyStore } from './stores/CurrencyStore';
import { onMounted } from 'vue'

const currencyStore = useCurrencyStore();

onMounted(() => {
  currencyStore.fetchCurrencies();
});
</script>

<style>
@import url('./imports.css');

* {
  margin: 0;
	padding: 0;
	border: 0;
  font-family: 'Graphik LCG';
  font-weight: 500;
  font-style: normal;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
.bg {
	background-color: #f5f8f6;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
</style>
