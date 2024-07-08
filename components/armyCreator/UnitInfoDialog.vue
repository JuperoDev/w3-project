<template>
    <div>
      <v-btn icon small @click="openDialog">
        <v-icon small>mdi-information</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ jsonData?.parentUnit || 'Unit Info' }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text v-if="jsonData" class="pa-0">
            <div class="mobile-datasheet">
              <MobileAttributes :attributes="jsonData.attributes" />
  
              <v-expansion-panels>
                <!-- Ranged weapons -->
                <v-expansion-panel v-if="jsonData.rangedWeapons && jsonData.rangedWeapons.length > 0">
                  <v-expansion-panel-title>
                    <div class="uppercase font-semibold">Ranged weapons</div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <MobileRangedWeapons :rangedWeapons="jsonData.rangedWeapons" />
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <!-- Melee weapons -->
                <v-expansion-panel v-if="jsonData.meleeWeapons && jsonData.meleeWeapons.length > 0">
                  <v-expansion-panel-title>
                    <div class="uppercase font-semibold">Melee Weapons</div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <MobileMeleeWeapons :meleeWeapons="jsonData.meleeWeapons" />
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <!-- Abilities -->
                <v-expansion-panel v-if="jsonData.abilities">
                  <v-expansion-panel-title>
                    <div class="uppercase font-semibold">Abilities</div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <MobileAbilities :abilities="jsonData.abilities" />
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <!-- Transport -->
                <v-expansion-panel v-if="jsonData.transport">
                  <v-expansion-panel-title>
                    <div class="uppercase font-semibold">Transport</div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <MobileTransport :transport="jsonData.transport" />
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <!-- Wargear Abilities -->
                <v-expansion-panel v-if="jsonData.warGearAbilities">
                  <v-expansion-panel-title>
                    <div class="uppercase font-semibold">Wargear Abilities</div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <MobileWarGearAbilities :warGearAbilities="jsonData.warGearAbilities" />
                  </v-expansion-panel-text>
                </v-expansion-panel>
  
                <!-- Keywords -->
                <v-expansion-panel>
                  <v-expansion-panel-title>
                    <div class="uppercase font-semibold">Keywords</div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <MobileKeywords
                      :keywords="jsonData.keywords"
                      :factionKeyword="jsonData.factionKeyword"
                    />
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
  
              <MobileLore :lore="jsonData.lore" />
            </div>
          </v-card-text>
          <v-card-text v-else>
            <p>Loading...</p>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    url: {
      type: String,
      required: true
    }
  });
  
  const dialog = ref(false);
  const jsonData = ref(null);
  
  const fetchJsonData = async () => {
    jsonData.value = null; // Reset previous data
    try {
      const response = await fetch(props.url);
      if (response.ok) {
        jsonData.value = await response.json();
      } else {
        console.error('Failed to load data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const openDialog = () => {
    dialog.value = true;
    fetchJsonData();
  };
  </script>
  
  <style scoped>
  .mobile-datasheet {
    background-color: white;
  }
  
  .uppercase {
    text-transform: uppercase;
  }
  
  .font-semibold {
    font-weight: 600;
  }
  </style>