<template>
    <div>
        <p>Your Army List</p>
        <ul v-if="armyList.length > 0">
            <li v-for="(item, index) in armyList" :key="index">
                <p>Name: {{ item.name }}</p>
                <p>Faction: {{ item.faction }}</p>
                <p>Army: {{ item.army }}</p>
                <p>Detachment: {{ item.detachment }}</p>
            </li>
        </ul>
        <p v-else>No items found</p>
    </div>
</template>

<script setup>
const armyList = ref([
    {
        "name": "nueva lista",
        "faction": "xenos",
        "army": "tyranids",
        "detachment": "vanguard onslaught"
    },
    {
        "name": "nueva lista2",
        "faction": "xenos",
        "army": "tyranids",
        "detachment": "invasion fleet"
    }
]);
</script>
