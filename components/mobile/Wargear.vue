<template>
  <div>
      <div v-if="filteredWargear.length" class=" py-2">
      <!-- Display wargear options -->

      <div v-for="(wargearSet, index) in filteredWargear" :key="index">
        <p>{{ wargearSet.description }}</p>
        <div class="mobile-wargear__ul-wrapper bg-zinc-200 px-4 py-2  my-3 mr-5">
        <ul>
          <li
            v-for="(item, itemIndex) in wargearSet.items"
            :key="itemIndex"
            class="capitalize "
          >
            {{ item }}
          </li>
        </ul>
        </div>
        <hr class="my-3"/>
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


<style scoped>

li::before {
  content: "■";
  list-style-type: square;
  color: rgb(218, 0, 0);
  display: inline-block;
  width: 1em;
  margin-right: 1em;

  font-size: 15px;
}

ul {
  /* min-width: 700px; */
  list-style: none;
}


</style>