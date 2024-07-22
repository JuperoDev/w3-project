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
            <div v-for="(wargearGroup, index) in groupedWargear" :key="index" class="my-2">
              <h3>{{ wargearGroup.miniature }}</h3>
              <div v-for="wargear in wargearGroup.items" :key="wargear.description" class="my-2">
                <p><strong>{{ wargear.description }}</strong></p>
                <ul>
                  <li v-for="item in wargear.items" :key="item" class="flex items-center justify-between">
                    <span>{{ item }}</span>
                    <div>
                      <v-btn icon small @click="decreaseQuantity(item)" :disabled="equipmentQuantities[item] <= 0">
                        <v-icon small>mdi-minus</v-icon>
                      </v-btn>
                      <span>{{ equipmentQuantities[item] || 0 }}</span>
                      <v-btn icon small @click="increaseQuantity(item)">
                        <v-icon small>mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="defaultWargear.length" class="my-4">
              <h3>Default Equipment</h3>
              <ul>
                <li v-for="item in defaultWargear" :key="item" class="flex items-center justify-between">
                  <span>{{ item }}</span>
                  <div>
                    <v-btn icon small @click="decreaseQuantity(item)" :disabled="equipmentQuantities[item] <= 0">
                      <v-icon small>mdi-minus</v-icon>
                    </v-btn>
                    <span>{{ equipmentQuantities[item] || 0 }}</span>
                    <v-btn icon small @click="increaseQuantity(item)">
                      <v-icon small>mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveWargear">Save</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  url: { type: String, required: true },
  armyIndex: { type: Number, required: true },
  initialWargear: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['update-wargear-quantities']);

const dialog = ref(false);
const wargearOptions = ref([]);
const loading = ref(true);
const error = ref(null);
const equipmentQuantities = ref({ ...props.initialWargear });
const defaultWargear = ref([]);
const groupedWargear = ref([]);

const fetchWargearData = async () => {
  try {
    const response = await fetch(props.url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    wargearOptions.value = data.wargear || [];
    initializeQuantities(data.unitComposition);
  } catch (err) {
    error.value = `Error fetching wargear data: ${err.message}`;
  } finally {
    loading.value = false;
  }
};

const initializeQuantities = (unitComposition) => {
  const grouped = {};

  wargearOptions.value.forEach(option => {
    option.items.forEach(item => {
      if (equipmentQuantities.value[item] === undefined) {
        equipmentQuantities.value[item] = 0;
      }
    });

    if (!grouped[option.miniature]) {
      grouped[option.miniature] = { miniature: option.miniature, items: [] };
    }
    grouped[option.miniature].items.push(option);
  });

  groupedWargear.value = Object.values(grouped);

  unitComposition.forEach(composition => {
    composition.equipment.forEach(equip => {
      if (equipmentQuantities.value[equip] === undefined) {
        equipmentQuantities.value[equip] = composition.minQuantity;
      }
      if (!defaultWargear.value.includes(equip)) {
        defaultWargear.value.push(equip);
      }
    });
  });
};

const increaseQuantity = (item) => {
  equipmentQuantities.value[item] = (equipmentQuantities.value[item] || 0) + 1;
};

const decreaseQuantity = (item) => {
  if (equipmentQuantities.value[item] > 0) {
    equipmentQuantities.value[item] -= 1;
  }
};

const saveWargear = () => {
  emit('update-wargear-quantities', { ...equipmentQuantities.value });
  dialog.value = false;
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
