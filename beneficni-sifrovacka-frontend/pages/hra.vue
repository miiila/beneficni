<template class="u-full-width">
  <div v-if="gameFinished">
    Hra skončila, už není možné odpovídat.
  </div>
  <div v-else>
    <div v-if="!authStore.team">
      <p>Musíte se <NuxtLink to="/tym">přihlásit</NuxtLink></p>.
    </div>
    <div v-else-if="puzzles?.length == 0">
      Hra ještě nezačala.
    </div>
    <table v-else>
      <tbody>
        <template v-for="puzzle in puzzles" :key="puzzle.id">
          <Puzzle :puzzle="puzzle" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
const gameFinished = config.public.gameFinished
const { data: puzzles } = await useFetch<any[]>('/api/puzzles', { headers: { Authorization: `Bearer ${authStore.jwt}` } })
</script>

<style>
  td.puzzle-action {
    width: 25%;
  }
</style>
