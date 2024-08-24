<template>
    <div id="fire_sparks"></div>
  </template>
  
  <style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  #fire_sparks {
    width: 99%;
    height: 99%;
    position: absolute;
    pointer-events: none;
    overflow: hidden;
  }
  
  .spark {
    width: 6px;
    height: 6px;
    position: absolute;
    transform: translateY(-10vh);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  
  .spark_inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: screen;
    background-image: radial-gradient(#575555 0%, #e3852d 10%);
    box-shadow: 0 0 0.9375em 0.1875em #a42907;
    animation-name: scaling;
    animation-iteration-count: infinite;
  }
  
  @keyframes scaling {
    0% {
      transform: scale3d(0.4, 0.4, 1);
    }
    50% {
      transform: scale3d(1.4, 1.4, 1);
    }
    100% {
      transform: scale3d(0.4, 0.4, 1);
    }
  }
  </style>
  
  <script>
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      onMounted(() => {
        const parent = document.getElementById('fire_sparks');
        const styles = document.createElement('style');
        styles.id = 'fire_sparks_styles';
        document.head.appendChild(styles);
  
        const total_sparks = 69;
        const random_size_and_speed = true;
  
        const small_random = (min, max) => {
          return (Math.random() * (max - min) + min).toFixed(2);
        };
  
        const big_random = (min, max) => {
          return (Math.random() * (max - min) + min).toFixed(0);
        };
  
        const spark_HTML = (index, inner_speed, inner_delay, spark_travel_speed, spark_travel_delay) => {
          let fixed_index;
          let fixed_inner_speed;
          random_size_and_speed == false ? (fixed_index = '', fixed_inner_speed = 2000) : (fixed_index = index, fixed_inner_speed = inner_speed);
  
          return `<div class="spark" style="animation-name: travel${index}; animation-duration: ${spark_travel_speed}ms; animation-delay: ${spark_travel_delay}ms;">
                    <div class="spark_inner" style="animation-name: scaling${fixed_index}; animation-duration: ${fixed_inner_speed}ms; animation-delay:${inner_delay}ms;"></div>
                  </div>`;
        };
  
        for (let i = 0; i < total_sparks + 1; i++) {
          if (random_size_and_speed == false && i == 0) {
            styles.innerHTML = '@keyframes scaling {0% {transform: scale3d(0.4, 0.4, 1);} 50% {transform: scale3d(1.4, 1.4, 1);} 100% {transform: scale3d(0.4, 0.4, 1);}}';
          }
  
          if (random_size_and_speed == true) {
            let min = small_random(0.1, 0.4);
            let max = small_random(1, 1.5);
            styles.innerHTML += `@keyframes scaling${i} {0% {transform: scale3d(${min}, ${min}, 1);} 50% {transform: scale3d(${max}, ${max}, 1);} 100% {transform: scale3d(${min}, ${min}, 1);}}`;
          }
  
          let random_sign = () => {
            return Math.cos(Math.PI * Math.round(Math.random()));
          };
  
          let point1w = big_random(0, 100);
          let point1h = 103;
          let point2w = big_random(0, 100);
          let point2h = -3;
          styles.innerHTML += `@keyframes travel${i} { 0% {transform: translate(${point1w}vw, ${point1h}vh)} 100% {transform: translate(${point2w}vw, ${point2h}vh);} }`;
  
          let inner_speed = big_random(1500, 2000);
          let inner_delay = big_random(1, 1200);
          let speed = big_random(6000, 18000);
          let delay = big_random(1, 15000);
  
          parent.innerHTML += spark_HTML(i, inner_speed, inner_delay, speed, delay);
        }
      });
    }
  };
  </script>
  