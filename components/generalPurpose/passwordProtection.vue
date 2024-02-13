<template>
  <div>
    <div v-if="!hasEnteredPassword" class="p-5">

      
<v-expansion-panels>
  


  <!-- Ranged weapons -->

  
  <v-expansion-panel >
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">caaaaa</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
        
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
  
  <!-- Melee weapons  -->
  
<div class="hidden">
<!-- Does not makes sense to fix vuetify bug like this but DO NOT REMOVE  -->
<v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">Maasd</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</div>
 

  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">vcx</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>

  <!-- Abilities  -->
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">jhhjhj</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>



  <!-- Transport  -->
  <v-expansion-panel >
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">rtrtrt</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>

  <!-- Wargear Abilities -->
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">wewewew</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
       
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>





        <!-- Damaged -->
        <v-expansion-panel >
    <v-expansion-panel-title>
      asddas
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>

  <!-- Wargear Options  -->
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">qweqwe</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        aasas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>

  <!-- leader  -->
  <v-expansion-panel >
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">Leader</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel> 


  
  <!-- unit composition  -->
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">qrwsd</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>


  <!-- keywords  -->
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="uppercase font-semibold">ahahahah</div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        asddas
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
  <!-- end panels  -->
</v-expansion-panels>

      <p>The file you want to see is password protected</p>
      <label for="password">Enter the password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        @keydown.enter="checkPassword"
      />
      <div class="button-container p-5">
      <v-btn>
        <button @click="checkPassword">Submit</button>
      </v-btn>
    </div>
    </div>
    <div v-else>
      <slot />
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      hasEnteredPassword: false,
    };
  },
  methods: {
    checkPassword() {
      if (this.password === "gato") {
        this.hasEnteredPassword = true;
        localStorage.setItem("hasEnteredPassword", "true");
      }
    },
  },
  mounted() {
    this.hasEnteredPassword =
      localStorage.getItem("hasEnteredPassword") === "true";
  },
};
</script>

<style scoped>
input {
  border: 1px solid gainsboro;
}
</style>
