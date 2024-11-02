<template>
  <div>
    <NavbarComponentsButtonGrid v-if="showNavbar" />
    <div class="bg-stone-100 p-2 md:px-10 lg:px-16 min-h-screen relative pb-20">  
      <div v-if="factionData && factionData.armies" class="bg-white border border-black-500 pb-16"> 
        <div class="pb-20">
          <div class="grid grid-cols-1 md:grid-cols-2 md:gap-3 mt-5"> 
            <div v-for="army in factionData.armies" :key="army.name" class="flex items-center justify-center">
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
      </div>
      <NotFound v-else />
    </div>
    <GeneralPurposeFloatingFooter v-if="showNavbar" /> 
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "#app";
import NotFound from "~/components/generalPurpose/NotFound.vue";

const factionData = ref(null);
const showNavbar = ref(true);
const route = useRoute();
const { faction } = route.params;

const sanitizeArmyName = (name) => {
  return name.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
};

onMounted(async () => {
  try {
    const factionParam = route.params.faction;
    const res = await fetch(`/faction/${factionParam}/army.json`);
    
    if (!res.ok) {
      showNavbar.value = false; // Hide Navbar for 404
      factionData.value = null; // Ensure NotFound component shows
      return;
    }

    factionData.value = await res.json();
    if (!factionData.value || !factionData.value.armies) {
      showNavbar.value = false; // Hide Navbar for 404
      factionData.value = null; // Ensure NotFound component shows
    }
  } catch (error) {
    console.error("Fetch Error: ", error);
    showNavbar.value = false; // Hide Navbar on error
    factionData.value = null; // Ensure NotFound component shows
  }
});

// Set document title
onMounted(() => {
  document.title = `Deep Strike`;
});
</script>
