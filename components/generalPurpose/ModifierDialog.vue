<template>
  <div class="ModifierDialog__wrapper">
    <div class="modifierDialog__button capitalize" @click="openModifier">
      {{ modifier }}
    </div>

    <v-dialog v-model="dialog" width="500">
      <v-card :title="capitalizedModifier">
        <v-card-text>
          <div class="italic lore">
            {{ filteredModifiers[filteredModifier].lore }}
          </div>
        </v-card-text>

        <v-card-text class="description">
          {{ filteredModifiers[filteredModifier].description }}
        </v-card-text>

        <v-card-text class="summary">
          <div class="menu-holder_highlight">
            <ul>
              <li v-for="item in filteredModifiers[filteredModifier].summary" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn block @click="openModifier">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modifier: String,
});

const dialog = ref(false);
const openModifier = () => {
  dialog.value = !dialog.value;
};

const capitalizedModifier = computed(() => {
  return props.modifier.toUpperCase();
});

// Fetch modifiersList.json
import modifiersList from "./modifiersList.json";

const modifiers = ref(modifiersList);

// Filter modifier keyword based on specific cases (anti, melta, rapid fire, sustained hits)
const filteredModifier = computed(() => {
  let keyword = props.modifier.toLowerCase();
  if (keyword.includes("anti")) {
    keyword = "anti";
  } else if (keyword.includes("melta")) {
    keyword = "melta";
  } else if (keyword.includes("rapid fire")) {
    keyword = "rapid fire";
  } else if (keyword.includes("sustained hits")) {
    keyword = "sustained hits";
  }
  return keyword;
});

// Filter modifiers based on the extracted keyword
const filteredModifiers = computed(() => {
  const keyword = filteredModifier.value;
  return Object.keys(modifiers.value).reduce((acc, modifier) => {
    if (modifier.toLowerCase().includes(keyword)) {
      acc[modifier] = modifiers.value[modifier];
    }
    return acc;
  }, {});
});
</script>

<style scoped>
.menu-holder_highlight {
  background-color: rgb(237, 237, 237);
  padding: 20px;
  /* min-width: 500px; */
  margin: 20px;
}

 ul {
  /* min-width: 700px; */
  list-style: none;
}

li::before {
  content: "■";
  list-style-type: square;
  color: rgb(218, 0, 0);
  display: inline-block;
  width: 1em;
  margin-right: 1em;

  font-size: 15px;
}

.high-light-area{
background-color: rgba(255, 246, 230, 0.523);
}

.menu__img-place-holder{
margin: 0 auto;
}

.menu-holder__subtitles--red-square{
  height: 30px;
  width: 40px;
  background-color: rgb(189, 9, 9);
  
  margin-right: 20px;
}
.menu-holder__subtitles--red-square p{
 margin-left: 8px;
 margin-top: 2px; 
 font-weight: 700;
}

.menu-holder__subtitles--xl{
  background-color: rgb(45, 45, 45);
  padding: 20px;
  color: rgb(246, 248, 250);
  margin: 0 auto;
  max-width: 822px;
}

.menu-holder__header{
  font-size: 30px;
  font-weight: 700;
  margin: 10px;
}
</style>
