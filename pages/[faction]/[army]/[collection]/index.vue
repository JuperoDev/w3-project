<template>
  <div>
    <h1>{{ armyUnit }}</h1>

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
            <Wargear :wargear="wargear"/>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
