<template>
        <div class="enhacements px-15">
      <h3 class="text-2xl font-bebas mt-5 px-3">Enhacements</h3>
      
      <div class="grid grid-cols-1 mt-5 md:grid-cols-2 md:gap-10 ">
      <div class="" v-for="enhacement in enhacements">
        <div class="enhacement--element font-semibold mb-4 flex">
          <div class="w-2/5"> {{ enhacement.name }}</div>
          <div class="w-2/5 "> </div>
          <div class="w-1/5"> {{ enhacement.points }} <span> pts </span></div>
          
          
        </div>
        <div class="enhacement--element italic mb-2">
          {{ enhacement.lore }}
        </div>
        <div class="enhacement--element mb-2">
          {{ enhacement.description }}
        </div>
      </div>
    </div>
      <!-- -------------- -->

      

      <!-- ------------ -->
    </div>

</template>

<script setup>

const props = defineProps({
    enhacements: Array
});
</script>