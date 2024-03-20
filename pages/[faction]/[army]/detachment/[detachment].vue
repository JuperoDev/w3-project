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
      <p class="px-3 py-2"><span >{{ rule.description }}</span></p>
      
      
    </div>


    <DetachmentsDesktopEnhacements :enhacements="collectionData.enhacements"/> 
  <!-- 
  <DetachmentsDesktopStratagems :stratagems="collectionData.stratagems"/> -->
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
    console.log("Fetched Collection Data:", collectionData.value);
   } catch (error) {
     console.error("Fetch Collection Data Error:", error);
   }
 };

 onMounted(() => {
  fetchCollectionData();
 });
</script>

<style scoped>
.enhacement--element {
  margin-top: 10px;
}
</style>