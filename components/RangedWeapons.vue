<template>
  <div>
   
      
        <!-- Content inside the collapsible div -->

        <div
          v-for="weapon in rangedWeapons"
          :key="weapon.name"
          class="newStats"
        >
          <div
            class="weaponName uppercase bg-zinc-900 text-slate-50 m-2 p-3 rounded-lg font-semibold"
          >
            <h2>{{ weapon.name }}</h2>
          </div>

          <div
            class="allContainer grid grid-cols-6 px-3 py-2 bg-zinc-300 font-semibold"
          >
            <div class="col flex justify-center items-center">RANGE</div>
            <div class="col flex justify-center items-center">A</div>
            <div class="col flex justify-center items-center">BS</div>
            <div class="col flex justify-center items-center">S</div>
            <div class="col flex justify-center items-center">AP</div>
            <div class="col flex justify-center items-center">D</div>
          </div>

          <div class="allContainer grid grid-cols-6 px-3 py-2">
            <div class="col flex justify-center items-center">
              {{ weapon.range }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon.attacks }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon["ballistic-skills"] }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon.strength }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon["armor-penetration"] }}
            </div>
            <div class="col flex justify-center items-center">
              {{ weapon.damage }}
            </div>
          </div>

          <div>
            <div class="flex flex-wrap">
              <span
                v-for="(modifier, index) in weapon.modifiers"
                :key="index"
                class="modifiers border-dashed border-2 mx-2 border-zinc-400 p-1 mr-2 mb-2"
              >
                {{ modifier }}
              </span>
            </div>
          </div>
        </div>
     
    
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  rangedWeapons: Array
});


</script>
