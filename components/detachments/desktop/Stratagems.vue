<template>
  <div class="m-3">
    <h3 class="text-4xl">Stratagems</h3>

    <div class="grid grid-cols-2 gap-4">
      <div v-for="stratagem in stratagems">
        <h4 class="text-3xl uppercase" :style="{ color: stratagem.color }">
          {{ stratagem.name }}
        </h4>
        <span>
          <p :style="{ color: stratagem.color }">
            <strong>Subindex:</strong>
          </p>
          {{ stratagem.subindex }}
        </span>

        <span
          ><p :style="{ color: stratagem.color }">
            <strong>Lore:</strong>
          </p>
          {{ stratagem.lore }}
        </span>

        <span
          ><p :style="{ color: stratagem.color }">
            <strong>When:</strong>
          </p>
          {{ stratagem.when }}
        </span>

        <span
          ><p :style="{ color: stratagem.color }">
            <strong>Target:</strong>
          </p>
          {{ stratagem.target }}
        </span>

        <span
          ><p :style="{ color: stratagem.color }"><strong>Effect:</strong></p>
          {{ stratagem.effect }}
        </span>

        <!-- If the 'icon' property is an array, you might want to loop through it as well -->
        <div v-for="(icon, index) in stratagem.icon" :key="index">
          <img :src="icon" alt="Stratagem Icon" />
        </div>

        <p><strong>CP:</strong> {{ stratagem.cp }}</p>
        <p><strong>Color:</strong> {{ stratagem.color }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stratagems: Array,
});
</script>
