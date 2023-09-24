<template>
    <div>
      <div
        @click="toggleCollapse"
        class="lore-container border border-zinc-900 rounded-lg m-5 px-5 py-2 "
      >
        Lore
        <div class="italic mt-5 " v-if="isCollapsed">
          <p>
            {{ lore }}
          </p>
        </div>
      </div>
      <br/>
    </div>
  </template>

<script setup>

import { ref } from 'vue';

const props = defineProps({
  lore: String,
});


const isCollapsed = ref(false);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>