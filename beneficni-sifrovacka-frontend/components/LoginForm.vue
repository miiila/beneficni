<template>
  <form @submit.prevent="login">
    <div class="row">
      <div class="six columns">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="identifier"
          class="u-full-width"
          type="email"
          placeholder="beneficni@sifrovacky.cz"
          required
        >
        <label for="password">Heslo</label>
        <input
          id="password"
          v-model="password"
          class="u-full-width"
          type="password"
          placeholder="heslo"
          required
        >
        <div v-if="failedLogin" class="alert">Špatný email nebo heslo.</div>
        <input class="button-primary u-full-width" type="submit" value="Přihlásit se">
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const emit = defineEmits(['team-login'])
const authStore = useAuthStore()
const router = useRouter()

const identifier = ref('')
const password = ref('')

const failedLogin = ref(false)

async function login () {
  try {
    const res: any = await $fetch('/api/login', { method: 'POST', body: { identifier: identifier.value, password: password.value } })
    authStore.setTeam(res.user, res.jwt)
    emit('team-login', res.user)
    await router.push('/tym')
  } catch (err: any) {
    if (err.status === 400) {
      failedLogin.value = true
    }
    console.error(err)
  }
}
</script>
<style>
   .alert {
     color: #ea1a21;
     text-transform: uppercase;
   }
</style>
