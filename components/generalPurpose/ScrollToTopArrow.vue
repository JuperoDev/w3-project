<template>
    <div class="scroll-to-top" v-if="showScrollToTopArrow" @click="scrollToTop">
      &#8593; <!-- Unicode character for up arrow -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const showScrollToTopArrow = ref(false);
  
  const handleScroll = () => {
    showScrollToTopArrow.value = window.scrollY > 200;
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #323232;
    color: #fff;
    border-radius: 50%;
    z-index: 999;
  }
  </style>
  