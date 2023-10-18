<template>
  <div v-if="results?.length == 0">
    Výsledky se zobrazí až po začátku hry.
  </div>
  <table v-else class="u-full-width">
    <thead>
      <tr>
        <th>Pořadí</th>
        <th>Tým</th>
        <th>Šifry</th>
        <th>Čas</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(result, i) in results" :key="result.teamName">
        <td>{{ i+1 }}.</td>
        <td>{{ result.teamName }}</td>
        <td>{{ result.solved }}</td>
        <td>{{ formatTimestamp(result.totalTime) }}</td>
      </tr>
    </tbody>
  </table>
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
