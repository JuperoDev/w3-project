<template>
  <div>
    <v-btn @click="openDialog">Open Dialog</v-btn>
    <v-dialog v-model="isDialogOpen" max-width="800" min-width="380">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-title>Enhancements</v-card-title>
          <v-card-text>
            <div v-if="enhancements.length">
              <div v-for="enhancement in enhancements" :key="enhancement.name" class="enhancement-item">
                <strong>{{ enhancement.name }}</strong> ({{ enhancement.points }} points)
                <p v-html="enhancement.description"></p>
              </div>
            </div>
            <div v-else>
              No enhancements found.
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="isDialogOpen = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'DialogButton',
  props: {
    url: String,
    detachment: String,
  },
  setup(props) {
    const isDialogOpen = ref(false);
    const enhancements = ref([]);

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

    watch(() => props.detachment, fetchEnhancements);

    return {
      isDialogOpen,
      enhancements,
      openDialog,
    };
  },
};
</script>

<style scoped>
.enhancement-item {
  margin-bottom: 20px;
}
</style>
