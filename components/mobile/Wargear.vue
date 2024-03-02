<template lang="">
    <div>
        <div v-if="!!wargear?.length" class="px-5 py-2">
        <!-- Display wargear options -->

        <div v-for="(wargearSet, index) in wargear" :key="index" >
          <p >{{ wargearSet.description }}</p>
          <ul class="pt-2">
            <li v-for="(item, itemIndex) in wargearSet.items" :key="itemIndex" class="capitalize">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!wargear?.length" class="px-5 py-2 ">
        <!-- If wargear is false, display "none" -->
        <ul>
          <li>None</li> 
        </ul>
      </div>
    </div>
</template>
<script setup>
const props = defineProps({
  wargear:{
    type: Array,
    default: () => [],
  } 
});

</script>
