// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiHost: 'http://localhost:1337',
    apiBase: 'api',
    pageMap: {
      pravidla: 1,
      'o-barce': 2
    },
    public: {
      registrationFinished: false,
      gameFinished: false
    }
  }
})
