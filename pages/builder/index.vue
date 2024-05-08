<template>
    <div>
        <p>Your Army List</p>
        <br/>
        <ul v-if="armyList.length > 0">
            <li v-for="(item, index) in armyList" :key="index">
                <p>Name: {{ item.name }}</p>
                <p>Faction: {{ item.faction }}</p>
                <p>Army: {{ item.army }}</p>
                <p>Detachment: {{ item.detachment }}</p>
                <br/>
            </li>
        </ul>
        <p v-else>No items found</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import armyListData from './mockArmy.json';

const armyList = ref(armyListData.list.map(({ name, faction, army, detachment }) => ({ name, faction, army, detachment })));
</script>
