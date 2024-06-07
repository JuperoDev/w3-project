<template>
  <div class="wrapper ">
    
    <NavbarComponentsButtonGrid />

    <!-- flex items-center justify-center -->
    <div class="army_main 
    flex items-center justify-center bg-stone-100
    ">
    <div class="collection-container w-full p-2 m-2 bg-white border border-black-500">
      <div class="collection-container__left-column ">
        <div
          class="inner-container text-justify rounded-sm bg-white bg-opacity-70"
        >
          <div
            class="flex items-center justify-center font-bebas mb-10 mt-5 px-10 pt-5"
          >
             <img
              :src="`/icons/${armyData.symbol}.png`"
              alt="army logo"
              class="h-20 mt-3"
            /> 

            <h2 class="text-3xl md:text-6xl font-bebas text-zinc-900 px-2 pt-5 text-center">
              {{ replaceHyphensWithSpaces(army) }}
            </h2>
             <img
              :src="`/icons/${armyData.symbol}.png`"
              alt="army logo"
              class="h-20 mt-3"
            /> 
          </div>

         

      <!-- army rules  -->
    


      <div class="armyrules-container  ">
            <div class="flex items-center justify-center  my-3">
              <h2 class="text-3xl text-zinc-800 font-bebas">Army Rules</h2>
            </div>
            <div
              class="collection-container__right-column--detachments grid grid-cols-1 "
            >
            <DesktopArmyComponentsArmyRules :armyRules="armyData.rules" /> 
            </div>
          </div> 


          <!-- detachment -->

           <div class="detachment-container  ">
            <div class="flex items-center justify-center  my-3">
              <h2 class="text-3xl text-zinc-800 font-bebas">Detachments</h2>
            </div>
            <div
              class="collection-container__right-column--detachments grid grid-cols-1 md:grid-cols-3"
            >
              <div
                class="detachment-button-grid md:my-3 p-3"
                v-for="detachment in armyData.detachments"
                :key="detachment"
              >
                <nuxt-link :to="generateDetachment(faction, army, detachment)">
                  <v-btn class="max-button ">
                <p 
                >
                  {{ detachment }}
                </p>
              </v-btn>
                </nuxt-link>
              </div>
            </div>
          </div> 


        </div>
      </div>

      


      <!-- unit list  -->
      <div class="unit-list">
        <div class="flex items-center justify-center">
              <h2 class="text-3xl text-zinc-800 font-bebas my-3">Units</h2>
            </div>
        <div v-if="armyData" class="grid grid-cols-1 md:grid-cols-3">
          <div v-for="unit in armyData.units" :key="unit" class="m-5">
            <nuxt-link :to="generateLink(faction, army, unit)">
              <v-btn class="max-button">
                <p
                  :class="{
                    'button__normal-font': unit.length <= 20,
                    'button__small-font': unit.length > 30,
                  }"
                >
                  {{ unit }}
                </p>
              </v-btn>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
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

// Function to replace hyphens with spaces in the army title
const replaceHyphensWithSpaces = (input) => {
  return input.replace(/-/g, " ");
};

// Function to generate sanitized link to army units
const generateLink = (faction, army, armyName) => {
  const sanitizedArmyName = replaceUnwantedCharacters(armyName);
  return `/${faction}/${army}/${sanitizedArmyName}`;
};

// Function to generate sanitized links to detachment page
const generateDetachment = (faction, army, detachment) => {
  const sanitizedFaction = replaceUnwantedCharacters(faction);
  const sanitizedArmy = replaceUnwantedCharacters(army);
  const sanitizedDetachment = replaceUnwantedCharacters(detachment);
  return `/${sanitizedFaction}/${sanitizedArmy}/detachment/${sanitizedDetachment}`;
};

onMounted(async () => {
  try {
    const sanitizedFaction = replaceUnwantedCharacters(faction);
    const sanitizedArmy = replaceUnwantedCharacters(army);

    const res = await fetch(
      `/faction/${sanitizedFaction}/${sanitizedArmy}/collection.json`
    );
    armyData.value = await res.json();

  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});


</script>

<style scoped>


.collection-container {
  max-width: 1000px;
}

img{
  transform: scale(90%);
}
</style>
