<template>
  <div>
    <!-- Fallback message if no data is loaded -->
    <div v-if="!data || !data.faction" class="text-center  text-gray-500 mt-10">
      No armies available to display.
    </div>

    <!-- Display armies if data is loaded -->
    <div v-if="data && data.faction" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div v-for="army in data.faction" :key="army.name" class="">
        <nuxt-link :to="`/${army.name}`">
          <GeneralPurposeArmyButton
            :armyName="army.name"
            :description="army.description"
            :imageUrl="army.imageUrl"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const data = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/faction.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    data.value = await res.json();
    console.log("Fetched data:", data.value); // Log the fetched data
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>

<style scoped>






.text-center {
  text-align: center;
}


.text-gray-500 {
  color: #6b7280;
}
</style>
