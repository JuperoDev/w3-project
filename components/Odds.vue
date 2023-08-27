<template>
    <div class="battle-container">
      <div class="attacker">
        <h2>Attacker</h2>
        <div class="input-group">
          <label>Units</label>
          <input v-model="attacker.units" type="number" />
        </div>
        <div class="input-group">
          <label>Attacks</label>
          <input v-model="attacker.attacks" type="number" />
        </div>
        <div class="input-group">
          <label>Weapon Skills</label>
          <input v-model="attacker.weaponSkills" type="number" />
        </div>
        <div class="input-group">
          <label>Strength</label>
          <input v-model="attacker.strength" type="number" />
        </div>
        <div class="input-group">
          <label>Armor Penetration</label>
          <input v-model="attacker.armorPenetration" type="number" />
        </div>
        <div class="input-group">
          <label>Damage</label>
          <input v-model="attacker.damage" type="number" />
        </div>
        <div class="input-group">
          <label>Number of Times</label>
          <input v-model="attacker.numberOfTimes" type="number" />
        </div>
      </div>
  
      <div class="defender">
        <h2>Defender</h2>
        <div class="input-group">
          <label>Units</label>
          <input v-model="defender.units" type="number" />
        </div>
        <div class="input-group">
          <label>Toughness</label>
          <input v-model="defender.toughness" type="number" />
        </div>
        <div class="input-group">
          <label>Salvation</label>
          <input v-model="defender.salvation" type="number" />
        </div>
        <div class="input-group">
          <label>Especial Salvation</label>
          <input v-model="defender.especialSalvation" type="number" />
        </div>
        <div class="input-group">
          <label>Wounds</label>
          <input v-model="defender.wounds" type="number" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const attacker = {
    units: ref(0),
    attacks: ref(0),
    weaponSkills: ref(0),
    strength: ref(0),
    armorPenetration: ref(0),
    damage: ref(0),
    numberOfTimes: ref(0),
  };
  
  const defender = {
    units: ref(0),
    toughness: ref(0),
    salvation: ref(0),
    especialSalvation: ref(0),
    wounds: ref(0),
  };
  </script>
  
  <style>
  .battle-container {
    display: flex;
    justify-content: space-around;
    padding: 20px;
  }
  
  .attacker,
  .defender {
    border: 1px solid #ccc;
    padding: 20px;
    width: 45%;
  }
  
  .input-group {
    margin: 10px 0;
  }
  

  </style>
  