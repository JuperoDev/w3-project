<template>
  <div>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Unit Info"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="">
          <v-card-text>
            <!-- MOBILE -->
     <!-- MOBILE --><!-- MOBILE --><!-- MOBILE -->


            <div class="mobile-datasheet  bg-white">
      <div
        class="army-unit-container uppercase text-4xl font-bebas px-5 py-3 flex justify-center items-center text-zinc-200 bg-zinc-900"
      >
        <h1>
          {{ parentUnit }}
          
        </h1>
      </div>

      <MobileAttributes :attributes="attributes" />
      <!-- v panels  -->

      <v-expansion-panels>
        <!-- Ranged weapons -->

        <v-expansion-panel v-if="rangedWeapons && rangedWeapons.length > 0">
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Ranged weapons</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileRangedWeapons :rangedWeapons="rangedWeapons" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Melee weapons  -->

       

        <v-expansion-panel>
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Melee Weapons</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileMeleeWeapons :meleeWeapons="meleeWeapons" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Abilities  -->
        <v-expansion-panel>
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Abilities</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileAbilities :abilities="abilities" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Transport  -->
        <v-expansion-panel v-if="transport">
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Transport</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileTransport :transport="transport" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Wargear Abilities -->
        <v-expansion-panel v-if="warGearAbilities">
        <!-- <v-expansion-panel v-if="warGearAbilities"> -->
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Wargear Abilities</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            
              <MobileWarGearAbilities :warGearAbilities="warGearAbilities" />
            
           
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Additional Parameter -->
        <v-expansion-panel v-if="hasAdditionalParameter">
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">
              {{ additionalParameter.title }}
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileAdditionalParameter
              :additionalParameter="additionalParameter"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Supreme Commander -->
        <v-expansion-panel v-if="supremeCommander">
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Supreme Commander</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>If this model is in your army, it must be your Warlord</p>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Damaged -->
        <v-expansion-panel v-if="hasDamaged">
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">
              Damaged: 1 - {{ damaged.remainingWounds }} wounds remaining
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p>{{ damaged.description }}</p>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- Wargear Options  -->
        <v-expansion-panel>
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">wargear options</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileWargear :wargear="wargear" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- leader  -->
      
          
        <v-expansion-panel v-if="!!leader?.length">
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">Leader</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
           
              <MobileLeader :leader="leader" :leaderInfo="leaderInfo" />
            
            
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- NOT SHOWING ON PREALPHA  -->
        
          <v-expansion-panel>
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">unit composition</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileUnitComposition
              :options="options"
              :unitComposition="unitComposition"
              :equipment="equipment"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>  

        <!-- keywords  -->
        <v-expansion-panel>
          <v-expansion-panel-title>
            <div class="uppercase font-semibold">keywords</div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <MobileKeywords
              :keywords="keywords"
              :factionKeyword="factionKeyword"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- end panels  -->
      </v-expansion-panels>

      <!-- v panels end  -->
      <MobileLore :lore="lore" />
    </div>


    <!-- end MOBILE -->
  <!-- end MOBILE -->  <!-- end MOBILE -->






          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define props
const props = defineProps({
  url: String,
  unit: Object
});

// Reactive variables to store JSON data
const attributes = ref([]);
const lore = ref("");
const transport = ref("");
const parentUnit = ref("");
const leader = ref([]);
const leaderInfo = ref("");
const rangedWeapons = ref(null);
const meleeWeapons = ref([]);
const additionalParameter = ref({});
const keywords = ref([]);
const factionKeyword = ref([]);
const wargear = ref([]);
const abilities = ref({});
const unitComposition = ref([]);
const equipment = ref([]);
const options = ref([]);
const supremeCommander = ref(false);
const damaged = ref({});
const warGearAbilities = ref({});

// Function to convert unit name to URL-friendly format
const unitURLName = (name) => {
  if (!name) return ''; // If name is not defined, return an empty string
  
  // Replace spaces and special characters with hyphens and convert to lowercase
  return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
};

// Constructed URL
const constructedURL = `faction/${props.url}/collection/${unitURLName(props.unit.unitType)}.json`;


// Fetch JSON data on component mount
onMounted(async () => {
  try {
    const response = await fetch(constructedURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const unitData = await response.json();

    // Assign each property of the JSON data to its corresponding reactive variable
    attributes.value = unitData.attributes || [];
    lore.value = unitData.lore || "";
    transport.value = unitData.transport || "";
    parentUnit.value = unitData.parentUnit || "";
    leader.value = unitData.leader || [];
    leaderInfo.value = unitData.leaderInfo || "";
    rangedWeapons.value = unitData.rangedWeapons || null;
    meleeWeapons.value = unitData.meleeWeapons || [];
    additionalParameter.value = unitData.additionalParameter || {};
    keywords.value = unitData.keywords || [];
    factionKeyword.value = unitData.factionKeyword || [];
    wargear.value = unitData.wargear || [];
    abilities.value = unitData.abilities || {};
    unitComposition.value = unitData.unitComposition || [];
    equipment.value = unitData.equipment || [];
    options.value = unitData.options || [];
    supremeCommander.value = unitData.supremeCommander || false;
    damaged.value = unitData.damaged || {};
    warGearAbilities.value = unitData.warGearAbilities || {};
  } catch (error) {
    console.error('Fetch error:', error);
  }
});


// Check if additionalParameter is not an empty object
const hasAdditionalParameter = computed(() => {
  return Object.keys(additionalParameter.value).length > 0;
});

// Check if damaged is not an empty object

const hasDamaged = computed(() => {
  return Object.keys(damaged.value).length > 0;
});

</script>
