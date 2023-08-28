<template>
  <div class="p-10">
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



    <!-- ---------------------------  -->
    <div class= "py-5">
    <div
      class="  bg-zinc-100 border-zinc-200 hover:border-zinc-400 border-solid border-2 transition duration-300 p-10"
    >
    <p class="-mt-14 bg-zinc-100 px-5 w-24 text-zinc-600">Attacker</p>
    <div class=" px-4">
        Parent unit: <p class="capitalize">{{ selectedUnitAttributes.parentUnit  }}</p>
        <p>Number of miniatures</p>
        <p>Number of simumations</p>
        <p>Global modifiers</p>
        <div class="flex">
        <v-checkbox label="Attacker remained Stationary"></v-checkbox>
        <v-checkbox label="Defender in cover"></v-checkbox>
        <v-checkbox label="Within half range"></v-checkbox>
      </div>
      </div>
    </div>

  </div>

  <!-- ----------------------- -->
    <div class="checkBoolean" v-if="attackRole">
      <v-switch
        :label="isMeleeAttack ? 'Melee Attack' : 'Ranged Attack'"
        v-model="isMeleeAttack"
        :disabled="!selectedCollection"
      ></v-switch>
    </div>


    <div class="unit-attributes">
      <p v-if="selectedUnitAttributes">{{ selectedCollection }}</p>
      <p v-if="selectedUnitAttributes && selectedUnitAttributes.attributes">
        <span>Parent Unit: {{ selectedUnitAttributes.parentUnit }}</span>
        <br />
        <span
          >Toughness: {{ selectedUnitAttributes.attributes[0].toughness }}</span
        >
        <br />
        <span>Save: {{ selectedUnitAttributes.attributes[0].save }}</span>
        <br />
        <span>Wounds: {{ selectedUnitAttributes.attributes[0].wounds }}</span>
        <br />
        <span
          v-if="selectedUnitAttributes.attributes[0].invulnerableSave !== 0"
        >
          Invulnerable Save:
          {{ selectedUnitAttributes.attributes[0].invulnerableSave }}
        </span>
      </p>
    </div>

    <div class="melee-weapons" v-if="attackRole">
      <h3>{{ isMeleeAttack ? "Melee Weapons:" : "Ranged Weapons:" }}</h3>
      <div v-if="selectedUnitAttributes && selectedUnitAttributes.meleeWeapons">
        <div
          v-for="(weapon, index) in selectedUnitAttributes.meleeWeapons"
          :key="index"
        >
          <p>
            <strong>Weapon: {{ weapon.name }}</strong>
          </p>
          <p>Attacks: {{ weapon.attacks }}</p>
          <p>Weapon Skill: {{ weapon["weapons-skills"] }}</p>
          <p>Strength: {{ weapon.strength }}</p>
          <p>Armor Penetration: {{ weapon["armor-penetration"] }}</p>
          <p>Damage: {{ weapon.damage }}</p>
        </div>
      </div>
    </div>

 
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  attackRole: Boolean,
});

const factions = ref([]);
const selectedFaction = ref("");
const selectedFactionData = ref("");
const selectedArmy = ref("");
const selectedArmyData = ref("");
const selectedCollection = ref("");
const selectedUnitAttributes = ref("");
const isMeleeAttack = ref(true); // Default to melee attack

// Fetch functions...

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

// Watch functions...

// Watch for changes in the selected faction and fetch corresponding data
watch(selectedFaction, fetchFactionData);

// Watch for changes in the selected army and fetch corresponding data
watch(selectedArmy, fetchArmyData);

// Watch for changes in the selected collection and attack type, and fetch corresponding unit attributes
watch([selectedCollection, isMeleeAttack], () => {
  fetchUnitAttributes();
});

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
</script>

<style>
.unit-attributes {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  white-space: pre-wrap;
}

.melee-weapons {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.custom-switch .v-input--selection-controls__ripple {
  background-color: transparent !important;
}
</style>
