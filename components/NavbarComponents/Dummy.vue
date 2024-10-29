<template>
  <div ref="dropdown" class="relative">
    <!-- Trigger Text -->
    <div
      @click="toggleDropdown"
      @mouseenter="showDropdown"
      class="cursor-pointer text-gray-300 underline"
    >
      {{ triggerText }}
    </div>

    <!-- Dropdown Container with scrolling and two-column layout -->
    <div
      v-if="isOpen"
      class="fixed top-[100px] left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[800px] bg-white border rounded-lg shadow-lg p-4 z-50 max-h-[600px] overflow-y-auto"
    >
      <!-- Link back to the army page -->
      <nuxt-link
        :to="`/${faction}/${army}/`"
        class="font-bold text-lg text-gray-800 hover:text-gray-900 underline mb-4 block"
      >
        {{ formattedArmyName }}
      </nuxt-link>

      <!-- Two-column layout with Characters, Battleline, and Dedicated Transports in the first column, and Other Units in the second column -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-4">
        
        <!-- First Column -->
        <div>
          <!-- Characters Section -->
          <div v-if="data.characters" class="mb-4">
            <h3 class="font-bold text-red-600">Characters</h3>
            <ul class="list-none space-y-1">
              <li v-for="character in data.characters" :key="character.unitName">
                <nuxt-link
                  :to="`/${faction}/${army}/${character.unitName.replace(/ /g, '-')}`"
                  class="text-gray-800 hover:text-gray-900"
                >
                  {{ character.unitName }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Battleline Section -->
          <div v-if="data.battleline" class="mb-4">
            <h3 class="font-bold text-red-600">Battleline</h3>
            <ul class="list-none space-y-1">
              <li v-for="unit in data.battleline" :key="unit.unitName">
                <nuxt-link
                  :to="`/${faction}/${army}/${unit.unitName.replace(/ /g, '-')}`"
                  class="text-gray-800 hover:text-gray-900"
                >
                  {{ unit.unitName }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- Dedicated Transports Section -->
          <div v-if="data.dedicatedTransports" class="mb-4">
            <h3 class="font-bold text-red-600">Dedicated Transports</h3>
            <ul class="list-none space-y-1">
              <li v-for="unit in data.dedicatedTransports" :key="unit.unitName">
                <nuxt-link
                  :to="`/${faction}/${army}/${unit.unitName.replace(/ /g, '-')}`"
                  class="text-gray-800 hover:text-gray-900"
                >
                  {{ unit.unitName }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Second Column -->
        <div>
          <!-- Other Units Section -->
          <div v-if="data.other" class="mb-4">
            <h3 class="font-bold text-red-600">Other Units</h3>
            <ul class="list-none space-y-1">
              <li v-for="unit in data.other" :key="unit.unitName">
                <nuxt-link
                  :to="`/${faction}/${army}/${unit.unitName.replace(/ /g, '-')}`"
                  class="text-gray-800 hover:text-gray-900"
                >
                  {{ unit.unitName }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const props = defineProps({
  triggerText: {
    type: String,
    required: true,
    default: 'Click me to open dropdown',
  },
})

const route = useRoute()
const isOpen = ref(false)
const dropdown = ref(null)
const data = ref({})
const faction = route.params.faction
const army = route.params.army

// Computed property to format the army name without hyphens and capitalize words
const formattedArmyName = computed(() => {
  return army.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
})

// Fetch data from the collection.json file based on route
const fetchData = async () => {
  try {
    const response = await axios.get(`/faction/${faction}/${army}/collection.json`)
    data.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Toggle dropdown on click
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Show dropdown on hover
const showDropdown = () => {
  isOpen.value = true
}

// Close dropdown if clicked outside
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Fetch data on mount
onMounted(() => {
  fetchData()
  document.addEventListener('click', handleClickOutside)
})

// Clean up event listener
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.text-gray-300 {
  color: #cccccc; /* Whiteish color */
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 0.5rem 2rem; /* Horizontal and vertical gaps */
}

.font-bold.text-red-600 {
  color: #a00; /* Set to red */
}

.list-none {
  list-style-type: none;
}

.space-y-1 > :not(:first-child) {
  margin-top: 0.25rem; /* Adds spacing between items in lists */
}
</style>
