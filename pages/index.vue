

<template>
  <div class=" bg-stone-100 p-2 h-screen">
    <div class=" bg-white border border-black-500">


   
    
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
    
    
    
    </div>
    <!-- <nuxt-link>
          <v-btn class="w-56 m-5">Army Builder</v-btn>
        </nuxt-link> -->
  </div>
</template>




<style scoped>
h2 {
  font-size: 40px;
  font-weight: 500;
  color: #191919;
  text-transform: uppercase;
  
}



</style>
