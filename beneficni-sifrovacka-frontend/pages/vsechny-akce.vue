<template>
  <table class="u-full-width">
    <thead>
      <tr>
        <th>Kdo</th>
        <th>Co</th>
        <th>Šifra</th>
        <th>Kdy</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="action in teamActions" :key="action.timestamp">
        <td>{{ action.teamName }} </td>
        <td>{{ translateAction(action.action) }} {{ action.payload }}</td>
        <td>{{ action.puzzleIndex }}</td>
        <td>{{ formatTimestamp(action.timestamp) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const { data: actions } = await useFetch<any[]>('/api/team-actions-all', { headers: { Authorization: `Bearer ${authStore.jwt}` } })

const allActions = actions.value.teamActions

const teamActions = Object.entries(allActions).map(([teamName, teamStuff]) => {
  return Object.entries(teamStuff.puzzles).map(([puzzleIndex, actions]) => {
    return actions.map(action => {
      action.teamName = teamName
      action.puzzleIndex = puzzleIndex
      return action
    })
  })
}).flat(2).sort((a, b) => {
  const ad = new Date(a.timestamp).getTime()
  const bd = new Date(b.timestamp). getTime()

  return bd - ad
}) 


function formatTimestamp (d: string) {
  const date = new Date(d)
  return date.toLocaleString('cs-CZ', { weekday: 'long', hour: 'numeric', minute: 'numeric' })
}

function translateAction(action: string) {
  const dict = {
    "unlocked": "odemkl",
    "solved": "vyřešil",
    "failed": "zadal špatné heslo",
  }

  return dict[action]
}

</script>
