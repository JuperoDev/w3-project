<template>
  <div>
    <v-dialog width="500">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text="Fav Units"> </v-btn>
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
</script>