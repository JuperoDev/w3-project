<template>
       <!-- Floating Footer -->
        <div class="floating-footer__container mt-16"> 
       <div class="floating-footer__wrapper flex justify-around items-center p-3 bg-black text-white">
           <span><nuxt-link to="/armycreator"> Army Creator</nuxt-link></span>
        <span><nuxt-link to="/">Home</nuxt-link></span>
      <!-- <span>Option 3</span> -->
    </div>
</div>
</template>

<style scoped>
    .floating-footer__wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; 
  z-index: 10;
  
}

</style>