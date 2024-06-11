<template>
    <div class="armyComposer_container">
      <div class="armyComposer_container_character bg-zinc-800 text-zinc-50 uppercase">
        character {{ totalPoints }} points
        <v-btn @click="openDialog">+</v-btn>
      </div>
      <p>passed prop: {{ url }}</p>
      
      <v-dialog v-model="isDialogOpen" max-width="500">
        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
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
        <h3>Saved Characters</h3>
        <div v-for="(savedCharacter, index) in savedCharacters" :key="savedCharacter.unitName">
          {{ savedCharacter.unitName }}: {{ savedCharacter.basicPoints }} points
          <v-btn @click="deleteCharacter(index)">Delete</v-btn>
          <div v-if="savedCharacter.equipment" class="equipment-list">
            <div v-for="equipment in savedCharacter.equipment" :key="equipment">{{ equipment }}</div>
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
      const equipment = data.unitComposition?.[0]?.equipment || [];
      savedCharacters.value.push({ ...character, equipment });
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
  
  </script>
  
  <style scoped>
  /* .armyComposer_container {
  
  } */
  
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
  
  .equipment-list {
    font-size: 0.875rem;
    color: #555;
    margin-top: 5px;
  }
  </style>
  