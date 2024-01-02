<template>
    <button class="toggle-favorite" @click="toggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke-width="2"
        focusable="false"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="toggle-favorite__icon"
        :class="iconClasses"
        @animationend.native="onIconAnimationEnds"
      >
        <path
          d="M17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8C10.5 4.1 8.3 2.5 5.9 3 4.4 3.2 3 4.2 2.3 5.6c-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6"
          stroke-linejoin="round"
        ></path>
      </svg>
      <transition name="favorite-particles-transition">
        <div v-if="animating" class="toggle-favorite__particles"></div>
      </transition>
    </button>
  </template>
  
  <script>
  export default {
    name: "SingleFavorite",
    data() {
      return {
        favorited: false,
        animating: false
      };
    },
    computed: {
      iconClasses() {
        return {
          "toggle-favorite__icon--favorited": this.favorited,
          "toggle-favorite__icon--animate": this.animating
        };
      }
    },
    methods: {
      toggle() {
        // Only animate on favoriting.
        if (!this.favorited) {
          this.animating = true;
        }
  
        this.favorited = !this.favorited;
      },
      onIconAnimationEnds() {
        this.animating = false;
      }
    }
  };
  </script>
  
  <style lang="scss">
  $particles-animation-duration: 0.8s;
  $icon-animation-duration: 0.48s;
  $icon-color: hsl(1, 89%, 61%);
  $icon-border-color: hsl(0, 0%, 10%);
  
  @keyframes favorite-icon-animation {
    0% {
      opacity: 1;
      transform: scale(0.1);
    }
  
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  
    80% {
      opacity: 1;
      transform: scale(0.9);
    }
  
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes favorite-particles-animation {
    0% {
      background-position: left center;
    }
    100% {
      background-position: right center;
    }
  }
  
  // Particles animation.
  .favorite-particles-transition-enter-active {
    background-image: url("/particles-sprite.png");
    background-size: 2500% auto;
    background-position: left center;
    background-repeat: no-repeat;
  
    animation-duration: $particles-animation-duration;
    animation-timing-function: steps(24);
    animation-name: favorite-particles-animation;
  }
  
  .toggle-favorite {
    font-size: 20px;
    position: relative;
  
    &__icon {
      height: 1em;
      width: 1em;
  
      // Transition mainly for when un-favoriting
      transition: fill-opacity 0.2s, stroke 0.2s;
      fill: $icon-color;
      fill-opacity: 0;
      stroke: $icon-border-color;
  
      &--favorited {
        fill-opacity: 1;
        stroke: $icon-color;
      }
  
      // Icon animation
      &--animate {
        opacity: 0;
        transform: scale(0);
        animation-duration: $icon-animation-duration;
        animation-delay: $particles-animation-duration - $icon-animation-duration;
        animation-name: favorite-icon-animation;
      }
    }
  
    &__particles {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3em;
      height: 3em;
    }
  }
  </style>
  