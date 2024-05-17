<template>
  <div class="all-wrap">
    <div class="nft">
      <div class="main flex flex-row">
        <img
          class="tokenImage mx-3 py-4 w-1/4 md:w-1/4 h-auto object-cover -mt-5"
          :src="imageUrl"
          :alt="armyName"
        />
        <div class="textContent w-2/3 md:w-2/3 p-4">
          <h2 class="uppercase">{{ armyName }}</h2>
          <hr />
          <p class="description">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  armyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.all-wrap {
  margin: 0;
  color: #2b2b2b;
  user-select: none;
}

.nft {
  user-select: none;
  max-width: 600px;
  margin: 10px;
  background: linear-gradient(
    0deg,
    rgb(231, 231, 231) 0%,
    rgba(232, 232, 232, 0.5) 100%
  );
  box-shadow: 0 2px 10px 0px #00000088;
  border-radius: 0.7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: 0.5s all;
  position: relative;
}

.nft hr {
  width: 100%;
  border: none;
  border-bottom: 2px solid #87878778;
  margin: 5px;
}

.description {
  margin: 0.5rem 0;
  color: #373737;
}

.nft::before {
  position: absolute;
  content: "";
  box-shadow: 0 0 100px 40px #eaeaea7e;
  top: -10%;
  left: -100%;
  transform: rotate(-45deg);
  height: 60rem;
  width: 200%;
  transition: 0.7s all;
}

.nft:hover::before {
  filter: brightness(0.3);
  top: -100%;
  left: 200%;
}

.nft:hover {
  box-shadow: 0 7px 50px 10px #000000aa;
  transform: scale(1.015);
  filter: brightness(1.3);
}
</style>
