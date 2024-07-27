<template>
  <div>
    <div class="header flex justify-between items-center mb-4">
      <div class="px-3 py-2">
        <p><strong>Name:</strong> {{ name }}</p>
        <p class="capitalize"><strong >Army:</strong> {{ selectedArmy }}</p>
        <p><strong>Point List:</strong> {{ pointList }}</p>
        <p class="capitalize"><strong >Detachment:</strong> {{ selectedDetachment }}</p>
        <p><strong>Total Points:</strong> {{ totalPoints }}</p>
        <ArmyExporter 
        :armyIndex="armyIndex" 
        :totalPoints="totalPoints"
        :characterUnits="characterUnits"
        :battlelineUnits="battlelineUnits"
        :otherUnits="otherUnits"
        :dedicatedTransportUnits="dedicatedTransportUnits"
      />
      </div>
      
    </div>

    <Characters 
      :url="sanitizedUrl" 
      :armyIndex="armyIndex" 
      :selectedDetachment="selectedDetachment"
      :selectedFaction="selectedFaction"
      :selectedArmy="selectedArmy"
      class="mt-4"
      @update-total-points="updateCharacterPoints"
      @update-units="updateCharacterUnits"
    />
    <Battleline 
      :url="sanitizedUrl" 
      :armyIndex="armyIndex" 
      :selectedDetachment="selectedDetachment"
      class="mt-4"
      @update-total-points="updateBattlelinePoints"
      @update-units="updateBattlelineUnits"
    />
    <DedicatedTransports
      :url="sanitizedUrl"
      :selectedDetachment="selectedDetachment"
      :armyIndex="armyIndex"
      class="mt-4"
      @update-total-points="updateDedicatedTransportPoints"
      @update-units="updateDedicatedTransportUnits"
    />
    
    <Other 
      :url="sanitizedUrl" 
      :selectedDetachment="selectedDetachment"
      :armyIndex="armyIndex" 
      class="mt-4 mb-24"
      @update-total-points="updateOtherPoints"
      @update-units="updateOtherUnits"
    />
   

    <!-- PointStatus component -->
    <PointStatus :totalPoints="totalPoints" :pointList="pointList" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Characters from './Characters.vue';
import Battleline from './Battleline.vue';
import Other from './Other.vue';
import DedicatedTransports from './DedicatedTransports.vue';  // Import the new component
import ArmyExporter from './ArmyExporter.vue';
import PointStatus from './PointStatus.vue';  // Import the new component

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
const dedicatedTransportPoints = ref(0); // Add this

const characterUnits = ref([]);
const battlelineUnits = ref([]);
const otherUnits = ref([]);
const dedicatedTransportUnits = ref([]); // Add this

const totalPoints = computed(() => {
  return characterPoints.value + battlelinePoints.value + otherPoints.value + dedicatedTransportPoints.value; // Include this
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

const updateDedicatedTransportPoints = (points) => { // Add this
  dedicatedTransportPoints.value = points;
};

const updateCharacterUnits = (units) => {
  characterUnits.value = units;
};

const updateBattlelineUnits = (units) => {
  battlelineUnits.value = units;
};

const updateOtherUnits = (units) => {
  otherUnits.value = units;
};

const updateDedicatedTransportUnits = (units) => { // Add this
  dedicatedTransportUnits.value = units;
};

const sanitizedUrl = computed(() => {
  return props.url.replace(/\s+/g, '-');
});
</script>

<style scoped>
.header {
  margin-bottom: 1rem;
}
</style>

<style>
.armyType__container{

padding: 15px 15px 15px 15px;
}
</style>