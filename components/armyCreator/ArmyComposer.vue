<template>
  <div>
    <div class="header flex justify-between items-center mb-4">
      <div>
        <p><strong>Name:</strong> {{ name }}</p>
        <!-- <p><strong>Faction:</strong> {{ selectedFaction }}</p> -->
        <p><strong>Army:</strong> {{ selectedArmy }}</p>
        <p><strong>Point List:</strong> {{ pointList }}</p>
        <p><strong>Detachment:</strong> {{ selectedDetachment }}</p>
        <p><strong>URL:</strong> {{ url }}</p>
        <p><strong>Total Points:</strong> {{ totalPoints }}</p>
      </div>
      <ArmyExporter :armyIndex="armyIndex" :totalPoints="totalPoints" />
    </div>

    <Characters 
      :url="url" 
      :armyIndex="armyIndex" 
      :selectedDetachment="selectedDetachment"
      :selectedFaction="selectedFaction"
      :selectedArmy="selectedArmy"
      class="mt-4"
      @update-total-points="updateCharacterPoints"
    />
    <Battleline 
      :url="url" 
      :armyIndex="armyIndex" 
      class="mt-4"
      @update-total-points="updateBattlelinePoints"
    />
    <Other 
      :url="url" 
      :armyIndex="armyIndex" 
      class="mt-4"
      @update-total-points="updateOtherPoints"
    />
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import Characters from './Characters.vue';
import Battleline from './Battleline.vue';
import Other from './Other.vue';
import ArmyExporter from './ArmyExporter.vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  selectedFaction: {
    type: String,
    required: true
  },
  selectedArmy: {
    type: String,
    required: true
  },
  pointList: {
    type: String,
    required: true
  },
  selectedDetachment: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  armyIndex: {
    type: Number,
    required: true
  }
});

const characterPoints = ref(0);
const battlelinePoints = ref(0);
const otherPoints = ref(0);

const totalPoints = computed(() => {
  return characterPoints.value + battlelinePoints.value + otherPoints.value;
});

const updateCharacterPoints = (points) => {
  characterPoints.value = points;
};

const updateBattlelinePoints = (points) => {
  battlelinePoints.value = points;
};

const updateOtherPoints = (points) => {
  otherPoints.value = points;
};
</script>

<style scoped>
.header {
  margin-bottom: 1rem;
}
</style>


<style scoped>
.header {
  margin-bottom: 1rem;
}
</style>
