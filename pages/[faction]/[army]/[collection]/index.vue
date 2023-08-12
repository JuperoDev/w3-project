<template>
  <div>
    <h1>{{ armyUnit }}</h1>
    <br />
    <p>parent unit: {{ parentUnit }}</p>
    <p v-if="leader.length > 0 ">leader : <span v-for="lead in leader">{{ lead }}</span> </p>
    <br/>
    <p>{{ lore }}</p>
    <br />
    <p>{{ army }}</p>
    <p>----</p>
    <Attributes :attributes="attributes"/>
    <Lore :lore="lore"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";



// params
const route = useRoute(); // Move useRoute into the setup function
const faction = route.params.faction;
const army = route.params.army;
const armyUnit = route.params.collection;

// json data
const attributes= ref([]);
const parentUnit = ref ("");
const lore = ref("");
const leader = ref ("");



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
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});
</script>
