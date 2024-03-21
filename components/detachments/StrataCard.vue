<template>
  <div>
    <div class="bg-white shadow-lg">
        
      <div class="flex">
        <div class="w-16 bg-white"></div>
        <div class="red-stripe border-solid border-l-8 border-red-500 ml-2 mr-5 bg-red-500 relative">
          <div class="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div
              class="mt-10 -ml-1 w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45 p-5"
            >
              <div
                class="transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-100"
              ></div>
            </div>

            <div
              class="mt-10 -ml-1 w-10 h-10 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45 p-5"
            >
              <div
                class="transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-100"
              >
                <div class="transform -rotate-45">{{stratagem.cp}}cp</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 ml-5">
          <h2
            class="text-lg mb-2 font-bold text-red-600 border-solid border-b-2 border-red-600 uppercase"
          >
            {{stratagem.name}}
          </h2>
          <p
            class="text-gray-600 border-dotted border-b-2 border-gray-500 mb-2 capitalize"
          >
             {{stratagem.subindex}}
          </p>
          <p class="italic">
            {{stratagem.lore}}
          </p>
          <p class="my-2">
            <span class="text-red-600"><strong>When: </strong></span>{{stratagem.when}}
          </p>

          <p class="my-2">
            <span class="text-red-600"><strong>Target: </strong></span>
            {{stratagem.target}}
          </p>
          <p class="my-2">
            <span class="text-red-600"><strong>Effect: </strong></span>
            {{stratagem.effect}}
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
