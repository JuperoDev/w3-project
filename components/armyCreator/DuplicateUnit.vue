<template>
    <div>
        <span 
      class="text-sm text-blue-500 cursor-pointer hover:underline" 
      @click="duplicateUnit"
    >
      Duplicate
    </span>
    </div>
</template>

<script setup>
const emit = defineEmits(['duplicate-unit']);

const duplicateUnit = () => {
  emit('duplicate-unit');
};
</script>
