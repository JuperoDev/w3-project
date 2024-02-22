<template>
  <div>
    
    <GeneralPurposePasswordProtection>   

   
    
    <!-- <v-btn><nuxt-link to="/simulator">Simulator</nuxt-link></v-btn>
      <v-btn><nuxt-link to="/builder">Army Builder</nuxt-link></v-btn>
      <v-btn><nuxt-link to="/rules">Rules</nuxt-link></v-btn> -->

    <!-- temporary build  -->

    <div class="font-bebas flex items-center justify-center"><h2>Avaliable Armies</h2>
      </div>
    <!-- <div class="grid grid-cols-2 lg:grid-cols-4"> -->
      <div class=" flex items-center justify-center">

        <GeneralPurposeSearchBar/>
      </div>
      <div class=" flex items-center justify-center">
        
      <FactionFetch />


     


    </div>
    </GeneralPurposePasswordProtection>    
  </div>
</template>


<script setup>

import passwordProtection from '~/middleware/passwordProtection';

// Specify middleware for protected routes
const middleware = [passwordProtection];
</script>

<style scoped>
h2 {
  font-size: 50px;
  font-weight: 500;
  color: #191919;
  text-transform: uppercase;
  
}

.army__card {
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
  width: 150px;
  height: 150px;
  border-radius: 6px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.15),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: 0.4s;
  /* background-color: #fff; */
}

.army__card .army__card_image {
  width: 130px;
  height: 130px;
  border-radius: 40px;
  margin: 0 auto;
}

.army__card .army__card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.army__card .army__card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: Impact, sans-serif;
  text-transform: uppercase;
  font-size: 17px;
  margin-top: -15px;
  height: 40px;
}

.army__card:hover {
  transform: scale(1.1, 1.1);
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
  background-color: rgb(255, 255, 255);
}

.title-white {
  font-size: 20px;

  color: rgb(25, 25, 25);
}

.title-black {
  color: black;

}




</style>
