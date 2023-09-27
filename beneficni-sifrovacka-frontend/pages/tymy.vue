<template>
  <ol>
    <div v-if="teams?.length == 0">
      Po registraci se tu určitě nějaké objeví.
    </div>
    <li v-for="team in teams" :key="team.username">
      {{ team.username }} - {{ team.members.join(', ') }}
    </li>
  </ol>
</template>

<script setup lang="ts">
const { data: teams } = await useFetch<any[]>('/api/teams')
</script>
