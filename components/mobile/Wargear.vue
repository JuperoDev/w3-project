<template>
  <div>
      <div v-if="filteredWargear.length" class="px-5 py-2">
      <!-- Display wargear options -->

      <div v-for="(wargearSet, index) in filteredWargear" :key="index">
        <p>{{ wargearSet.description }}</p>
        <ul class="pt-2">
          <li v-for="(item, itemIndex) in wargearSet.items" :key="itemIndex" class="capitalize">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!filteredWargear.length" class="px-5 py-2">
      <!-- If wargear is false, display "none" -->
      <ul>
        <li>None</li> 
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
wargear: {
  type: Array,
  default: () => [],
} 
});

const filteredWargear = computed(() => {
return props.wargear.filter(wargearSet => !wargearSet.hideInDatasheet);
});
</script>
