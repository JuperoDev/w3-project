// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  // pages: true,
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/main.css',
    '~/assets/css/transition.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  

  build: {
    transpile: ["vuetify","nuxt-electron"],
  },
  experimental: {
    /**
     * see: https://v3.nuxtjs.org/api/configuration/nuxt.config#inlinessrstyles
     */
    inlineSSRStyles: false
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
