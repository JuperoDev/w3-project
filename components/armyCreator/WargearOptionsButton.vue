<template>
  <div>
    <span 
      class="text-sm text-blue-500 cursor-pointer hover:underline" 
      @click="dialog = true"
    >
      Wargear
    </span>
    <v-dialog v-model="dialog" max-width="800px" min-width="350px">
      <v-card>
        <v-card-title class="headline">Wargear Options</v-card-title>
        <v-card-text>
          <div v-if="error" class="error">{{ error }}</div>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div class="wargear-options">
              <div v-for="(wargearGroup, index) in groupedWargear" :key="index" class="wargear-group dark-border">
                <h3 class="miniature-name">{{ wargearGroup.miniature }}</h3>
                <div v-if="wargearGroup.defaultWargear.length" class="my-2">
                  <h4> <strong>Default Equipment</strong></h4>
                  <ul>
                    <li v-for="item in wargearGroup.defaultWargear" :key="getUniqueKey(wargearGroup.miniature, item)" class="flex items-center justify-between">
                      <span><small>{{ item }}</small></span>
                      <div>
                        <v-btn icon small class="small-btn" @click="decreaseQuantity(wargearGroup.miniature, item)" :disabled="getQuantity(wargearGroup.miniature, item) <= 0">
                          <v-icon class="small-icon">mdi-minus</v-icon>
                        </v-btn>
                        <span>{{ getQuantity(wargearGroup.miniature, item) || 0 }}</span>
                        <v-btn icon small class="small-btn" @click="increaseQuantity(wargearGroup.miniature, item)">
                          <v-icon class="small-icon">mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-for="wargear in wargearGroup.items" :key="wargear.description" class="my-2">
                  <h4><strong>{{ wargear.description }}</strong></h4>
                  <ul>
                    <li v-for="item in wargear.items" :key="getUniqueKey(wargearGroup.miniature, item)" class="flex items-center justify-between">
                      <span><small>{{ item }}</small></span>
                      <div>
                        <v-btn icon small class="small-btn" @click="decreaseQuantity(wargearGroup.miniature, item)" :disabled="getQuantity(wargearGroup.miniature, item) <= 0">
                          <v-icon class="small-icon">mdi-minus</v-icon>
                        </v-btn>
                        <span>{{ getQuantity(wargearGroup.miniature, item) || 0 }}</span>
                        <v-btn icon small class="small-btn" @click="increaseQuantity(wargearGroup.miniature, item)">
                          <v-icon class="small-icon">mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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
const equipmentQuantities = ref({});
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

  unitComposition.forEach(composition => {
    const unitTypeKey = composition.unitType.toLowerCase();
    if (!grouped[unitTypeKey]) {
      grouped[unitTypeKey] = { miniature: composition.unitType, items: [], defaultWargear: [] };
    }
    composition.equipment.forEach(equip => {
      const key = `${unitTypeKey}_${equip}`;
      if (equipmentQuantities.value[key] === undefined) {
        equipmentQuantities.value[key] = composition.minQuantity;
      }
      if (!grouped[unitTypeKey].defaultWargear.includes(equip)) {
        grouped[unitTypeKey].defaultWargear.push(equip);
      }
    });
  });

  wargearOptions.value.forEach(option => {
    const miniatureKey = option.miniature.toLowerCase();
    if (!grouped[miniatureKey]) {
      grouped[miniatureKey] = { miniature: option.miniature, items: [], defaultWargear: [] };
    }
    grouped[miniatureKey].items.push(option);
  });

  groupedWargear.value = Object.values(grouped);
};

const getUniqueKey = (miniature, item) => `${miniature.toLowerCase()}_${item}`;

const getQuantity = (miniature, item) => equipmentQuantities.value[getUniqueKey(miniature, item)];

const increaseQuantity = (miniature, item) => {
  const key = getUniqueKey(miniature, item);
  equipmentQuantities.value[key] = (equipmentQuantities.value[key] || 0) + 1;
};

const decreaseQuantity = (miniature, item) => {
  const key = getUniqueKey(miniature, item);
  if (equipmentQuantities.value[key] > 0) {
    equipmentQuantities.value[key] -= 1;
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
.small-btn {
  padding: 2px !important;
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
  border: none !important;
  background: none !important;
  box-shadow: none !important;
}
.small-icon {
  font-size: 16px !important;
}
.wargear-options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.wargear-group {
  flex: 1 1 calc(50% - 1rem);
  box-sizing: border-box;
  border: 1px solid #cdcdcd; /* Dark border */
  padding: 1rem;
  margin-bottom: 1rem;
}
.miniature-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.default-equipment {
  margin-top: 1rem;
}
@media (max-width: 600px) {
  .wargear-options {
    flex-direction: column;
  }
  .wargear-group {
    flex: 1 1 100%;
  }
  .wargear-group h3,
  .wargear-group h4,
  .wargear-options ul,
  .wargear-options li {
    font-size: 0.875rem;
  }
}
</style>
