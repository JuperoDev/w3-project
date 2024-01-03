<template>
    <div>
        <v-dialog width="500">
  <template v-slot:activator="{ props }">
    <v-btn v-bind="props" text="Fav Units"> </v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="Favorite Units">
      <v-card-text>
       <div><h1>{{ unitStore.elements }}</h1><h1>{{ unitStore.info }}</h1></div>
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
import { useUnitStore} from '~/stores/UnitStore'

const unitStore = useUnitStore()
</script>