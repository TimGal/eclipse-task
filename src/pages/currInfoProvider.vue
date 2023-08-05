<script setup>
import { ref } from 'vue';
import CurrList from '@/components/CurrList.vue';
import CurrConverter from '@/components/CurrConverter.vue';
const tab = ref(1);

// function increment() {
//   count.value++
// }
</script>
<template>
  <div class="converter__wrapper">
    <v-card class="pa-4">
      <v-tabs
        v-model="tab"
        color="#60A561"
        align-tabs="center"
      >
        <v-tab :value="1">Список валют</v-tab>
        <v-tab :value="2">Конвертер валют</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="1">
          <CurrList />
        </v-window-item>
        <v-window-item :value="2">
          <CurrConverter />
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<style scoped>
.converter__wrapper {
  position: relative;
  width: 90vw;
  max-width: 1200px;
  margin: 80px auto 0;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
<!--  Попытка подключить pug не удалась, 
      следующие модули не решили проблему совместимости 
      Pug и <script setup

      npm add --save-dev eslint-plugin-vue-pug-sfc
      npm install --save-dev eslint@8 eslint-plugin-vue eslint-plugin-vue-pug
-->

<!-- <template lang="pug">
button(@click="increment") Нажми
CurrList
Converter
</template> -->