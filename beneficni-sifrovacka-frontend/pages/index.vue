<template>
  <div class="main">
    <div v-html="content" />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
const content = ref('')
try {
  const { data } = await useFetch('/api/pages/main')
  content.value = marked(data.value.attributes.content, { mangle: false, headerIds: false })
} catch (err) {
}
</script>
