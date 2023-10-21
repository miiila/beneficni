<template>
  <table class="u-full-width">
    <thead>
    <tr>
      <th />
      <th v-for="puzzle in actions.puzzles" :key="puzzle.url">
        <img :src="puzzle.logoUrl" width="50px"/>
      </th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="actions, teamName in teamActions" :key="teamName">
        <td>{{ teamName }} </td>
        <td v-for="i in 16" :key="teamName+i">
          <span v-if="isSolved(actions.puzzles[i])"> ✅ <br /> {{ getSolvedTimestamp(actions.puzzles[i]) }}</span>
          <span v-else-if="isUnlocked(actions.puzzles[i])"> 🔓 <br /> {{ getUnlockedTimestamp(actions.puzzles[i]) }}</span>
          <span v-else> 🔒 </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const { data: actions } = await useFetch<any[]>('/api/team-actions-all', { headers: { Authorization: `Bearer ${authStore.jwt}` } })

//sort teams in actions based on solved property and timestamp
const teamActions = actions.teamActions = Object.fromEntries(Object.entries(actions.value.teamActions).sort(([,a],[,b]) => {
  if (a.solved < b.solved) {
    return 1
  }
  if (a.solved > b.solved) {
    return -1
  }
  return a.time - b.time
}))

function formatTimestamp (d: string) {
  const date = new Date(d)
  return date.toLocaleString('cs-CZ', { weekday: 'long', hour: 'numeric', minute: 'numeric' })
}

function isUnlocked(actions: [{action: string, timestamp: string}] = []) {
  return actions.some(a => a.action === 'unlocked')
}

function isSolved(actions: [{action: string, timestamp: string}] = []) {
  return actions.some(a => a.action === 'solved')
}

function getSolvedTimestamp(actions: [{action: string, timestamp: string}] = []) {
  const solved = actions.find(a => a.action === 'solved')
  const unlocked = actions.find(a => a.action === 'unlocked')
  const timeDiff = new Date(new Date(solved.timestamp).getTime() - new Date(unlocked.timestamp).getTime())

  return formatRelativeTimestamp(timeDiff)
}

function getUnlockedTimestamp(actions: [{action: string, timestamp: string}] = []) {
  const unlocked = actions.find(a => a.action === 'unlocked')
  return formatTimestamp(unlocked.timestamp)
}


function formatRelativeTimestamp(timeDiff?: Date) {
  if (!timeDiff) {
    return ''
  }
  return `${String(timeDiff.getHours()).padStart(2,'0')}:${String(timeDiff.getMinutes()).padStart(2, '0')}:${String(timeDiff.getSeconds()).padStart(2, '0')}`
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
