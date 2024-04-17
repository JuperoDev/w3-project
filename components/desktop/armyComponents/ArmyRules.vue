<template>
  <div class="army-rules-container">
    <h2 class="text-3xl uppercase px-10"> Army Rules</h2>
    <div class="army-rules__grid grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="army-rules__grid-element p-10" v-for="rule in armyRules" :key="rule.id">
        <h4 class="text-2xl uppercase py-2">{{ rule.name }}</h4>
        <p class="italic" v-html="rule.lore"></p>
        <p class="mt-5" v-html="rule.description"></p>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const props = defineProps({
  armyRules: Array,
});

// params
const route = useRoute();
const army = route.params.army;
</script>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: 500;
  color: #191919;
  text-transform: uppercase;
  
}

</style>