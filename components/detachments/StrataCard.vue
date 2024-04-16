<template>
  <div>
    <div class="bg-white shadow-lg">
      <div class="flex">
        
        <div class="p-4 ml-5">
          <h2
            :class="
              'text-lg mb-2 font-bold text-' +
              stratagem.color +
              '-600 border-solid border-b-2 border-' +
              stratagem.color +
              '-600 uppercase'
            "
          >
            {{ stratagem.name }}
          </h2>
          <p>{{ stratagem.cp }}cp</p>
          <p
            class="text-gray-600 border-dotted border-b-2 border-gray-500 mb-2 capitalize"
          >
            {{ stratagem.subindex }}
          </p>
          <p class="italic">
            {{ stratagem.lore }}
          </p>
          <p class="my-2">
            <span
              :class="{
                'text-red-600': stratagem.color === 'red',
                'text-blue-600': stratagem.color === 'blue',
                'text-green-600': stratagem.color === 'green',
              }"
              ><strong>When: </strong></span
            >{{ stratagem.when }}
          </p>

          <p class="my-2">
            <span
              :class="{
                'text-red-600': stratagem.color === 'red',
                'text-blue-600': stratagem.color === 'blue',
                'text-green-600': stratagem.color === 'green',
              }"
              ><strong>Target: </strong></span
            >
            {{ stratagem.target }}
          </p>
          <p class="my-2">
            <span
              :class="{
                'text-red-600': stratagem.color === 'red',
                'text-blue-600': stratagem.color === 'blue',
                'text-green-600': stratagem.color === 'green',
              }"
            >
              <strong>Effect: </strong></span
            >
            {{ stratagem.effect }}
          </p>

          <p v-if="stratagem.restrictions"  class="my-2">
            <span
              :class="{
                'text-red-600': stratagem.color === 'red',
                'text-blue-600': stratagem.color === 'blue',
                'text-green-600': stratagem.color === 'green',
              }"
            >
              <strong>Restrictions: </strong></span
            >
            {{ stratagem.restrictions }}
          </p>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  stratagem: Object,
});
</script>
<style scoped></style>
