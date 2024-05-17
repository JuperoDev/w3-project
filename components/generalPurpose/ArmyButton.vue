<template>
  <div class="all-wrap">
    <div class="nft">
      <div class="main flex flex-row">
        <img
          class="tokenImage w-1/3 md:w-1/3 h-auto object-cover"
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
  color: #eee;
  user-select: none;
}

.nft {
  user-select: none;
  max-width: 600px;
  margin: 10px;
  background: linear-gradient(
    0deg,
    rgba(40, 44, 52, 1) 0%,
    rgba(101, 102, 106, 0.5) 100%
  );
  box-shadow: 0 7px 20px 5px #00000088;
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
  border-bottom: 1px solid #efefef78;
  margin: 5px;
}

.description {
  margin: 0.5rem 0;
  color: #cecdd0;
}

.nft::before {
  position: absolute;
  content: "";
  box-shadow: 0 0 100px 40px #ffffff08;
  top: -10%;
  left: -100%;
  transform: rotate(-45deg);
  height: 60rem;
  width: 200%;
  transition: 0.7s all;
}

.nft:hover::before {
  filter: brightness(0.5);
  top: -100%;
  left: 200%;
}

.nft:hover {
  box-shadow: 0 7px 50px 10px #000000aa;
  transform: scale(1.015);
  filter: brightness(1.3);
}
</style>
