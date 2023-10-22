<template>
  <tr>
    <td><img :src="puzzle.logoUrl"></td>
    <td><span v-html="puzzle.description" /></td>
    <template v-if="puzzleState === &quot;locked&quot;">
      <td><button @click="unlockPuzzle(puzzle.stateId)">Odemknout</button></td>
    </template>
    <template v-else-if="puzzleState === &quot;open&quot;">
      <td class="puzzle-action">
        <div>
          <div><a :href="puzzleUrl">Zadání</a></div>
          <div>Odemčeno: {{ unlockTimestamp }}</div>
          <div v-if="showNextAttempt" class="alert">Další pokus bude možný až v {{ nextAttemptTimeStamp }} </div>
          <div v-else>
            <input id="solution" v-model="solution" type="text" placeholder="Odpověď">
            <div v-if="failedSolution" class="alert">Řešení není správně.</div>
            <button @click.prevent="solvePuzzle(puzzle.stateId)">Odevzdat</button>
          </div>
        </div>
      </td>
    </template>
    <template v-else-if="puzzleState === &quot;solved&quot;">
      <td colspan="2">
        <div>
          <div><a :href="puzzleUrl">Zadání</a></div>
          <div>Odemčeno: {{ unlockTimestamp }}</div>
          <div class="success">Vyřešeno: {{ solvedTimestamp }}</div>
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
const nextAttempt = ref(new Date(Date.now()))
const showNextAttempt = ref(false)

if (puzzle.nextAttempt) {
  nextAttempt.value = new Date(puzzle.nextAttempt)
  checkNextAttempt()
}


function checkNextAttempt() {
  if (nextAttempt.value > new Date(Date.now())) {
    showNextAttempt.value = true
    setTimeout(() => {
      checkNextAttempt()
    }, 10000)
  } else {
    showNextAttempt.value = false
  }
}

puzzle.description = marked(puzzle.description, { mangle: false, headerIds: false })
const unlockTimestamp = computed(() => unlockTime ? formatTimestamp(new Date(unlockTime.value)) : null)
const solvedTimestamp = computed(() => solvedTime ? formatTimestamp(new Date(solvedTime.value)) : null)
const nextAttemptTimeStamp = computed(() => nextAttempt ? formatTimestamp(nextAttempt.value) : null)

async function unlockPuzzle (puzzleStateId: number): Promise<void> {
  const body = { state: 'open', puzzleStateId, teamId: authStore.team.id, puzzleId: puzzle.id }
  const newState = await $fetch('/api/update-puzzle-state/', { method: 'POST', body, headers: { Authorization: `Bearer ${authStore.jwt}` } })

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
      const actions  = await $fetch<any[]>('/api/team-actions', { headers: { Authorization: `Bearer ${authStore.jwt}` } })
      const failedActions = actions.filter((action) => action.puzzleId === puzzle.id && action.action === "failed").sort((a: any, b: any) => b.id - a.id)
      if (failedActions.length >= 2) {
        nextAttempt.value = new Date(new Date(failedActions[0].timestamp).setMinutes(new Date(failedActions[0].timestamp).getMinutes() + 10))
        checkNextAttempt()
      }
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
  .success {
    color: #1a9e21;
  }
</style>]
