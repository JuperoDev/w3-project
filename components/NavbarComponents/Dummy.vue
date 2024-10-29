<template>
  <div ref="dropdown" class="relative">
    <!-- Trigger Text with Click and Hover to Toggle Dropdown -->
    <div
      @click="toggleDropdown"
      @mouseenter="showDropdown"
      class="cursor-pointer text-gray-300 underline"
    >
      {{ triggerText }}
    </div>

    <!-- Dropdown Container -->
    <div
      v-if="isOpen"
      class="absolute top-10 left-0 w-full bg-white border rounded-lg shadow-lg p-4 grid grid-cols-3 gap-4"
    >
      <!-- Column 1 -->
      <div>
        <h3 class="font-bold mb-2">Column 1</h3>
        <ul>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 1</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 2</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 3</a></li>
        </ul>
      </div>

      <!-- Column 2 -->
      <div>
        <h3 class="font-bold mb-2">Column 2</h3>
        <ul>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 4</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 5</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 6</a></li>
        </ul>
      </div>

      <!-- Column 3 -->
      <div>
        <h3 class="font-bold mb-2">Column 3</h3>
        <ul>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 7</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 8</a></li>
          <li><a href="#" class="text-gray-600 hover:text-gray-900">Dummy Link 9</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  triggerText: {
    type: String,
    required: true,
    default: 'Click me to open dropdown',
  },
})

const isOpen = ref(false)
const dropdown = ref(null)

// Toggle dropdown on click
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Show dropdown on hover for desktop only
const showDropdown = () => {
  if (window.innerWidth >= 1024) { // Desktop breakpoint
    isOpen.value = true
  }
}

// Hide dropdown on mouse leave for desktop only
const hideDropdown = () => {
  if (window.innerWidth >= 1024) {
    isOpen.value = false
  }
}

// Close dropdown if clicked outside
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Add event listeners based on screen size
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.text-gray-300 {
  color: #cccccc; /* Whiteish color */
}
</style>
