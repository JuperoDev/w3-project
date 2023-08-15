<template>
  <div>
    <h1>{{ armyUnit }}</h1>
    {{ lore }}
    <Attributes :attributes="attributes" />

   

    <Lore :lore="lore" />
 
    <v-expansion-panels>

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
    </v-expansion-panels>



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
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
