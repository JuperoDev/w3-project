<template>
    <div>
      <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600">
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
    }
  });
  
  const dialog = ref(false);
  const formattedDetails = ref('');
  const armyStore = useArmyStorage();
  
  const army = computed(() => {
    return armyStore.armies[props.armyIndex];
  });
  
  const formatArmyDetails = (army) => {
    let result = `${army.name} (${armyStore.getTotalPoints(props.armyIndex)} Points)\n\n`;
    result += `Faction: ${army.selectedFaction}\n`;
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
  
    return result.trim();
  };
  
  const formatUnitDetails = (unit) => {
    let result = `${unit.unitName} (${unit.basicPoints} Points)\n`;
    unit.composition.forEach(comp => {
      result += `    • ${comp.quantity}x ${comp.unitType}\n`;
      unit.equipment.forEach(equip => {
        if (unit.equipmentQuantities[equip] > 0) {
          result += `        • ${unit.equipmentQuantities[equip]}x ${equip}\n`;
        }
      });
    });
    return result.trim();
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
    padding: 1rem;
    border-radius: 0.5rem;
    white-space: pre-wrap;
  }
  </style>
  