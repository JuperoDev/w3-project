<template>
  <div class="app-container">
    <GeneralPurposePasswordProtection>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </GeneralPurposePasswordProtection>
    <GeneralPurposeScrollToTopArrow />
  </div>
</template>

<script setup>
// No additional script setup needed
</script>

<style>
:root {
  overscroll-behavior: none;
}
</style>
