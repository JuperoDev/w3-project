<template>
    <div>
      
      <nuxt />
    </div>
  </template>
  
  <script setup>
  import { useHead } from '@nuxt/content'
  
  useHead({
    title: 'WH40K Data',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
      }
    ]
  })
  </script>
  