<template>
    <div>
        <div v-for="(ability, index) in abilities.core" :key="'core-' + index">
            {{ ability }}
        </div>
        <div v-for="(ability, index) in abilities.faction" :key="'faction-' + index">
            {{ ability }}
        </div>
        <div v-for="(otherAbility, index) in abilities.otherAbilities" :key="'misc-' + index">
            <span class="font-semibold">{{ otherAbility.name }} : </span> <span>{{ otherAbility.description }}</span>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    abilities: Object
});
</script>
