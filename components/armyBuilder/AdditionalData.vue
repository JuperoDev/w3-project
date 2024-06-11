<template>
  <div>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Unit Info"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            <!-- Print the fetched data -->
            {{ jsonData }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close Dialog"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  // Define props
  const props = defineProps({
    url: String,
    unit: Object
  });

  // Reactive variable to store JSON data
  const jsonData = ref(null);

  // Function to convert unit name to URL-friendly format
  const unitURLName = (name) => {
    if (!name) return ''; // If name is not defined, return an empty string
    
    // Replace spaces and special characters with hyphens and convert to lowercase
    return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
  };

  // Constructed URL
  const constructedURL = `faction/${props.url}/collection/${unitURLName(props.unit.unitType)}.json`;

  // Fetch JSON data on component mount
  onMounted(async () => {
    try {
      const response = await fetch(constructedURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      jsonData.value = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
</script>
