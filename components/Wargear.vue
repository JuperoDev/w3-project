<template lang="">
    <div>
        <div v-if="wargear">
        <!-- Display wargear options -->

        <div v-for="(wargearSet, index) in wargear" :key="index">
          <p>{{ wargearSet.description }}</p>
          <ul>
            <li v-for="(item, itemIndex) in wargearSet.items" :key="itemIndex">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <!-- If wargear is false, display "none" -->
        none
      </div>
    </div>
</template>
<script setup>
const props = defineProps({
  wargear: Array
});

</script>
