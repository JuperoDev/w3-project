<template>
  <div>
    
    <NavbarComponentsButtonGrid />

    <div v-if="factionData && factionData.armies">
      <div class="grid
      grid-cols-1 md:grid-cols-2 gap-3"> 
      <div v-for="army in factionData.armies" :key="army.name" class="
      flex items-center justify-center">
      <!--  -->
      
        <nuxt-link :to="`/${faction}/${sanitizeArmyName(army.name)}`">
          <GeneralPurposeArmyButton
            :armyName="army.name"
            :description="army.description"
            :imageUrl="army.imageUrl"
          />
        </nuxt-link>
      
      </div>
    </div>
    </div>
    <GeneralPurposeFloatingFooter/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";


const factionData = ref(null);
const { faction } = useRoute().params;

const sanitizeArmyName = (name) => {
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

// Set document title and meta description based on armyUnit
onMounted(() => {
  document.title = `Deep Strike`;
  
});
</script>
