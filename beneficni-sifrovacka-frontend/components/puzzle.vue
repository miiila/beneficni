<template>
  <tr>
    <td><img :src="puzzle.logoUrl"></td>
    <td><span v-html="puzzle.description" /></td>
    <template v-if="puzzleState === &quot;locked&quot;">
      <td><button @click="unlockPuzzle(puzzle.stateId)">Odemknout</button></td>
    </template>
    <template v-else-if="puzzleState === &quot;open&quot;">
      <td>
        <div>
          <div><a :href="puzzleUrl">Zadání</a></div>
          <div>Odemčeno: {{ unlockTimestamp }}</div>
          <input id="solution" v-model="solution" type="text" placeholder="Odpověď">
          <div v-if="failedSolution" class="alert">Řešení není správně.</div>
          <button @click.prevent="solvePuzzle(puzzle.stateId)">Odevzdat</button>
        </div>
      </td>
    </template>
    <template v-else-if="puzzleState === &quot;solved&quot;">
      <td colspan="2">
        <div>
          <div><a :href="puzzleUrl">Zadání</a></div>
          <div>Odemčeno: {{ unlockTimestamp }}</div>
          <div>Vyřešeno: {{ solvedTimestamp }}</div>
          <div>Řešení: {{ puzzleSolution }}</div>
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

const puzzle = props.puzzle as Puzzle

const puzzleState = ref(puzzle.state)
const puzzleUrl = ref(puzzle.url ?? '')
const puzzleSolution = ref(puzzle.solution ?? '')
const unlockTime = ref(puzzle.actions.unlocked ?? '')
const solvedTime = ref(puzzle.actions.solved ?? '')

puzzle.description = marked(puzzle.description, { mangle: false, headerIds: false })
const unlockTimestamp = computed(() => unlockTime ? formatTimestamp(new Date(unlockTime.value)) : null)
const solvedTimestamp = computed(() => solvedTime ? formatTimestamp(new Date(solvedTime.value)) : null)

async function unlockPuzzle (puzzleStateId: number): Promise<void> {
  const body = { state: 'open', puzzleStateId, teamId: authStore.team.id, puzzleId: puzzle.id }
  const newState = await $fetch('/api/update-puzzle-state/', { method: 'POST', body, headers: { Authorization: `Bearer ${authStore.jwt}` } })

  console.log(newState)
  unlockTime.value = newState.actionsUpdates.unlocked
  puzzleUrl.value = newState.puzzleUpdates.url
  puzzleState.value = newState.puzzleUpdates.state
}

async function solvePuzzle (puzzleStateId: number): Promise<void> {
  try {
    const body = { state: 'solved', solution: solution.value, puzzleStateId, teamId: authStore.team.id, puzzleId: puzzle.id }
    const newState = await $fetch('/api/update-puzzle-state/', { method: 'POST', body, headers: { Authorization: `Bearer ${authStore.jwt}` } })

    solvedTime.value = newState.actionsUpdates.solved
    puzzleSolution.value = newState.puzzleUpdates.solution
    puzzleState.value = newState.puzzleUpdates.state
  } catch (e: any) {
    if (e.statusCode === 400) {
      failedSolution.value = true
    }
  } finally {
    solution.value = ''
  }
}

function formatTimestamp (d: Date) {
  return d.toLocaleString('cs-CZ', { weekday: 'long', hour: 'numeric', minute: 'numeric' })
}

</script>

<style>
  .alert {
    color: #ea1a21;
    text-transform: uppercase;
  }
</style>
