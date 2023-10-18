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
  const daysInHours = (date.getDate() - 1) * 24
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const hours = String(date.getHours() - 1 + daysInHours).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
</script>
