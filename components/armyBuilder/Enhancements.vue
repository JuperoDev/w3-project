<template>
  <div>
    <v-btn @click="openDialog">Open Dialog</v-btn>
    <v-dialog v-model="isDialogOpen" max-width="500">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title>Dialog</v-card-title>
          <v-card-text>This is a simple dialog.</v-card-text>
          <v-card-actions>
            <v-btn text="Close" @click="isDialogOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DialogButton',
  setup() {
    const isDialogOpen = ref(false);

    const openDialog = () => {
      isDialogOpen.value = true;
    };

    return {
      isDialogOpen,
      openDialog,
    };
  },
};
</script>

