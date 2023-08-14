<template>
  <div>
    <div @click="toggleCollapse" class="toggleButton h-10 p-1 bg-slate-300 grid grid-cols-6 border-t-4 border-slate-50 font-semibold px-3">
      <div class="collapse1 col-span-5 uppercase">melee weapons</div>
      <div class="collapse2">
        <!-- here goes the dropdown button  -->
      </div>
    </div>
    <div v-if="isCollapsed">
      <!-- Content inside the collapsible div -->
    

     <div v-for="weapon in meleeWeapons" :key="weapon.name">
        <div class="weaponName bg-zinc-900 text-slate-50 m-2 p-3 rounded-lg font-semibold">
          <h2>{{weapon.name}}</h2>
        </div>

        <div class="allContainer grid grid-cols-5 gap-2 px-3 py-2 bg-zinc-300 font-semibold">
          <div class="flex items-center justify-center">A</div>
          <div class="flex items-center justify-center">WS</div>
          <div class="flex items-center justify-center">S</div>
          <div class="flex items-center justify-center">AP</div>
          <div class="flex items-center justify-center">D</div>
        </div>

        <div class="allContainer grid grid-cols-5 gap-2 px-3 py-2">
          <div class="flex items-center justify-center">{{ weapon.attacks }}</div>
          <div class="flex items-center justify-center">{{ weapon['weapons-skills'] }}</div>
          <div class="flex items-center justify-center">{{ weapon.strength }}</div>
          <div class="flex items-center justify-center">{{ weapon['armor-penetration'] }}</div>
          <div class="flex items-center justify-center">{{ weapon.damage }}</div>
        </div>

      </div>

    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  meleeWeapons: Array
});

const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
