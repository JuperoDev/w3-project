<template>
  <div class="datasheet-desktop__leader-container">
    <div class="datasheet-desktop__leader--header bg-slate-400 mx-3 p-1">
      <p>Leader</p>
    </div>

<div class="datasheet-desktop__leader--body my-3 pl-5 ">
    <p>This model can be attached to the following unit:</p>


    <ul class="my-2 pl-5">
      <div class="capitalize" v-for="lead in leader">
      <li>{{ lead }}</li>
      </div>

    </ul>

</div>
  </div>
</template>

<script setup>
const props = defineProps({
  leader: Array, Boolean
});
</script>