<template>
  <div>
    <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn v-if="unitStore.elements.length > 0" v-bind="props" text="Fav Units"> </v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Favorite Units">
          <v-card-text>
            <div>
              <ul>
                <div class="fav-unit__list py-2 my-1" v-for="(element, index) in unitStore.elements" :key="index">
                  <v-btn>
                    <nuxt-link :to="generateLink(unitStore.info[index])">{{ element }}</nuxt-link>
                  </v-btn>
                  <v-btn icon @click="removeFavoriteUnit(index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </div>
              </ul>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text="Close"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
import { useUnitStore } from '~/stores/UnitStore'

const unitStore = useUnitStore()

const generateLink = (info) => {
  const baseURL = process.env.VUE_APP_BASE_URL || ''; // Get the base URL from environment variables or configuration
  const urlParts = info.split('/'); // Split the URL into parts
  const filteredParts = urlParts.filter(part => part !== 'faction' && part !== 'collection'); // Remove 'faction' and 'collection' if present
  return `${baseURL}${filteredParts.join('/')}`;
}

const removeFavoriteUnit = (index) => {
  // Remove the favorite unit at the specified index from unitStore.elements and unitStore.info
  if (index >= 0 && index < unitStore.elements.length) {
    unitStore.elements.splice(index, 1);
    unitStore.info.splice(index, 1);
  }
}
</script>
