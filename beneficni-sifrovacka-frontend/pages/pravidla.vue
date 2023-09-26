<template>
  <div>
    <section class="content">
      <div v-html="content" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
const content = ref('')
try {
  const { data } = await useFetch('/api/pages/pravidla')
  content.value = marked(data.value.attributes.content, { mangle: false, headerIds: false })
} catch (err) {
}
</script>
