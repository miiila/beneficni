<template class="u-full-width">
  <div v-if="!authStore.team">
    <p>Musíte se <NuxtLink to="/tym">přihlásit</NuxtLink></p>.
  </div>
  <div v-else-if="actions?.length == 0">
    Akce budou dostupné až po začátku hry.
  </div>
  <table v-else class="u-full-width">
    <thead>
      <tr>
        <th>Kdy</th>
        <th>Akce</th>
        <th>Šifra</th>
        <th>Heslo</th>
      </tr>
      </thead>
      <tbody>
    <template v-for="action in actions" :key="action.teamName">
      <tr v-if="action.action == 'solved'" class="success">
        <td>{{ formatTimestamp(action.timestamp) }}</td>
        <td>Vyřešeno</td>
        <td>{{action.puzzleId}}</td>
        <td>{{action.payload}}</td>
      </tr>
      <tr v-else-if="action.action == 'unlocked'">
        <td>{{ formatTimestamp(action.timestamp) }}</td>
        <td>Odemčeno</td>
        <td>{{action.puzzleId}}</td>
        <td></td>
      </tr>
      <tr v-else-if="action.action == 'failed'" class="failed">
        <td>{{ formatTimestamp(action.timestamp) }}</td>
        <td>Špatný pokus</td>
        <td>{{action.puzzleId}}</td>
        <td>{{action.payload}}</td>
      </tr>
    </template>
    </tbody> 
  </table>
</template>
<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const { data: actions } = await useFetch<any[]>('/api/team-actions', { headers: { Authorization: `Bearer ${authStore.jwt}` } })


function formatTimestamp (d: string) {
  const date = new Date(d)
  return date.toLocaleString('cs-CZ', { weekday: 'long', hour: 'numeric', minute: 'numeric' })
}
</script>

<style>
  .failed {
    color: #ea1a21;
  }
  .success {
    color: #1a9e21;
  }
</style>
