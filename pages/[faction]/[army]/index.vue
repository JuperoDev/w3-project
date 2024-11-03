<template>
  <div class="wrapper">
    <NavbarComponentsButtonGrid v-if="showNavbar" />

    <!-- Main army content -->
    <div v-if="armyData && Object.keys(armyData).length" class="army_main flex items-center justify-center bg-stone-100">
      <div class="collection-container w-full px-2 pt-2 pb-20 m-2 bg-white border border-black-500">
        <div class="collection-container__left-column">
          <div class="inner-container text-justify rounded-sm bg-white bg-opacity-70">
            <!-- Army Header with Logo and Name -->
            <div class="flex items-center justify-center font-bebas mb-10 mt-5 px-10 pt-5">
              <h2 class="text-4xl md:text-6xl font-bebas text-zinc-900 px-2 pt-5 text-center">
                {{ replaceHyphensWithSpaces(army) }}
              </h2>
            </div>

            <!-- Responsive grid for Army Rules and Detachments on large screens -->
            <div class="lg:grid lg:grid-cols-2 lg:gap-4">
              <!-- Army Rules Section -->
              <div class="armyrules-container">
                <div class="flex items-center justify-center my-1">
                  <h2 class="text-3xl text-zinc-800 font-bebas">Army Rules</h2>
                </div>
                <div class="collection-container__right-column--detachments grid grid-cols-1">
                  <DesktopArmyComponentsArmyRules :armyRules="armyData.rules" />
                </div>
              </div>

              <!-- Detachments Section -->
              <div class="detachment-container">
                <div class="flex items-center justify-center my-3">
                  <h2 class="text-3xl text-zinc-800 font-bebas">Detachments</h2>
                </div>
                <div class="collection-container__right-column--detachments grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                  <div
                    class="detachment-button-grid p-3"
                    v-for="detachment in sortedDetachments"
                    :key="detachment"
                  >
                    <nuxt-link :to="generateDetachment(faction, army, detachment)">
                      <v-btn class="max-button">
                        <p>{{ detachment }}</p>
                      </v-btn>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Unit List Section -->
        <div class="unit-list">
          <div class="flex items-center justify-center">
            <h2 class="text-3xl text-zinc-800 font-bebas my-3">Units</h2>
          </div>

          <!-- Display each filtered unit category -->
          <div v-for="category in filteredCategories" :key="category.name" class="unit-category">
            <div class="flex items-center justify-center">
              <h3 class="text-2xl text-zinc-700 font-bebas my-2">{{ category.displayName }}</h3>
            </div>
            <div class="flex items-center justify-center">
              <div v-if="category.units && category.units.length" class="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                <GeneralPurposeUnitButton
                  v-for="unit in sortedUnits(category.units)"
                  :key="unit.unitName"
                  :armyName="unit.unitName"
                  :destination="generateLink(faction, army, unit.unitName)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NotFound Component if data is missing -->
    <NotFound v-else />

    <GeneralPurposeFloatingFooter v-if="showNavbar" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import NotFound from "~/components/generalPurpose/NotFound.vue";

const armyData = ref({});
const showNavbar = ref(true);
const { faction, army } = useRoute().params;

// Function to replace unwanted characters with hyphens
const replaceUnwantedCharacters = (input) => input.replace(/[^a-zA-Z0-9-]/g, "-");

// Function to replace hyphens with spaces in the army title
const replaceHyphensWithSpaces = (input) => input.replace(/-/g, " ");

// Fetch army data on component mount
onMounted(async () => {
  try {
    const sanitizedFaction = replaceUnwantedCharacters(faction);
    const sanitizedArmy = replaceUnwantedCharacters(army);

    const res = await fetch(`/faction/${sanitizedFaction}/${sanitizedArmy}/collection.json`);
    if (!res.ok) {
      showNavbar.value = false; // Hide Navbar for 404
      return;
    }

    armyData.value = await res.json();

    // If no valid army data, hide navbar and show NotFound
    if (!armyData.value || Object.keys(armyData.value).length === 0) {
      showNavbar.value = false;
    }
  } catch (error) {
    console.error("Fetch Error: ", error);
    showNavbar.value = false; // Hide Navbar on error
  }
});

// Get the list of unit names from "units"
const unitNames = computed(() => new Set(armyData.value.units || []));

// Filtered categories based on the presence of unitName in units list
const filteredCategories = computed(() => {
  const categories = ["characters", "battleline", "dedicatedTransports", "other"];
  return categories.map((category) => ({
    name: category,
    displayName: category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, " $1"),
    units: (armyData.value[category] || []).filter(unit => unitNames.value.has(unit.unitName)),
  })).filter(category => category.units.length > 0);
});

// Sort units alphabetically within each category
const sortedUnits = (units) => (units ? [...units].sort((a, b) => a.unitName.localeCompare(b.unitName)) : []);

// Function to generate sanitized link to army units
const generateLink = (faction, army, unitName) => {
  const sanitizedUnitName = replaceUnwantedCharacters(unitName);
  return `/${faction}/${army}/${sanitizedUnitName}`;
};

// Function to generate sanitized links to detachment page
const generateDetachment = (faction, army, detachment) => {
  const sanitizedFaction = replaceUnwantedCharacters(faction);
  const sanitizedArmy = replaceUnwantedCharacters(army);
  const sanitizedDetachment = replaceUnwantedCharacters(detachment);
  return `/${sanitizedFaction}/${sanitizedArmy}/detachment/${sanitizedDetachment}`;
};

// Sort detachments alphabetically
const sortedDetachments = computed(() =>
  armyData.value?.detachments ? [...armyData.value.detachments].sort() : []
);
</script>

<style scoped>
.collection-container {
  max-width: 1000px;
}

img {
  transform: scale(90%);
}

.unit-list {
  padding-top: 20px;
}

.armyrules-container,
.detachment-container {
  margin-bottom: 20px;
}

.unit-category {
  margin-top: 20px;
}
</style>
