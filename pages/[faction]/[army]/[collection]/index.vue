<template>
  <div>

    <!--  desktop datasheet  -->
<DesktopDatasheet :armyUnit="armyUnit"
:keywords="keywords"
:attributes="attributes" />
<br/>
<br/>
<br/>
<br/>
<br/>

<!-- end desktop datasheet  -->
    <div
      class="army-unit-container uppercase text-4xl font-bebas px-5 py-3 flex justify-center items-center text-zinc-200 bg-zinc-900"
    >
      <h1>{{ armyUnit }}</h1>
    </div>



    <Attributes :attributes="attributes" />

    <v-expansion-panels>
      <!-- Ranged weapons -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="uppercase font-semibold">Ranged weapons</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div>
            <RangedWeapons :rangedWeapons="rangedWeapons" />
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
            <MeleeWeapons :meleeWeapons="meleeWeapons" />
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
            <Abilities :abilities="abilities" />
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
            <Wargear :wargear="wargear" />
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
            
            <UnitComposition
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
            <Keywords :keywords="keywords" :factionKeyword="factionKeyword" />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- end panels  -->
    </v-expansion-panels>

    <Lore :lore="lore" />
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
const leader = ref("");
const rangedWeapons = ref([]);
const meleeWeapons = ref([]);
const keywords = ref([]);
const factionKeyword = ref([]);
const wargear = ref ([]);
const abilities = ref ({});
const unitComposition= ref ([]);
const equipment= ref ([]);
const options= ref ([]);

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
    keywords.value = unitData.keywords;
    factionKeyword.value = unitData.factionKeyword;
    wargear.value = unitData.wargear;
    abilities.value = unitData.abilities;
    unitComposition.value = unitData.unitComposition;
    equipment.value = unitData.equipment;
    options.value = unitData.options;
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
<style scoped>
.font-bebas {
  font-family: "Bebas Neue", sans-serif;
}
</style>
