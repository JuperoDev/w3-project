<template>
  <div class="wrapper">
    <div class="collection-container grid grid-cols-12 gap-1">
      <div
        class="collection-container__left-column  h-screen flex items-center justify-center col-span-6"
      >
        <div
          class="inner-container p-10 text-justify rounded-xl bg-zinc-950 ml-20  bg-opacity-70"
        >
          <h1 class="text-6xl font-bebas mb-10 mt-5 text-zinc-200">
            {{ army }}
          </h1>
          <p class="text-xl text-zinc-300">
            Drifting through the void come star-eclipsing shoals of immense
            creatures whose cephalopodic forms bristle with spines and feeder
            tendrils. Each of these living vessels is host to thousands upon
            thousands of dormant warrior-forms, ready to wake from their slumber
            when the hive fleet locates its next meal.
          </p>

          <div class="collection__button-menu grid grid-cols-2 gap-20 mt-10 p-10">
            <v-btn><p>Datasheets</p></v-btn>
            <v-btn><p>Army rules</p></v-btn>
            
          </div>
        </div>
      </div>

      <div class="collection-container__right-column col-span-6">
        <div
          class="collection-container__right-column--detachements grid grid-cols-3"
        >
          <div>a</div>
          <div>a</div>
          <div>a</div>
        </div>
      </div>

      <!-- ----------------------------- -->
      <!-- <div class="STUFF">
    <h1>{{ faction }} - {{ army }}</h1>
    <div v-if="armyData">
      <div v-for="armyName in armyData.units" :key="armyName" class="m-5">
        <nuxt-link :to="generateLink(faction, army, armyName)">
          <v-btn>
            <p>{{ armyName }}</p>
          </v-btn>
        </nuxt-link>
      </div>
    </div>
  </div> -->
      <!-- ------------------------- -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const armyData = ref([]);
const { faction, army } = useRoute().params;

// Function to replace unwanted characters with hyphens
const replaceUnwantedCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9-]/g, "-");
};

// Function to generate sanitized link
const generateLink = (faction, army, armyName) => {
  const sanitizedArmyName = replaceUnwantedCharacters(armyName);
  return `/${faction}/${army}/${sanitizedArmyName}`;
};

onMounted(async () => {
  try {
    const sanitizedFaction = replaceUnwantedCharacters(faction);
    const sanitizedArmy = replaceUnwantedCharacters(army);

    const res = await fetch(
      `/faction/${sanitizedFaction}/${sanitizedArmy}/collection.json`
    );
    armyData.value = await res.json();
    console.log(
      "Fetching URL:",
      `/faction/${sanitizedFaction}/${sanitizedArmy}/collection.json`
    ); // Log the URL being fetched
    console.log("Fetched Army Data: ", armyData.value);
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});

onMounted(() => {
  console.log("Army mounted");
});
</script>

<style scoped>
/* Add transparency to the background */
.collection-container::before {
  content: "";
  background-color: rgba(
    81,
    81,
    81,
    0.5
  ); /* Adjust the alpha (0.5 for 50% transparency) */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* Apply a blur effect to the background */
.collection-container::after {
  content: "";
  /* background-image: url('https://www.wargamer.com/wp-content/sites/wargamer/2023/05/warhammer-40k-10th-edition-world-eaters-art.jpg'); */
  background-image: url("https://www.wargamer.com/wp-content/sites/wargamer/2022/09/magic-the-gathering-warhammer-40k-tyranids.jpg");
  filter: blur(5px);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.wrapper {
  filter: grayscale(100%);
  height: 100vh;
}

.inner-container {
  height: 500px;
  width: 700px;
}
</style>
