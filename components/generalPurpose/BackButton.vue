<template>
  <div>
    <v-btn @click="goBack">Go Back</v-btn>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const goBack = () => {
      // Use router.back() to go back to the previous route
      router.back();
    };

    return {
      goBack,
    };
  },
};
</script>
