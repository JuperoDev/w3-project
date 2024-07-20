<template>
  <div>
    <v-btn icon small @click="dialog = true">
      <v-icon small>mdi-cog</v-icon>
      <!-- <span>Wargear Options</span> -->
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Wargear Options</v-card-title>
        <v-card-text>
          <div v-if="defaultEquipment.length">
            <h3>Default Equipment</h3>
            <ul>
              <li v-for="item in defaultEquipment" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div v-for="(options, miniature) in groupedWargear" :key="miniature">
            <h3>{{ miniature }}</h3>
            <ul>
              <li v-for="option in options" :key="option.description">
                <div class="flex items-center">
                  <span>{{ option.description }}</span>
                  <v-btn icon small @click="decrementWargear(option.items)">
                    <v-icon small>mdi-minus</v-icon>
                  </v-btn>
                  <span>{{ selectedWargear[option.items] || 0 }}</span>
                  <v-btn icon small @click="incrementWargear(option.items)">
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </li>
            </ul>
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
import { ref, computed } from 'vue';

const props = defineProps({
  wargear: {
    type: Array,
    required: true
  },
  defaultEquipment: {
    type: Array,
    required: true
  }
});

const dialog = ref(false);
const selectedWargear = ref({});

const groupedWargear = computed(() => {
  return props.wargear.reduce((acc, item) => {
    if (!acc[item.miniature]) {
      acc[item.miniature] = [];
    }
    acc[item.miniature].push(item);
    return acc;
  }, {});
});

const incrementWargear = (items) => {
  items.forEach(item => {
    selectedWargear.value[item] = (selectedWargear.value[item] || 0) + 1;
  });
};

const decrementWargear = (items) => {
  items.forEach(item => {
    if (selectedWargear.value[item]) {
      selectedWargear.value[item] -= 1;
    }
  });
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
</style>
