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
/* Updated CSS to allow scrolling but disable bounce effect */
html, body {
  overscroll-behavior-y: contain; /* Limits bounce effect without disabling scroll */
  height: 100%;
}

.app-container {
  overflow-y: auto; /* Enables vertical scrolling */
  height: 100vh; /* Takes full viewport height for consistent behavior */
}
</style>
