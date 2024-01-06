<template>
  <div>
    <!-- <v-btn @click="goBack">Go Back</v-btn> -->
    <v-btn>
      <nuxt-link v-if="faction && army" :to="`/${faction}/${army}`">Back</nuxt-link>
    </v-btn>
   
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const routeParams = useRoute().params;
    const faction = routeParams.faction;
    const army = routeParams.army;

    //computed property to dynamically generate the button text to prevent undefined. 'faction' and 'army' variables are not defined in the initial render. They are being calculated asynchronously in the setup function using useRoute().params, but the template is rendered before these values are available.
    const buttonText = `${faction}/${army}`;

    return {
      faction,
      army,
      buttonText,   
    };
  },
};
</script>
