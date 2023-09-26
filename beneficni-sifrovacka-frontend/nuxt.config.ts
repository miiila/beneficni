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
  },
  app: {
    head: {
      title: 'Benefiční Šifrovačka',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/apple-touch-icon' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ]
    }
  }
})
