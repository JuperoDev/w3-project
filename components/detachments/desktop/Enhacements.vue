<template>
        <div class="enhacements">
      <h3 class="text-2xl font-bebas mt-5 px-3">Enhacements</h3>
      <div class="" v-for="enhacement in enhacements">
        <div class="enhacement--element font-semibold ">
          {{ enhacement.name }}
          {{ enhacement.points }}
        </div>
        <div class="enhacement--element italic">
          {{ enhacement.lore }}
        </div>
        <div class="enhacement--element">
          {{ enhacement.description }}
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