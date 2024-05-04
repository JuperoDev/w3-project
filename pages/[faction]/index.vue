<template>
  <div>
   

    <NavbarComponentsButtonGrid />
   

    <div v-if="factionData && factionData.army">
      <div v-for="armyName in factionData.army" :key="armyName" class="m-5 flex items-center justify-center">
        <!-- Sanitize the armyName here by replacing spaces and weird characters with hyphens -->
        <nuxt-link :to="`/${faction}/${sanitizeArmyName(armyName)}`">
          <v-btn class="w-56">{{ armyName }}</v-btn>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const factionData = ref(null);
const { faction } = useRoute().params;

const sanitizeArmyName = (name) => {
  // Replace spaces and weird characters with hyphens
  return name.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
};

onMounted(async () => {
  try {
    const factionParam = useRoute().params.faction;
    const res = await fetch(`/faction/${factionParam}/army.json`);
    factionData.value = await res.json();
 
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});

onMounted(() => {
 
});
</script>
