<template>
  <div class="datasheet-desktop__section-header m-3">
    <div
      class="datasheet-desktop__section-title bg-zinc-900 text-zinc-100 rounded-t-lg p-3"
    >
      <p>Wargear Options</p>
    </div>

    <div
      class="datasheet-desktop__leader--body my-3 pl-5"
      v-if="!!wargear?.length"
    >
      <div v-for="(wargearSet, index) in wargear" :key="index">
        <p>{{ wargearSet.description }}</p>
        <ul class="pt-2">
          <li
            v-for="(item, itemIndex) in wargearSet.items"
            :key="itemIndex"
            class="capitalize"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="!wargear?.length" class="px-5 py-2">
      <!-- If wargear is false, display "none" -->
      <ul>
        <li>None</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  wargear: Array,
});
</script>
