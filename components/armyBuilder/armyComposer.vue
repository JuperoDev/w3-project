<template>
  <div class="armyComposer_container">
    <div class="armyComposer_container_character bg-zinc-800 text-zinc-50 uppercase">
      character {{ totalPoints }} points
      <v-btn @click="openDialog">+</v-btn>
    </div>
    <p>passed prop: {{ url }}</p>

    <v-dialog v-model="isDialogOpen" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card title="Select Character">
          <v-card-text>
            <div v-for="character in characters" :key="character.unitName">
              {{ character.unitName }}: {{ character.basicPoints }} points
              <v-btn @click="saveCharacter(character)">Add</v-btn>
              <div v-if="characterCount(character) > 0" class="character-count">
                Already in army: {{ characterCount(character) }}
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close Dialog" @click="isDialogOpen = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <div class="saved-characters">
      <div v-for="(savedCharacter, index) in savedCharacters" :key="savedCharacter.unitName">
        {{ savedCharacter.unitName }}: {{ savedCharacter.basicPoints }} points
        <v-btn @click="deleteCharacter(index)">Delete</v-btn>
        <div v-if="savedCharacter.unitComposition" class="unit-composition-list">
          <div v-for="unit in savedCharacter.unitComposition" :key="unit.unitType" class="unit-composition">
            <ArmyBuilderAdditionalData :url="url" :unit="unit" />
            <ArmyBuilderWarGearData :url="url" :unit="unit" :parentUnit="unit.parentUnit" @updateWargear="updateWargear(index, $event)" />
            <div>{{ unit.minQuantity }} x {{ unit.unitType }}:</div>
            <div v-for="equipment in unit.equipment" :key="equipment" class="equipment">
              - {{ equipment }}
            </div>
            <div v-if="unit.selectedWargear && Object.keys(unit.selectedWargear).length" class="selected-wargear">
              <div v-for="(count, gear) in unit.selectedWargear" :key="gear">
                {{ gear }}: {{ count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// props
const props = defineProps({
  url: String
});

const isDialogOpen = ref(false);
const characters = ref([]);
const savedCharacters = ref([]);

const openDialog = () => {
  isDialogOpen.value = true;
};

const saveCharacter = async (character) => {
  // Fetch the character details
  const characterJsonFileName = character.unitName.replace(/\s+/g, '-').toLowerCase() + '.json';
  try {
    const res = await fetch(`/faction/${props.url}/collection/${characterJsonFileName}`);
    const data = await res.json();
    const unitComposition = data.unitComposition || [];

    // Add parentUnit field to each unit in unitComposition
    const unitsWithParentUnit = unitComposition.map(unit => ({
      ...unit,
      parentUnit: character.unitName, // Assuming character.unitName is the parent unit name
      selectedWargear: {}
    }));

    savedCharacters.value.push({ ...character, unitComposition: unitsWithParentUnit });
  } catch (error) {
    console.error("Fetch Error: ", error);
    savedCharacters.value.push(character); // Add without equipment if fetch fails
  }
};

const deleteCharacter = (index) => {
  savedCharacters.value.splice(index, 1);
};

// Import JSON data when the component is mounted
onMounted(async () => {
  if (!props.url) return; // Check if url is defined
  try {
    const res = await fetch(`/faction/${props.url}/collection.json`);
    const data = await res.json();
    characters.value = data.characters; // Update characters with fetched data
  } catch (error) {
    console.error("Fetch Error: ", error);
  }
});

// Computed property to count occurrences of each character
const characterCount = (character) => {
  return savedCharacters.value.filter(saved => saved.unitName === character.unitName).length;
};

// Computed property to calculate total points
const totalPoints = computed(() => {
  return savedCharacters.value.reduce((sum, character) => sum + character.basicPoints, 0);
});

// Method to update wargear in savedCharacters
const updateWargear = (index, wargear) => {
  const updatedUnits = savedCharacters.value[index].unitComposition.map(unit => {
    unit.selectedWargear = wargear;
    return unit;
  });
  savedCharacters.value[index].unitComposition = updatedUnits;
};
</script>

<style scoped>
.saved-characters {
  margin-top: 20px;
}

.saved-characters h3 {
  margin-bottom: 10px;
}

.saved-characters div {
  margin-bottom: 5px;
}

.character-count {
  font-size: 0.875rem;
  color: #888;
  margin-top: 5px;
}

.unit-composition-list {
  margin-top: 10px;
  padding-left: 15px;
}

.unit-composition {
  font-size: 0.875rem;
  color: #555;
  margin-top: 5px;
}

.equipment {
  font-size: 0.875rem;
  color: #555;
  margin-left: 10px;
}

.selected-wargear {
  margin-top: 10px;
  font-size: 0.875rem;
  color: #000;
}
</style>
