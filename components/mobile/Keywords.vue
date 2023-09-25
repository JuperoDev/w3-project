<template lang="">
    <div>
        <div class="keywordsContainer rounded-lg px-3 py-2 border-solid border-2 border-slate-300 m-3">
          <p>Keywords:</p>
          <div>
            <p class="uppercase text-sm font-semibold" v-for="keyword in keywords" :key="keyword">{{ keyword }}</p>
          </div>
        </div>
  
        <div class="factionKeywords bg-zinc-900 text-slate-50 m-2 p-3 rounded-lg font-semibold">
          <p>Faction keywords:</p>
          <span v-for="keyword in factionKeyword" :key="keyword" class="uppercase"><p>{{ keyword }} </p></span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  keywords: Array,Boolean,
  factionKeyword: Array,Boolean
});


</script>