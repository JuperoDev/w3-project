<template>
    <div class="introduction-container">
        <h1>introduction</h1>
        <p>On this page you will find several {{army}} Detachments you can select from, as described in the Core Rules (see the Select Detachment Rules step). If you are playing a Crusade battle, see the equivalent step in the Mustering a Crusade Army section of the main Crusade rules. Each Detachment is a themed fighting force that focuses on one particular combat style employed by the Tyranids - the rules they include are as follows:</p>
    </div>
</template>


<script setup>

import { useRoute } from "vue-router";

// params
const route = useRoute();
const army = route.params.army;
</script>