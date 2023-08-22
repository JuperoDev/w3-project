<template>
    <div >
        <v-select
            label="Select Faction"
            :items="factions"
            
        ></v-select>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const factions = ref([]);

        // Fetch the data from the JSON file
        const fetchData = async () => {
            try {
                const response = await fetch('/faction.json');
                const jsonData = await response.json();
                factions.value = jsonData.faction;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch the data when the component is mounted
        onMounted(fetchData);

        return {
            factions
        };
    }
}
</script>

<style>
    
</style>
