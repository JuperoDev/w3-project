<template>
    <v-breadcrumbs :items="items">
      <template v-slot:title="{ item }">
        <span :class="{ 'greyish-font': !isLastItem(item), 'white-font': isLastItem(item) }" :style="{ 'text-decoration': isLastItem(item) ? 'underline' : 'none' }">
          <nuxt-link :to="item.href">{{ item.title.toUpperCase() }}</nuxt-link>
        </span>
      </template>
  
      <!-- Customizing the divider -->
      <template v-slot:divider>
        <span class="breadcrumb-divider">/</span>
      </template>
    </v-breadcrumbs>
  </template>
  
  
  <style>
  .greyish-font {
    color: #888; /* Change this to the desired greyish color */
  }
  
  .white-font {
    color: #fff; /* Change this to the desired white color */
  }
  
  .breadcrumb-divider {
    color: white; /* Set the color of the divider */
    margin: 0 5px; /* Adjust spacing as needed */
  }
  </style>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const items = ref([]);
  
  onMounted(() => {
    updateBreadcrumbs();
  });
  
  router.afterEach(() => {
    updateBreadcrumbs();
  });
  
  function updateBreadcrumbs() {
    const routeParts = router.currentRoute.value.path.split('/').filter(Boolean);
    if (routeParts.length > 0) {
      let href = '/';
      items.value = [
        {
          title: 'Home',
          disabled: false,
          href: '/',
        },
      ];
      const maxItems = Math.min(routeParts.length, 2); // Limiting to the first three elements
      for (let i = 0; i < maxItems; i++) {
        const part = routeParts[i];
        const title = part.replace(/-/g, ' ').toUpperCase();
        const item = {
          title,
          disabled: false,
          href: href + part + '/',
        };
        href += part + '/';
        items.value.push(item);
      }
    }
  }
  
  function handleClick(item) {
    router.push(item.href);
  }
  
  function isLastItem(item) {
    return items.value[items.value.length - 1] === item;
  }
  </script>
  