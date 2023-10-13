<template>
  <tr>
    <td><img :src="puzzle.logoUrl"></td>
    <td><span v-html="puzzle.description" /></td>
    <template v-if="puzzle.state === &quot;locked&quot;">
      <td><button @click="unlockPuzzle(puzzle.stateId)">Odemknout</button></td>
    </template>
    <template v-else-if="puzzle.state === &quot;open&quot;">
      <td>
        <div>
          <div><a :href="puzzle.url">Zadání</a></div>
          <div>Odemčeno: {{ unlockTimestamp }}</div>
          <input id="solution" v-model="solution" type="text" placeholder="Odpověď">
          <div v-if="failedSolution" class="alert">Řešení není správně.</div>
          <button @click.prevent="solvePuzzle(puzzle.stateId)">Odevzdat</button>
        </div>
      </td>
    </template>
    <template v-else-if="puzzle.state === &quot;solved&quot;">
      <td colspan="2">
        <div>
          <div><a :href="puzzle.url">Zadání</a></div>
          <div>Odemčeno: {{ unlockTimestamp }}</div>
          <div>Vyřešeno: {{ solvedTimestamp }}</div>
          <div>Řešení: {{ puzzle.solution }}</div>
        </div>
      </td>
    </template>
  </tr>
</template>

<script setup lang="ts">
import { marked } from 'marked'

import { type Puzzle } from '~/server/api/types'
import { useAuthStore, type AuthStore } from '~/stores/auth'

const authStore: AuthStore = useAuthStore()

const props = defineProps({
  puzzle: {
    type: Object,
    required: true
  }
})

const solution = ref('')
const failedSolution = ref(false)

const puzzle = ref<Puzzle>(props.puzzle as Puzzle)
puzzle.value.description = marked(puzzle.value.description, { mangle: false, headerIds: false })
const unlockTimestamp = computed(() => puzzle.value.actions.unlocked ? formatTimestamp(new Date(puzzle.value.actions.unlocked)) : null)
const solvedTimestamp = computed(() => puzzle.value.actions.solved ? formatTimestamp(new Date(puzzle.value.actions.solved)) : null)

async function unlockPuzzle (puzzleStateId: number): Promise<void> {
  const body = { state: 'open', puzzleStateId, teamId: authStore.team.id, puzzleId: puzzle.value.id }
  const newState = await $fetch('/api/update-puzzle-state/', { method: 'POST', body, headers: { Authorization: `Bearer ${authStore.jwt}` } })

  puzzle.value.actions = { ...puzzle.value.actions, ...newState.actionsUpdates }
  puzzle.value = { ...puzzle.value, ...newState.puzzleUpdates }
}

async function solvePuzzle (puzzleStateId: number): Promise<void> {
  try {
    const body = { state: 'solved', solution: solution.value, puzzleStateId, teamId: authStore.team.id, puzzleId: puzzle.value.id }
    const newState = await $fetch('/api/update-puzzle-state/', { method: 'POST', body, headers: { Authorization: `Bearer ${authStore.jwt}` } })

    puzzle.value.actions = { ...puzzle.value.actions, ...newState.actionsUpdates }
    puzzle.value = { ...puzzle.value, ...newState.puzzleUpdates }
  } catch (e: any) {
    if (e.statusCode === 400) {
      failedSolution.value = true
      console.log(e)
    }
  } finally {
    solution.value = ''
  }
}

function formatTimestamp (d: Date) {
  return d.toLocaleString("cs-CZ", { weekday: 'long', hour: 'numeric', minute: 'numeric' } )
}

</script>

<style>
  .alert {
    color: #ea1a21;
    text-transform: uppercase;
  }
</style>
