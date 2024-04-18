<template>
  <div class="army-rules-container">
  
    

    
<div class=" containerpanel  mx-2 my-5">
  <v-expansion-panels >
     
        <v-expansion-panel v-for="rule in armyRules"
        :key="rule.id" class="rules_expansion my-1" >

        <v-expansion-panel-title>
            <div class="uppercase font-semibold">{{ rule.name }}</div>
          </v-expansion-panel-title>
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



</style>
