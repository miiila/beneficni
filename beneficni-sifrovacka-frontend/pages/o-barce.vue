<template>
  <div class="main">
    <div v-html="content" />
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
const content = ref('')
try {
  const { data } = await useFetch('/api/pages/o-barce')
  content.value = marked(data.value.attributes.content, { mangle: false, headerIds: false })
} catch (err) {
}
</script>
<style>
  .main img
  {
      display: block;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
  }
</style>

