<template>
  <div>
    Attack Role: {{ attackRole }}
    <br />
    <div class="simulator-pick-preset grid grid-cols-3">
      <v-select
        label="Select Faction"
        :items="factions"
        v-model="selectedFaction"
      ></v-select>

      <v-select
        label="Select Army"
        :items="selectedFactionData?.army || []"
        v-model="selectedArmy"
        :disabled="!selectedFaction"
      ></v-select>

      <v-select
        label="Select Unit"
        :items="selectedArmyData?.units || []"
        v-model="selectedCollection"
        :disabled="!selectedArmy"
      ></v-select>
    </div>

    <div class="unit-attributes">
      <!-- <pre>{{
        selectedUnitAttributes
          ? JSON.stringify(selectedUnitAttributes, null, 2)
          : "            "
      }}</pre> KEEP IT FOR LATER-->

      <div class="unit-attributes">
  <p>Movement: {{ selectedUnitAttributes?.attributes[0]?.movement }}</p>
  <p>Toughness: {{ selectedUnitAttributes?.attributes[0]?.toughness }}</p>
  <p>Save: {{ selectedUnitAttributes?.attributes[0]?.save }}</p>
  <p>Wounds: {{ selectedUnitAttributes?.attributes[0]?.wounds }}</p>
  <p>Leadership: {{ selectedUnitAttributes?.attributes[0]?.leadership }}</p>
  <p>Objective Control: {{ selectedUnitAttributes?.attributes[0]?.objetiveControl }}</p>
  <p>Invulnerable Save: {{ selectedUnitAttributes?.attributes[0]?.invulnerableSave }}</p>
</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from "vue";

const props = defineProps({
  attackRole: Boolean,
});

const factions = ref([]);
const selectedFaction = ref("");
const selectedFactionData = ref("");
const selectedArmy = ref("");
const selectedArmyData = ref("");
const selectedCollection = ref("");
const selectedUnitAttributes = ref(null);

// Fetch the data from the JSON file based on the selected faction
const fetchFactionData = async () => {
  try {
    const response = await fetch(`/faction/${selectedFaction.value}/army.json`);
    selectedFactionData.value = await response.json();
    selectedArmy.value = ""; // Reset selected army when faction changes
  } catch (error) {
    console.error("Error fetching faction data:", error);
  }
};

// Fetch the data from the JSON file based on the selected army
const fetchArmyData = async () => {
  try {
    const response = await fetch(
      `/faction/${selectedFaction.value}/${selectedArmy.value}/collection.json`
    );
    selectedArmyData.value = await response.json();
    selectedCollection.value = ""; // Reset selected collection when army changes
  } catch (error) {
    console.error("Error fetching army data:", error);
  }
};

// Fetch the attributes of the selected unit based on its name
const fetchUnitAttributes = async () => {
  if (selectedCollection) {
    try {
      const response = await fetch(
        `/faction/${selectedFaction.value}/${selectedArmy.value}/collection/${selectedCollection.value}.json`
      );
      selectedUnitAttributes.value = await response.json();
    } catch (error) {
      console.error("Error fetching unit attributes:", error);
    }
  }
};

// Fetch the faction list data when the component is mounted
onMounted(async () => {
  try {
    const response = await fetch("/faction.json");
    const jsonData = await response.json();
    factions.value = jsonData.faction;
  } catch (error) {
    console.error("Error fetching faction list:", error);
  }
});

// Watch for changes in the selected faction and fetch corresponding data
watch(selectedFaction, fetchFactionData);

// Watch for changes in the selected army and fetch corresponding data
watch(selectedArmy, fetchArmyData);

// Watch for changes in the selected collection and fetch corresponding unit attributes
watch(selectedCollection, fetchUnitAttributes);
</script>

<style>
.unit-attributes {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  white-space: pre-wrap;
}
</style>
