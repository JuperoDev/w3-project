<template>
    <div
          class="datasheet-desktop__section-header"
        >
        <div class="datasheet-desktop__section-header bg-slate-400 m-3">
          <p>{{additionalParameter.title}}</p>
        </div>
        <div v-for="(ability, index) in additionalParameter.abilities" :key="index">
      <h3>{{ ability.name }}</h3>
      <p>{{ ability.description }}</p>
    </div>
      </div>
</template>

<script setup>

const props = defineProps({
  additionalParameter: Object
});
</script>
