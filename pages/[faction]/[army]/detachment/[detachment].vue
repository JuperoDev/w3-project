<template>
  <div>


    <div v-if="collectionData">
      <NavbarComponentsButtonGrid />
      <div class="flex items-center justify-center">
      <h1 class="uppercase font-bebas text-4xl text-zinc-900 px-5 py-3">{{ collectionData.detachmentName }}</h1></div>
    
    <div v-for="rule in collectionData.detachmentRule" :key="rule.name">
      <div class="detachment-rule--container  bg-zinc-600">
       
        <h3 class="text-slate-200 capitalize py-2 px-3 font-bebas text-2xl"><span class="">{{ rule.name }}</span></h3>
       
      </div>
      
        <p class="px-3 py-2 italic"> {{ rule.lore }}</p>
      <p class="px-3 py-2" v-html="rule.description"></p>
      
      
    </div>


    <DetachmentsDesktopStratagems :stratagems="collectionData.stratagems"/> 
    <DetachmentsDesktopEnhacements :enhacements="collectionData.enhacements"/> 
    <GeneralPurposeFloatingFooter/>
  </div>

  <div v-if="!collectionData">
    <p>Loading...</p>
  </div>
  </div>
</template>

<script setup>
 import { ref, onMounted } from "vue";
 import { useRoute } from "vue-router";

 const replaceUnwantedCharacters = (input) => {
  return input.replace(/[^a-zA-Z0-9-]/g, "-");
 };

 const route = useRoute();
 const faction = route.params.faction;
 const army = route.params.army;
 const detachment = route.params.detachment;
 const sanitizedDetachment = replaceUnwantedCharacters(detachment);
 const collectionData = ref(null);

 const fetchCollectionData = async () => {
  try {
     const res = await fetch(
      `/faction/${faction}/${army}/detachment/${sanitizedDetachment}.json`
     );
     collectionData.value = await res.json();
  
   } catch (error) {
     console.error("Fetch Collection Data Error:", error);
   }
 };

 onMounted(() => {
  fetchCollectionData();
 });

 // Set document title and meta description based on armyUnit
onMounted(() => {
  document.title = `Detachment`;
  
});

</script>

<style scoped>
.enhacement--element {
  margin-top: 10px;
}
</style>