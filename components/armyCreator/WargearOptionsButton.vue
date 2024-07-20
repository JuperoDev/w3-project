<template>
  <div>
    <v-btn icon small @click="dialog = true">
      <v-icon small>mdi-cog</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Wargear Options</v-card-title>
        <v-card-text>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div v-for="wargear in wargearOptions" :key="wargear.description" class="my-2">
              <p><strong>{{ wargear.description }}</strong></p>
              <ul>
                <li v-for="item in wargear.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const dialog = ref(false);
const wargearOptions = ref([]);
const loading = ref(true);
const error = ref(null);

const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

const fetchWargearData = async () => {
  try {
    const response = await fetch(props.url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    wargearOptions.value = data.wargear || [];
  } catch (err) {
    error.value = `Error fetching wargear data: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWargearData);

watch(() => props.url, fetchWargearData);
</script>

<style scoped>
.my-2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.error {
  color: red;
}
</style>
