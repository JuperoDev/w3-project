<template>
  <div class="wrapper  flex items-center justify-center">




    <div
      class="collection-container  "
      
    >
      <div
        class="collection-container__left-column "
      >
        <div
          class="inner-container text-justify rounded-sm bg-white  bg-opacity-70"
        >
          
          <div class=" flex items-center justify-center  font-bebas mb-10 mt-5  px-10 pt-5">
            
            <img :src="`/icons/${armyData.symbol}.png`" alt="army logo" class="h-20 mt-3">
            
            
            <h2 class="text-6xl font-bebas  text-zinc-900 px-5 pt-5 text-center">{{ replaceHyphensWithSpaces(army) }}</h2>
            <img :src="`/icons/${armyData.symbol}.png`" alt="army logo" class="h-20 mt-3">
          </div>

          <p class="text-xl text-zinc-900 px-10">
            {{ armyData.description }}
          </p>
          <br/>

           <div
            class="collection__button-menu grid  md:grid-cols-2 md:gap-20  mb-20 p-10"
          >
            <v-btn class="mb-5"><p>Datasheets</p></v-btn>
            <v-btn><p>Army rules</p></v-btn>
          </div> 

          <!-- detachment -->


          
          <div class="detachment-container bg">
            <!-- <h2 class="text-3xl text-zinc-300">detachments</h2> -->
            <!-- <div
              class="collection-container__right-column--detachments grid grid-cols-3"
            > -->


            

              <!-- <div
                class="detachment-button-grid"
                v-for="detachment in armyData.detachments"
                :key="detachment"
              >
                <nuxt-link :to="generateDetachment(faction, army, detachment)">
                  <v-btn>{{ detachment }}</v-btn>
                </nuxt-link>
              </div> -->



            <!-- </div> -->
          </div>
        </div>
      </div>

     

      <!-- ----------------------------- -->

      <!-- ------------------------- -->
    </div>






    <!-- <DesktopArmyComponentsIntroduction />
    <DesktopArmyComponentsArmyRules :armyRules="armyData.rules" />
    <div class="unit-list">
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



  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const armyData = ref([]);
const { faction, army, detachment } = useRoute().params;

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

/* Apply a blur effect to the background */
.collection-container {
  /* background-image: url('https://www.wargamer.com/wp-content/sites/wargamer/2023/05/warhammer-40k-10th-edition-world-eaters-art.jpg'); */

  

  /* top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
  z-index: -2;
}

.inner-container {
  /* height: 500px;
  width: 700px; */
}

div {
  border: 1px solid red; 
}

img{
  
}

.collection-container {
  max-width: 1000px;
}
</style>
