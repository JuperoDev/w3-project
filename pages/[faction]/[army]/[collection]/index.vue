<template>
  <div>
    <!--  desktop datasheet  -->
    <DesktopDatasheet
      :armyUnit="armyUnit"
      :keywords="keywords"
      :factionKeyword="factionKeyword"
      :meleeWeapons="meleeWeapons"
      :rangedWeapons="rangedWeapons"
      :additionalParameter="additionalParameter"
      :attributes="attributes"
      :wargear="wargear"
      :leader="leader"
      :abilities="abilities"
      :supremeCommander="supremeCommander"
      :options="options"
      :unitComposition="unitComposition"
      :equipment="equipment"
      :damaged="damaged"
    />
    <br />
    <br />
    <br />
    <br />
    <br />

    <!-- end desktop datasheet  -->
    <div
      class="army-unit-container uppercase text-4xl font-bebas px-5 py-3 flex justify-center items-center text-zinc-200 bg-zinc-900"
    >
      <h1>{{ armyUnit }}</h1>
    </div>

    <MobileAttributes :attributes="attributes" />

    <v-expansion-panels>
      <!-- Ranged weapons -->
      <v-expansion-panel v-if="rangedWeapons">
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Ranged weapons</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileRangedWeapons :rangedWeapons="rangedWeapons" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Melee weapons  -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Melee Weapons</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileMeleeWeapons :meleeWeapons="meleeWeapons" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Abilities  -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Abilities</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileAbilities :abilities="abilities" />
          </div>
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
          <div>
            <MobileAdditionalParameter
              :additionalParameter="additionalParameter"
            />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Supreme Commander -->
      <v-expansion-panel v-if="supremeCommander">
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Supreme Commander</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <p>If this model is in your army, it must be your Warlord</p>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>


            <!-- Damaged -->
            <v-expansion-panel v-if="hasDamaged">
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Damaged: 1 - {{ damaged.remainingWounds }} wounds remaining </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <p>{{ damaged.description }}</p>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Wargear Options  -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">wargear options</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileWargear :wargear="wargear" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- leader  -->
      <v-expansion-panel v-if="leader.length > 0">
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Leader</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileLeader :leader="leader" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- unit composition  -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">unit composition</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileUnitComposition
              :options="options"
              :unitComposition="unitComposition"
              :equipment="equipment"
            />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- keywords  -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">keywords</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <MobileKeywords
              :keywords="keywords"
              :factionKeyword="factionKeyword"
            />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- end panels  -->
    </v-expansion-panels>

    <MobileLore :lore="lore" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// params
const route = useRoute();
const faction = route.params.faction;
const army = route.params.army;
const armyUnit = route.params.collection;

// json data storage
const attributes = ref([]);
const parentUnit = ref("");
const lore = ref("");
const leader = ref([]);
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
const damaged = ref ({});

// Check if additionalParameter is not an empty object
const hasAdditionalParameter = computed(() => {
  
  return Object.keys(additionalParameter.value).length > 0;
});

// Check if damaged is not an empty object

const hasDamaged = computed(() => {
  
  return Object.keys(damaged.value).length > 0;
});

// json fetcher
onMounted(async () => {
  try {
    const res = await fetch(
      `/faction/${faction}/${army}/collection/${armyUnit}.json`
    );
    const unitData = await res.json();
    attributes.value = unitData.attributes;
    lore.value = unitData.lore;
    parentUnit.value = unitData.parentUnit;
    leader.value = unitData.leader;
    rangedWeapons.value = unitData.rangedWeapons;
    meleeWeapons.value = unitData.meleeWeapons;
    additionalParameter.value = unitData.additionalParameter;
    keywords.value = unitData.keywords;
    factionKeyword.value = unitData.factionKeyword;
    wargear.value = unitData.wargear;
    abilities.value = unitData.abilities;
    unitComposition.value = unitData.unitComposition;
    equipment.value = unitData.equipment;
    options.value = unitData.options;
    supremeCommander.value = unitData.supremeCommander;
    damaged.value = unitData.damaged;
  } catch (error) {
    console.error("Fetch Error: ", error);
    supremeCommander.value = false;
    wargear.value = [];
  }
});
</script>
<style scoped>
.font-bebas {
  font-family: "Bebas Neue", sans-serif;
}
</style>
