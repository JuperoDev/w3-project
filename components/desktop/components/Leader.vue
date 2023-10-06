<template>
  <div class="datasheet-desktop__leader-container">
    <div class="datasheet-desktop__leader--header bg-zinc-900 text-zinc-100 rounded-t-lg p-3 mx-3 ">
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