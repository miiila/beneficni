<template>
    <TeamForm v-if="!registrationFinished" button-text="Chci hrát" :required="true" @on-submit="register" />
    <div v-else>
      Registrace skončila.
    </div>
</template>

<script setup lang="ts">
  const config: { public: { registrationFinished: boolean } } = useRuntimeConfig()
  const router = useRouter()
  const { $notification } = useNuxtApp()
  const registrationFinished = config.public.registrationFinished

  async function register (teamForm: TeamForm) {
    try {
      await $fetch('/api/register', { method: 'POST', body: teamForm })
      //$notification({ title: 'Zaregistrováno.', type: 'is-success' })
      router.push('/tymy')
    } catch (err) {
      //$notification({ title: 'Registrace se nepovedla.', type: 'is-danger' })
    }
  }
</script>
