<template>
  <div v-if="results?.length == 0">
    Výsledky se zobrazí až po začátku hry.
  </div>
  <ol v-else>
    <li v-for="result in results" :key="result.teamName">
      {{ result.teamName }} - {{ result.solved }} šifer v čase {{ formatTimestamp(result.totalTime) }}
    </li>
  </ol>
</template>
<script setup lang="ts">
const { data: results } = await useFetch<any[]>('/api/results')
function formatTimestamp (dateString: string): string {
  const date = new Date(dateString)
  return `${(date.getDate() - 1) * 24 + date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
</script>
