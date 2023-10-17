<template>
  <div v-if="!authStore.team">
    <p>Musíte se <NuxtLink to="/tym">přihlásit</NuxtLink></p>.
  </div>
  <div v-else-if="actions?.length == 0">
    Akce budou dostupné až po začátku hry.
  </div>
  <ol v-else>
    <li v-for="action in actions" :key="action.teamName">
      {{ action }}
    </li>
  </ol>
</template>
<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const { data: actions } = await useFetch<any[]>('/api/team-actions')
function formatTimestamp (dateString: string): string {
  const date = new Date(dateString)
  return `${(date.getDate() - 1) * 24 + date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
</script>
