<template>
    <div class="error-page">
      <h1>Error {{ error.statusCode }}</h1>
      <p>{{ error.message }}</p>
      <p v-if="error.statusCode === 404">The page you are looking for was not found.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
  
  <script setup>
  import { useError } from 'nuxt/app'
  
  const error = useError()
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    padding: 20px;
  }
  </style>
  