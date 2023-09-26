<template>
  <div class="main">
    <section class="content">
      <div v-html="content" />
    </section>
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
      max-width: 50%;
      float: right;
  }
</style>

