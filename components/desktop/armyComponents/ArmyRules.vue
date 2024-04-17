<template>
  <div class="army-rules-container">
    <h2 class="text-3xl uppercase px-10">Army Rules</h2>
    

    
<div class=" containerpanel  mx-2 my-5">
  <v-expansion-panels v-for="rule in armyRules"
        :key="rule.id">
     
        <v-expansion-panel class="rules_expansion" :title="rule.name.toUpperCase()">
          <v-expansion-panel-text>
          
             <p class="italic" v-html="rule.lore"></p> 
              <p class="mt-5" v-html="rule.description"></p> 
           
          </v-expansion-panel-text>
        </v-expansion-panel>
      
    </v-expansion-panels>
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


.containerpanel {
 
}
</style>
