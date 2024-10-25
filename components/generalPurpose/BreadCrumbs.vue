<template>
  <v-breadcrumbs :items="items">
    <!-- Title Slot for Breadcrumb Items -->
    <template v-slot:title="{ item, index }">
      <!-- Show the dummy component if there are exactly 3 route parts and this is the third item -->
      <span v-if="index !== 2 || routeParts.length !== 3" 
            :class="{ 'greyish-font': !isLastItem(item), 'white-font': isLastItem(item) }" 
            :style="{ 'text-decoration': isLastItem(item) ? 'underline' : 'none' }">
        <nuxt-link :to="item.href">{{ item.title.toUpperCase() }}</nuxt-link>
      </span>
      <!-- Third item uses the Dummy component if there are exactly 3 route parts -->
      <span v-else>
        <NavbarComponentsDummy triggerText="Custom Dropdown Text"></NavbarComponentsDummy>
      </span>
    </template>

    <!-- Divider Slot for Breadcrumbs -->
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
const routeParts = ref([]);

onMounted(() => {
  updateBreadcrumbs();
});

router.afterEach(() => {
  updateBreadcrumbs();
});

function updateBreadcrumbs() {
  routeParts.value = router.currentRoute.value.path.split('/').filter(Boolean);
  
  if (routeParts.value.length > 0) {
    let href = '/';
    items.value = [
      {
        title: 'Home',
        disabled: false,
        href: '/',
      },
    ];

    // Add route parts to the breadcrumb but limit to 3 items (Home + 2 more)
    const maxItems = Math.min(routeParts.value.length, 2); // Max 2 items from routeParts, Home is always included
    for (let i = 0; i < maxItems; i++) {
      const part = routeParts.value[i];
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
