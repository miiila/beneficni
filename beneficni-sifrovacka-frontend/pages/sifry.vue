<template>
  <table>
    <tbody>
    <template v-for="puzzle in puzzles" :key="puzzle.id">
      <PuzzleWithSolution :puzzle="puzzle" />
    </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const { data: puzzles } = await useFetch<any[]>('/api/puzzles-all', { headers: { Authorization: `Bearer ${authStore.jwt}` } })
</script>

<style>
td.solution {
  width: 35%;
}
</style>
