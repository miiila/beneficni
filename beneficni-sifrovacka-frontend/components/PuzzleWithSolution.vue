<template>
  <tr>
    <td><img :src="puzzle.logoUrl"></td>
    <td><span v-html="puzzle.description" /></td>
      <td class="solution">
      <div>
        <div><a :href="puzzle.url">Zadání</a></div>
        <div @click="displaySolution = !displaySolution">
          <div class="arrow" :class="{rotated: displaySolution}">⏵</div><span> Řešení</span>
        </div>
        <div v-if= "displaySolution" v-html="puzzle.solutionDetails"></div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { marked } from 'marked'

import { type Puzzle } from '~/server/api/types'
import { useAuthStore, type AuthStore } from '~/stores/auth'

const authStore: AuthStore = useAuthStore()

const props = defineProps({
  puzzle: {
    type: Object,
    required: true
  }
})

const displaySolution = ref(false)

const puzzle = props.puzzle as Puzzle

puzzle.description = marked(puzzle.description, { mangle: false, headerIds: false })
puzzle.solutionDetails = marked(puzzle.solutionDetails, { mangle: false, headerIds: false })

</script>

<style scoped>
td {
  word-wrap: anywhere;
  vertical-align: top;
}

.arrow {
  display: inline-block;
  cursor: pointer;
}

.rotated {
  transform: rotate(90deg);
}
</style>
