import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useAuthStore($pinia)
    }
  }
})
