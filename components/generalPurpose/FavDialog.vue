<template>
    <div>
        <v-dialog width="500">
  <template v-slot:activator="{ props }">
    <v-btn v-bind="props" text="Fav Units"> </v-btn>
  </template>

  <template v-slot:default="{ isActive }">
    <v-card title="Favorite Units">
      <v-card-text>
        Here is a list of units saved for rapid access.
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
 