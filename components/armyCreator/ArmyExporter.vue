<template>
  <div>
    <!-- Dialog for displaying Army details -->
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600" min-width="380px">
      <v-card>
        <v-card-title>
          <span class="headline">Army Details</span>
        </v-card-title>
        <v-card-text>
          <!-- Button to copy the currently displayed details (either formatted or simplified) -->
          <v-btn @click="copyToClipboard" class="mb-4">
            Copy to Clipboard
          </v-btn>
          <!-- Button specifically for exporting the simplified list -->
          <!-- <v-btn @click="copySimplifiedArmyDetails" class="mb-4">
            Export Simplified
          </v-btn> -->
          <!-- Switch to toggle between detailed and simplified views with dynamic label -->
          <v-switch
            v-model="showSimplified"
            :label="switchLabel"
            class="mb-4"
          ></v-switch>
          <!-- Display either the full or simplified army details based on the switch -->
          <pre class="formatted-army-details">
            {{ showSimplified ? simplifiedDetails : formattedDetails }}
          </pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Button to open the export dialog -->
    <v-btn color="grey-darken-3 mt-4" @click="openDialog">
      EXPORT
    </v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useArmyStorage } from '@/stores/armyStorage';

// Props for army details and points
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

// Component state variables
const dialog = ref(false);
const showSimplified = ref(false);
const formattedDetails = ref('');
const simplifiedDetails = ref('');
const armyStore = useArmyStorage();

// Computed label for the switch
const switchLabel = computed(() => (showSimplified.value ? "Simplified List" : "Complete List"));

// Computed army data based on the provided index
const army = computed(() => armyStore.armies[props.armyIndex]);

// Functions to format the full and simplified details
const formatArmyDetails = (army) => {
  // Full army details format
  let result = `${army.name.trim()} (${props.totalPoints} Points)\n`; // Trim any extra spaces
  result += `Army: ${army.selectedArmy}\n`;
  result += `Detachment: ${army.selectedDetachment}\n`;
  result += `Strike Force (${army.pointList} Points)\n\n`;

  if (army.characterUnits.length > 0) {
    result += '\n + CHARACTERS + \n\n';
    army.characterUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n\n';
    });
  }

  // Additional sections for other unit types (battleline, transports, etc.) follow similar patterns
  if (army.battlelineUnits.length > 0) {
    result += '\n + BATTLELINE + \n\n';
    army.battlelineUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n\n';
    });
  }

  if (army.dedicatedTransportUnits.length > 0) {
    result += '\n + DEDICATED TRANSPORTS + \n\n';
    army.dedicatedTransportUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n\n';
    });
  }

  if (army.otherUnits.length > 0) {
    result += '\n + OTHER DATASHEETS + \n\n';
    army.otherUnits.forEach(unit => {
      result += formatUnitDetails(unit) + '\n\n';
    });
  }

  if (army.alliedUnits && army.alliedUnits.length > 0) {
    result += '\n + ALLIED UNITS + \n\n';
    const groupedAlliedUnits = groupAlliedUnitsByArmy(army.alliedUnits);
    for (const [alliedArmy, units] of Object.entries(groupedAlliedUnits)) {
      result += `\n${alliedArmy.toUpperCase()}\n`;
      units.forEach(unit => {
        result += formatUnitDetails(unit) + '\n\n';
      });
    }
  }

  result += "Created with Deep Strike Army Builder";
  return result.trim();
};

const formatSimplifiedArmyDetails = (army) => {
  // Simplified army details format with line-by-line trimming
  let result = `${army.name.trim()} (${props.totalPoints} Points)\n`; // Trim extra spaces in the title
  result += `Army: ${army.selectedArmy.trim()}\n`;
  result += `Detachment: ${army.selectedDetachment.trim()}\n`;
  result += `Strike Force (${army.pointList} Points)\n\n`;

  const sections = [];

  if (army.characterUnits.length > 0) {
    let characterSection = '\n + CHARACTERS + \n\n';
    characterSection += army.characterUnits.map(unit => {
      let unitText = `${unit.unitName} (${unit.basicPoints} Points)`;
      if (unit.isWarlord) unitText += ` [Warlord]`;
      if (unit.selectedEnhancement) {
        unitText += `\n  Enhancement: ${unit.selectedEnhancement.name} (${unit.selectedEnhancement.points} Points)`;
      }
      return unitText.trim(); // Trim spaces from each unit entry
    }).join('\n\n');
    sections.push(characterSection);
  }

  if (army.battlelineUnits.length > 0) {
    let battlelineSection = '\n + BATTLELINE + \n\n';
    battlelineSection += army.battlelineUnits.map(unit => {
      const totalMiniatures = unit.composition.reduce((sum, comp) => sum + comp.quantity, 0);
      return `${unit.unitName} ${totalMiniatures > 1 ? `(x${totalMiniatures}, ${unit.basicPoints} Points)` : `(${unit.basicPoints} Points)`}`.trim();
    }).join('\n\n');
    sections.push(battlelineSection);
  }

  if (army.otherUnits.length > 0) {
    let otherSection = '\n + OTHER DATASHEETS + \n\n';
    otherSection += army.otherUnits.map(unit => {
      const totalMiniatures = unit.composition.reduce((sum, comp) => sum + comp.quantity, 0);
      return `${unit.unitName} ${totalMiniatures > 1 ? `(x${totalMiniatures}, ${unit.basicPoints} Points)` : `(${unit.basicPoints} Points)`}`.trim();
    }).join('\n\n');
    sections.push(otherSection);
  }

  if (army.alliedUnits && army.alliedUnits.length > 0) {
    let alliedSection = '\n + ALLIES + \n\n'; // Add "ALLIES" header
    const groupedAlliedUnits = groupAlliedUnitsByArmy(army.alliedUnits);
    for (const [alliedArmy, units] of Object.entries(groupedAlliedUnits)) {
      alliedSection += `${alliedArmy.toUpperCase()}:\n`; // Allied army name in uppercase
      alliedSection += units.map(unit => {
        const totalMiniatures = unit.composition.reduce((sum, comp) => sum + comp.quantity, 0);
        return `  ${unit.unitName} ${totalMiniatures > 1 ? `(x${totalMiniatures}, ${unit.basicPoints} Points)` : `(${unit.basicPoints} Points)`}`;
      }).join('\n\n');
      alliedSection += '\n\n'; // Separate each allied army with a new line
    }
    sections.push(alliedSection.trim());
  }

  result += sections.map(section => section.trim()).join('\n\n'); // Trim extra spaces in each section
  return result.trim();
};


// Utility function to group allied units by army
const groupAlliedUnitsByArmy = (units) => {
  return units.reduce((acc, unit) => {
    const army = unit.alliedArmy || 'Other';
    if (!acc[army]) acc[army] = [];
    acc[army].push(unit);
    return acc;
  }, {});
};

// Function to format unit details, used in full army details
const formatUnitDetails = (unit) => {
  let result = `${unit.unitName} (${unit.basicPoints} Points)\n`;
  if (unit.isWarlord) result += `[Warlord]\n`;

  // Additional logic for unit composition and enhancements
  if (unit.composition && unit.composition.length > 0) {
    unit.composition.forEach(comp => {
      result += `• ${comp.quantity}x ${comp.unitType}\n`;
      const equipmentForType = Object.entries(unit.equipmentQuantities || {})
        .filter(([key, quantity]) => key.startsWith(comp.unitType) && quantity > 0)
        .map(([key, quantity]) => `   ◦ ${quantity}x ${key.split('_')[1]}`);
      if (equipmentForType.length > 0) result += equipmentForType.join('\n') + '\n';
    });
  }

  if (unit.selectedEnhancement) {
    result += `• Enhancements: ${unit.selectedEnhancement.name} (${unit.selectedEnhancement.points} Points)\n`;
  }

  return result.trim();
};

// Copy current view (formatted or simplified) to clipboard
const copyToClipboard = () => {
  const details = showSimplified.value ? simplifiedDetails.value : formattedDetails.value;
  navigator.clipboard.writeText(details).then(() => {
    // alert(`${showSimplified.value ? 'Simplified' : 'Detailed'} list copied to clipboard!`);
  });
};

// Initial setup when dialog opens
const openDialog = () => {
  formattedDetails.value = formatArmyDetails(army.value);
  simplifiedDetails.value = formatSimplifiedArmyDetails(army.value);
  dialog.value = true;
};
</script>

<style scoped>
.formatted-army-details {
  background-color: #f8f8f8;
  padding: 0 !important; /* Force remove any padding */
  margin: 0 !important; /* Force remove any margin */
  border-radius: 0.5rem;
  white-space: pre-wrap;
  font-family: monospace;
  line-height: 1.2; /* Adjust line-height for tighter vertical spacing */
  display: flex; /* Use flex to align items tightly */
  align-items: flex-start; /* Align content to the top */
}
</style>
