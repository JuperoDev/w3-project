<template>
  <div>
    <div v-if="!hasEnteredPassword" class="p-5">
      <p>The file you want to see is password protected</p>
      <label for="password">Enter the password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        @keydown.enter="checkPassword"
      />
      <div class="button-container p-5">
        <v-btn>
          <button @click="checkPassword">Submit</button>
        </v-btn>
      </div>
    </div>
    <div v-if="!!hasEnteredPassword">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      hasEnteredPassword: false,
    };
  },
  methods: {
    checkPassword() {
      if (this.password === "gato") {
        this.hasEnteredPassword = true;
        localStorage.setItem("hasEnteredPassword", "true");
      }
    },
  },
  mounted() {
    this.hasEnteredPassword =
      localStorage.getItem("hasEnteredPassword") === "true";
  },
};
</script>

<style scoped>
input {
  border: 1px solid gainsboro;
}
</style>
