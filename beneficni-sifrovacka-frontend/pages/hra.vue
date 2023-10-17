<template class="u-full-width">
  <div v-if="!authStore.team">
    <p>Musíte se <NuxtLink to="/tym">přihlásit</NuxtLink></p>.
  </div>
  <div v-else-if="puzzles?.length == 0">
    Hra ještě nezačala.
  </div>
  <table v-else>
    <tbody>
      <template v-for="puzzle in puzzles" :key="puzzle.id">
        {{ puzzle }}
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()
const { data: puzzles } = await useFetch<any[]>('/api/puzzles', { headers: { Authorization: `Bearer ${authStore.jwt}` } })
</script>

<style>
  td:last-child {
    width: 25%;
  }
</style>
