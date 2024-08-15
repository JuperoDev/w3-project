<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600" min-width="380px">
      <v-card>
        <v-card-title>
          <span class="headline">Army Details</span>
        </v-card-title>
        <v-card-text>
          <v-btn @click="copyFormattedArmyDetails" class="mb-4">
            Copy to Clipboard
          </v-btn>
          <pre class="formatted-army-details">{{ formattedDetails }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="grey-darken-3 mt-4" @click="openDialog">
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
  let result = `${army.name} (${props.totalPoints} Points)\n`;
  result += `Army: ${army.selectedArmy}\n`;
  result += `Detachment: ${army.selectedDetachment}\n`;
  result += `Strike Force (${army.pointList} Points)\n\n`;

  if (army.characterUnits.length > 0) {
    result += `CHARACTERS\n`;
    army.characterUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n';
    });
  }

  if (army.battlelineUnits.length > 0) {
    result += `BATTLELINE\n`;
    army.battlelineUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n';
    });
  }

  if (army.dedicatedTransportUnits.length > 0) {
    result += `DEDICATED TRANSPORTS\n`;
    army.dedicatedTransportUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n';
    });
  }

  if (army.otherUnits.length > 0) {
    result += `OTHER DATASHEETS\n`;
    army.otherUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n';
    });
  }

  // Add Allied Units
  if (army.alliedUnits && army.alliedUnits.length > 0) {
    result += `\nALLIED UNITS\n`;
    const groupedAlliedUnits = groupAlliedUnitsByArmy(army.alliedUnits);
    for (const [alliedArmy, units] of Object.entries(groupedAlliedUnits)) {
      result += `\n${alliedArmy.toUpperCase()}\n`;
      units.forEach(unit => {
        result += formatUnitDetails(unit) + '\n';
      });
    }
  }

  result += `Created with Deep Strike Army Builder`;

  return result.trim();
};

// Function to group allied units by their alliedArmy field
const groupAlliedUnitsByArmy = (units) => {
  return units.reduce((acc, unit) => {
    const army = unit.alliedArmy || 'Other';
    if (!acc[army]) {
      acc[army] = [];
    }
    acc[army].push(unit);
    return acc;
  }, {});
};

const formatUnitDetails = (unit) => {
  let result = `${unit.unitName} (${unit.basicPoints} Points)\n`;

  if (unit.isWarlord) {
    result += `[Warlord]\n`;
  }

  if (unit.composition && unit.composition.length > 0) {
    unit.composition.forEach(comp => {
      result += `• ${comp.quantity}x ${comp.unitType}\n`;

      // Group equipment by unit type in a case-insensitive manner
      const equipmentForType = Object.entries(unit.equipmentQuantities)
        .filter(([key, quantity]) => key.toLowerCase().startsWith(comp.unitType.toLowerCase()) && quantity > 0)
        .map(([key, quantity]) => {
          const equipment = key.split('_')[1];
          return `${quantity}x ${equipment}`;
        });

      if (equipmentForType.length > 0) {
        result += equipmentForType.map(item => `  ◦ ${item}`).join('\n') + '\n';
      }
    });
  }

  if (unit.selectedEnhancement) {
    result += `• Enhancements: ${unit.selectedEnhancement.name} (${unit.selectedEnhancement.points} Points)\n`;
  }

  return result;
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
  font-family: monospace;
}
</style>
