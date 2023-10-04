<template>
  <div class="army-rules-container">
    <h2>{{army}} Army Rules</h2>
    <div class="army-rules__grid grid grid-cols-2 gap-4">

<div class="army-rules__grid-element" v-for="rule in armyRules">
    <h3>{{ rule.name }}</h3>
    <p>{{ rule.description }}</p>

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
