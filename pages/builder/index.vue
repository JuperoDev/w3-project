<template>
  <div>
    <p>Your Army List</p>
    <br />
    <ul v-if="armyList.length > 0">
      <li
        v-for="(item, index) in armyList"
        :key="index"
        @click="showDetails(item)"
      >
        <p>Name: {{ item.name }}</p>
        <p>Faction: {{ item.faction }}</p>
        <p>Army: {{ item.army }}</p>
        <p>Detachment: {{ item.detachment }}</p>
        <br />
      </li>
    </ul>
    <p v-else>No items found</p>

    <!-- Display details of selected item -->
    <div v-if="selectedItem">
      <h2>Selected Item Details</h2>
      <p><strong>Name:</strong> {{ selectedItem.name }}</p>
      <p><strong>Faction:</strong> {{ selectedItem.faction }}</p>
      <p><strong>Army:</strong> {{ selectedItem.army }}</p>
      <p><strong>Detachment:</strong> {{ selectedItem.detachment }}</p>
      <p><strong>Point Max:</strong> {{ selectedItem.pointMax }}</p>
      <p><strong>Point List:</strong> {{ selectedItem.pointList }}</p>
      
      <h3>Characters:</h3>
      <ul>
        <li v-for="(character, index) in selectedItem.characters" :key="index">
          <p><strong>Name:</strong> {{ character.name }}</p>
          <p><strong>Points:</strong> {{ character.points }}</p>
          <p><strong>Warlord:</strong> {{ character.warlord }}</p>
          <p><strong>Enhancements:</strong> {{ character.enhancements }}</p>
          <p><strong>Enhancement Points:</strong> {{ character.enhancementPoints }}</p>
          <p><strong>Epic Character:</strong> {{ character.epicCharacter }}</p>
          <h4>Composition:</h4>
          <ul>
            <li v-for="(comp, cIndex) in character.composition" :key="cIndex">
              <p><strong>Name:</strong> {{ comp.name }}</p>
              <p><strong>Miniatures:</strong> {{ comp.miniatures }}</p>
              <p><strong>Equipment:</strong></p>
              <ul>
                <li v-for="(eq, eqIndex) in comp.equipment" :key="eqIndex">
                  {{ eq.amount }} x {{ eq.name }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h3>Battleline:</h3>
      <ul>
        <li v-for="(unit, index) in selectedItem.battleline" :key="index">
          <p><strong>Name:</strong> {{ unit.name }}</p>
          <p><strong>Points:</strong> {{ unit.points }}</p>
          <h4>Composition:</h4>
          <ul>
            <li v-for="(comp, cIndex) in unit.composition" :key="cIndex">
              <p><strong>Name:</strong> {{ comp.name }}</p>
              <p><strong>Miniatures:</strong> {{ comp.miniatures }}</p>
              <p><strong>Equipment:</strong></p>
              <ul>
                <li v-for="(eq, eqIndex) in comp.equipment" :key="eqIndex">
                  {{ eq.amount }} x {{ eq.name }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h3>Other Datasheets:</h3>
      <ul>
        <li v-for="(datasheet, index) in selectedItem.otherDatasheets" :key="index">
          <p><strong>Name:</strong> {{ datasheet.name }}</p>
          <p><strong>Points:</strong> {{ datasheet.points }}</p>
          <h4>Composition:</h4>
          <ul>
            <li v-for="(comp, cIndex) in datasheet.composition" :key="cIndex">
              <p><strong>Name:</strong> {{ comp.name }}</p>
              <p><strong>Miniatures:</strong> {{ comp.miniatures }}</p>
              <p><strong>Equipment:</strong></p>
              <ul>
                <li v-for="(eq, eqIndex) in comp.equipment" :key="eqIndex">
                  {{ eq.amount }} x {{ eq.name }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import armyListData from "./mockArmy.json";

const armyList = ref(armyListData.list);

// Data property to store selected item details
const selectedItem = ref(null);

// Function to show details of the selected item
const showDetails = (item) => {
  selectedItem.value = item;
};
</script>

<style scoped>
div {
  border: red 1px solid;
}
</style>
