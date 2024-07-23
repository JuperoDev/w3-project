<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600" min-width="380px">
      <v-card>
        <v-card-title>
          <span class="headline">Army Details</span>
        </v-card-title>
        <v-card-text>
          <v-btn color="primary" @click="copyFormattedArmyDetails" class="mb-4">
            Copy to Clipboard
          </v-btn>
          <pre class="formatted-army-details">{{ formattedDetails }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="red" @click="openDialog">
      EXPORT
    </v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useArmyStorage } from '@/stores/armyStorage';

const props = defineProps({
  armyIndex: {
    type: Number,
    required: true
  },
  totalPoints: {
    type: Number,
    required: true
  }
});

const dialog = ref(false);
const formattedDetails = ref('');
const armyStore = useArmyStorage();

const army = computed(() => {
  return armyStore.armies[props.armyIndex];
});

const formatArmyDetails = (army) => {
  let result = `${army.name} (${props.totalPoints} Points)\n\n`;
  result += `Army: ${army.selectedArmy}\n`;
  result += `Detachment: ${army.selectedDetachment}\n`;
  result += `Strike Force (${army.pointList} Points)\n\n`;

  result += `CHARACTERS\n`;
  army.characterUnits.forEach(unit => {
    result += formatUnitDetails(unit) + '\n\n';
  });

  result += `BATTLELINE\n`;
  army.battlelineUnits.forEach(unit => {
    result += formatUnitDetails(unit) + '\n\n';
  });

  result += `OTHER DATASHEETS\n`;
  army.otherUnits.forEach(unit => {
    result += formatUnitDetails(unit) + '\n\n';
  });

  result += `Created with Rapid Ingress`;

  return result.trim();
};

const formatUnitDetails = (unit) => {
  let result = `${unit.unitName} (${unit.basicPoints} Points)\n`;
  
  if (!unit.unitTypes || !unit.unitComposition || !unit.equipmentQuantities) {
    console.error('Missing unit details for:', unit);
    return result + '    • Error: Missing unit details\n';
  }

  const formattedEquipment = getFormattedEquipment(unit.unitTypes, unit.unitComposition, unit.equipmentQuantities);

  Object.entries(formattedEquipment).forEach(([type, details]) => {
    result += ` • ${details.count}x ${type}\n`;
    Object.entries(details.equipment).forEach(([item, quantity]) => {
      result += `    • ${item} x${quantity}\n`;
    });
  });

  if (unit.selectedEnhancement) {
    result += `    • Enhancements: ${unit.selectedEnhancement.name} (${unit.selectedEnhancement.points} Points)\n`;
  }
  
  return result.trim();
};

const getFormattedEquipment = (unitTypes, unitComposition, equipmentQuantities) => {
  const list = {};
  const grouped = {};

  Object.entries(equipmentQuantities).forEach(([key, value]) => {
    list[key.toLowerCase()] = value;
  });

  unitComposition.forEach(unit => {
    const lowerUnitType = unit.unitType.toLowerCase();
    grouped[lowerUnitType] = {
      count: unit.quantity,
      equipment: {}
    };
  });

  Object.entries(list).forEach(([item, quantity]) => {
    if (quantity > 0) {
      const [unitType, equipment] = item.split('_');
      if (grouped[unitType]) {
        grouped[unitType].equipment[equipment] = quantity;
      }
    }
  });

  return grouped;
};

const copyFormattedArmyDetails = () => {
  navigator.clipboard.writeText(formattedDetails.value).then(() => {
    alert('Army details copied to clipboard!');
  });
};

const openDialog = () => {
  formattedDetails.value = formatArmyDetails(army.value);
  dialog.value = true;
};
</script>

<style scoped>
.formatted-army-details {
  background-color: #f8f8f8;
  padding: 10px;
  margin: -8px;
  border-radius: 0.5rem;
  white-space: pre-wrap;
}
</style>
