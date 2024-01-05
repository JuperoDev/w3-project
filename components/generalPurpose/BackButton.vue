<template>
  <div>
    <v-btn @click="goBack">Go Back</v-btn>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const goBack = () => {
      if (route.fullPath === '/xenos/tyranids') {
        // If the current route is /xenos/tyranids, navigate to the root URL
        router.push('/');
      } else {
        // Otherwise, go back in the route history
        window.history.back();
      }
    };

    return {
      goBack,
    };
  },
};
</script>
