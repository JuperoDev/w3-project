<template>
  <div v-if="collectionData">
    <h2>{{ collectionData.detachmentName }}</h2>
    <div v-for="rule in collectionData.detachmentRule" :key="rule.name">
      <h3>Detachment rule:{{ rule.name }}</h3>
      <p><strong>Lore:</strong> {{ rule.lore }}</p>
      <p><strong>Description:</strong> {{ rule.description }}</p>
    </div>

    <!-- ----------------------------- -->
    <div class="enhacements">
      <h3 class="text-3xl mt-5">Enhacements</h3>
      <div class="" v-for="enhacement in collectionData.enhacements">
        <div class="enhacement--element font-semibold">
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

      <h3>Stratagems</h3>
      <div class="" v-for="stratagem in collectionData.stratagems">
        {{ stratagem }}
      </div>
      <!-- ------------ -->
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const replaceUnwantedCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9-]/g, "-");
};

const route = useRoute();
const faction = route.params.faction;
const army = route.params.army;
const detachment = route.params.detachment;
const sanitizedDetachment = replaceUnwantedCharacters(detachment);
const collectionData = ref(null);

const fetchCollectionData = async () => {
  try {
    const res = await fetch(
      `/faction/${faction}/${army}/detachment/${sanitizedDetachment}.json`
    );
    collectionData.value = await res.json();
    console.log("Fetched Collection Data:", collectionData.value);
  } catch (error) {
    console.error("Fetch Collection Data Error:", error);
  }
};

onMounted(() => {
  fetchCollectionData();
});
</script>

<style scoped>
.enhacement--element {
  margin-top: 10px;
}
</style>
