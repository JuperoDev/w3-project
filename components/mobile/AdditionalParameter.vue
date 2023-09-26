<template>
    <div
          class="datasheet-desktop__section-header"
        >

        <div v-for="(ability, index) in additionalParameter.abilities" :key="index" class="px-5 py-2">
      <h3 class="font-semibold">{{ ability.name }}</h3>
      <p>{{ ability.description }}</p>
    </div>
      </div>
</template>

<script setup>

const props = defineProps({
  additionalParameter: Object
});
</script>
