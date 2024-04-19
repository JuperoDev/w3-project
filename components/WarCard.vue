<template>
  <div class="war-card">
    <div class="war-card__wrapper">
      <img
        :src="imgSrc"
        class="war-card__cover-image"
      />
    </div>
    <h2 class="text-slate-900  text-2xl font-bebas m-5">{{logoCaption.toUpperCase()}}</h2>
    <img
      :src="characterSrc"
      class="war-card__character"
    />

    
  </div>
</template>
<script>
export default {
  props: {
    logoCaption: {
      type: String,
      default: "Chaos"
    },
    imgSrc: {
      type: String,
      default: "https://coolbackgrounds.io/images/backgrounds/white/white-trianglify-b79c7e1f.jpg"

    },
    characterSrc: {
      type: String,
      default: "https://www.warhammer-community.com/wp-content/uploads/2023/06/uxhoUvvVGETrsFTA.png"
    },
  },
};
</script>
<style scoped>
.war-card {
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 36px;
  perspective: 2500px;
  margin: 0 50px;
 
}

.war-card__cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.war-card__wrapper {
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: -1;
  
}

.war-card:hover .war-card__wrapper {
  transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
  box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
}

.war-card__wrapper::before,
.war-card__wrapper::after {
  content: "";
  opacity: 0;
  width: 100%;
  height: 80px;
  transition: all 0.5s;
  position: absolute;
  left: 0;
  
}
.war-card__wrapper::before {
  top: 0;
  height: 100%;
  background-image: linear-gradient(
    to top,
    transparent 46%,
    rgba(12, 13, 19, 0.5) 68%,
    rgba(12, 13, 19) 97%
  );
}
.war-card__wrapper::after {
  bottom: 0;
  opacity: 1;
  background-image: linear-gradient(
    to bottom,
    transparent 46%,
    rgba(12, 13, 19, 0.5) 68%,
    rgb(36, 36, 36) 97%
  );
}

.war-card:hover .war-card__wrapper::before,
.war-card__wrapper::after {
  opacity: 1;
}

.war-card:hover .war-card__wrapper::after {
  height: 120px;
}
.title {
  width: 100%;
  transition: transform 0.5s;
}
.war-card:hover .title {
  transform: translate3d(0%, -50px, 100px);
}

.war-card__character {
  width: 100%;
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: -1;
}

.war-card:hover .war-card__character {
  opacity: 1;
  transform: translate3d(0%, -30%, 100px);
}
</style>
