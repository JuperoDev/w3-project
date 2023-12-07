<template>
    <div class="bg-gray-100 h-screen	">
      <!-- <FactionFetch /> -->
      <!-- <v-btn><nuxt-link to="/simulator">Simulator</nuxt-link></v-btn>
      <v-btn><nuxt-link to="/builder">Army Builder</nuxt-link></v-btn>
      <v-btn><nuxt-link to="/rules">Rules</nuxt-link></v-btn> -->

      <!-- temporary build  -->

      <div class=""><h2>Xenos Armies</h2></div>
      <div class="grid grid-cols-2 lg:grid-cols-4">

        <div class="button__container">
          <nuxt-link to="/xenos/aeldari">
        <v-btn> 
          Aeldari

          </v-btn>
        </nuxt-link>
        </div>
       
        <div class="button__container">
          <nuxt-link to="/xenos/drukhari">
        <v-btn> 
          Drukhari

          </v-btn>
        </nuxt-link>
        </div>

        <div class="button__container">
          <nuxt-link to="/xenos/genestealer-cults">
        <v-btn> 
          Genestealer cults

          </v-btn>
        </nuxt-link>
        </div>

        <div class="button__container">
          <nuxt-link to="/xenos/leagues-of-votann">
        <v-btn> 
          Leagues of Votann

          </v-btn>
        </nuxt-link>
        </div>

        <div class="button__container">
          <nuxt-link to="/xenos/necrons">
        <v-btn> 
          Necrons

          </v-btn>
        </nuxt-link>
        </div>

        <div class="button__container">
          <nuxt-link to="/xenos/orks">
        <v-btn> 
          Orks

          </v-btn>
        </nuxt-link>
        </div>

        <div class="button__container">
          <nuxt-link to="/xenos/tau-empire">
        <v-btn> 
          Tau Empire

          </v-btn>
        </nuxt-link>
        </div>
       
        <div class="button__container">
          <nuxt-link to="/xenos/tyranids">
        
<div class="card 1">
  <div class="card_image"> <img src="https://comicvine.gamespot.com/a/uploads/original/10/106251/9084973-gh_icon_hivemind-300x300.png" /> </div>
  <div class="card_title title-white">
    <p>Tyranids</p>
  </div>
</div>
        </nuxt-link>
        </div>

       

      </div>
    </div>
  </template>
  
<script setup>


</script>

<style scoped>
    h2{
      font-size: 50px;
      font-weight: 700;
      color: #191919;
      text-transform: uppercase;
    }

    
.card {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  cursor: pointer;
  transition: 0.4s;
  background-color: #fff;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-top: -80px;
  height: 40px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0,0,0,0.25), 
    -5px -5px 30px 15px rgba(0,0,0,0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}
</style>