<template>
    <v-breadcrumbs :items="items">
      <template v-slot:title="{ item }">
        <span :class="{ 'greyish-font': !isLastItem(item), 'white-font': isLastItem(item) }" :style="{ 'text-decoration': isLastItem(item) ? 'underline' : 'none' }">
          <nuxt-link :to="item.href">{{ item.title.toUpperCase() }}</nuxt-link>
        </span>
      </template>
  
     
      <template v-slot:divider>
        <span class="breadcrumb-divider">/</span>
      </template>
    </v-breadcrumbs>
  </template>
  
  
  <style>
  .greyish-font {
    color: #888; 
  }
  
  .white-font {
    color: #fff; 
  }
  
  .breadcrumb-divider {
    color: white; 
    margin: 0 5px; 
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
  