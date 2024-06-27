<template>
  <div>
    <v-btn @click="openDialog">Enhancement</v-btn>
    <v-dialog v-model="isDialogOpen" max-width="800" min-width="380">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title>Enhancements</v-card-title>
          <v-card-text>
            <div v-if="enhancements.length">
              <v-expansion-panels v-model="expandedPanels">
                <v-expansion-panel v-for="(enhancement, index) in enhancements" :key="index">
                  <v-expansion-panel-title>
                    {{ enhancement.name }} ({{ enhancement.points }} points)
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <p><i>{{ enhancement.lore }}</i></p>
                    <br/>
                    <p>{{enhancement.description}}</p>
                    <v-checkbox
                      :label="'Include this enhancement'"
                      :value="enhancement"
                      :input-value="selectedEnhancement === enhancement"
                      @change="toggleEnhancement(enhancement)"
                    ></v-checkbox>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div v-else>
              No enhancements found.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isDialogOpen = false">Close</v-btn>
            <v-btn text="Save" @click="saveEnhancement">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import {
  VBtn,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VSpacer,
  VCheckbox,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
  VExpansionPanelText
} from 'vuetify/components';

export default {
  name: 'ArmyBuilderEnhancements',
  props: {
    url: String,
    detachment: String,
  },
  emits: ['save-enhancement'],
  setup(props, { emit }) {
    const isDialogOpen = ref(false);
    const enhancements = ref([]);
    const selectedEnhancement = ref(null);
    const expandedPanels = ref([]);

    const openDialog = async () => {
      isDialogOpen.value = true;
      await fetchEnhancements();
    };

    const fetchEnhancements = async () => {
      try {
        const detachmentFile = `${props.url}/detachment/${props.detachment.replace(/\s+/g, '-').toLowerCase()}.json`;
        const res = await fetch(`/faction/${detachmentFile}`);
        const data = await res.json();
        enhancements.value = data.enhacements || [];
      } catch (error) {
        console.error("Fetch Error: ", error);
        enhancements.value = [];
      }
    };

    const toggleEnhancement = (enhancement) => {
      if (selectedEnhancement.value === enhancement) {
        selectedEnhancement.value = null;
      } else {
        selectedEnhancement.value = enhancement;
      }
    };

    const saveEnhancement = () => {
      if (selectedEnhancement.value) {
        emit('save-enhancement', selectedEnhancement.value);
      }
      isDialogOpen.value = false;
    };

    watch(() => props.detachment, fetchEnhancements);

    return {
      isDialogOpen,
      enhancements,
      selectedEnhancement,
      expandedPanels,
      openDialog,
      saveEnhancement,
      toggleEnhancement,
    };
  },
  components: {
    VBtn,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VSpacer,
    VCheckbox,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelTitle,
    VExpansionPanelText
  }
};
</script>

<style scoped>
.enhancement-item {
  margin-bottom: 20px;
}
</style>
