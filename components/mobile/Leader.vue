<template >
    <div>
        <p >This leader can be attached to the following unit:</p>
        <div v-for="lead in leader"  >
          <ul class="pt-2">
            <li  class="capitalize">
              {{ lead }}
            </li>
          </ul>
        </div>
        <p><i><small>{{ leaderInfo }}</small></i></p>
    </div>
</template>
<script setup>
const props = defineProps({
  leader: Array,
  leaderInfo: String
});
</script>
<style >
    
</style>