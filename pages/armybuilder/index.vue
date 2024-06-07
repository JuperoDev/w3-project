<template>
    <div>
    <h1>Army Builder</h1>

    <v-stepper :items="['', '', '','']">
        <template v-slot:item.1>
          <v-card title="Choose Army" flat>
            <p>Tyranids</p>
        <p>Necrons</p>
        <p>Orks</p>
          </v-card>
        </template>
      
        <template v-slot:item.2>
          <v-card title="Choose Battle Size" flat>
          
            <ArmyBuilderSize/>
          </v-card>
        </template>
      
        <template v-slot:item.3>
          <v-card title="Choose Detachment" flat><ArmyBuilderDetachment/></v-card>
        </template>
     

      <template v-slot:item.4>
          <v-card title="Summary" flat>...</v-card>
        </template>
        
      </v-stepper>
    </div>
</template>

<style>
    
</style>

<script setup>
  import { VStepper } from 'vuetify/labs/VStepper'
</script>