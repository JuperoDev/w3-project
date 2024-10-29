<template>
  <v-breadcrumbs :items="items">
    <!-- Title Slot for Breadcrumb Items -->
    <template v-slot:title="{ item, index }">
      <!-- Regular breadcrumb items as clickable links, except for the third item when it's the dummy component -->
      <span v-if="index !== 2 || routeParts.length !== 3" 
            :class="{ 'greyish-font': !isLastItem(item), 'white-font': isLastItem(item) }" 
            :style="{ 'text-decoration': isLastItem(item) ? 'underline' : 'none' }">
        <nuxt-link v-if="item.href" :to="item.href">{{ item.title.toUpperCase() }}</nuxt-link>
        <span v-else>{{ item.title.toUpperCase() }}</span>
      </span>
      <!-- Third item uses the Dummy component as static text if there are exactly 3 route params -->
      <span v-else>
        <NavbarComponentsDummy :triggerText="formatTitle(routeParts[1])"></NavbarComponentsDummy>
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

    // Limit to Home + 2 items, with max 3 breadcrumb items displayed
    const maxItems = Math.min(routeParts.value.length, 2);
    for (let i = 0; i < maxItems; i++) {
      const part = routeParts.value[i];
      const title = part.replace(/-/g, ' ').toUpperCase();
      const item = {
        title,
        disabled: false,
        href: i === 1 && routeParts.value.length === 3 ? null : href + part + '/',
      };
      href += part + '/';
      items.value.push(item);
    }
  }
}

function isLastItem(item) {
  return items.value[items.value.length - 1] === item;
}

function formatTitle(part) {
  return part.replace(/-/g, ' ').toUpperCase();
}
</script>
