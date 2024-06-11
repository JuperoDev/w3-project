<template>
  <div>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Unit Info"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Dialog">
          <v-card-text>
            <!-- Print the constructed URL -->
            <!-- {{ constructedURL }} -->
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close Dialog"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup>
  // Define props
   const props = defineProps({
    url: String,
     unit: Object
   });

  // Construct the URL
  // const constructedURL = `faction/${props.url}/${unitURLName(props.unit.unitName)}.json`;

  // Function to convert unit name to URL-friendly format
  // const unitURLName = (name) => {
    // Replace spaces and special characters with hyphens and convert to lowercase
    // return name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
  // };
</script>
