<template>
    <div>
        <div v-for="(ability, index) in abilities.core" :key="'core-' + index">
            {{ ability }}
        </div>
        <div v-for="(ability, index) in abilities.faction" :key="'faction-' + index">
            {{ ability }}
        </div>
        <div v-for="(miscAbility, index) in abilities.misc" :key="'misc-' + index">
            <div>{{ miscAbility.name }}</div>
            <div>{{ miscAbility.description }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    abilities: Object
});
</script>
