<template>
  <div class="army-rules-container">
    <h2 class="text-3xl uppercase px-10">{{ army }} Army Rules</h2>
    <div class="army-rules__grid grid grid-cols-2 gap-4">
      <div class="army-rules__grid-element p-10" v-for="rule in armyRules">
        <h4 class="text-2xl uppercase">{{ rule.name }}</h4>
        <p class="mt-5">{{ rule.description }}</p>
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
