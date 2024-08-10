<template>
  <div class="datasheet-desktop__section-header m-3">
    <div
      class="datasheet-desktop__section-title bg-zinc-900 text-zinc-100 rounded-t-lg p-3"
    >
      <p>Wargear Options</p>
    </div>

    <div
      class="datasheet-desktop__leader--body my-3 pl-5"
      v-if="filteredWargear.length"
    >
      <div v-for="(wargearSet, index) in filteredWargear" :key="index">
        <p>{{ wargearSet.description }}</p>
        <div class="desktop-wargear__ul-wrapper bg-zinc-200 px-4 py-2  my-3 mr-5">
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
    default: () => []
  },
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