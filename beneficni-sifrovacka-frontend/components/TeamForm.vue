<template>
  <form @submit.prevent="$emit('on-submit', teamForm)">
    <div class="row">
      <div class="six columns">
        <label for="name">Název týmu</label>
        <input
          id="name"
          v-model="teamForm.username"
          class="u-full-width"
          type="text"
          placeholder="název týmu"
          required
        >
        <label for="email">Email</label>
        <input
          id="email"
          v-model="teamForm.email"
          class="u-full-width"
          type="email"
          placeholder="beneficni@sifrovacky.cz"
          required
        >
        <label for="password">Heslo</label>
        <input
          id="password"
          v-model="teamForm.password"
          class="u-full-width"
          type="password"
          placeholder="heslo"
          :required="required"
        >
      </div>
      <div class="six columns">
        <label for="player1">První hráč</label>
        <input
          id="player1"
          v-model="teamForm.members[0]"
          class="u-full-width"
          type="text"
          placeholder="jméno nebo přezdívka"
          required
        >
        <label for="player2">Druhý hráč</label>
        <input id="player2" v-model="teamForm.members[1]" class="u-full-width" type="text" placeholder="jméno nebo přezdívka">
        <label for="player3">Třetí hráč</label>
        <input id="player3" v-model="teamForm.members[2]" class="u-full-width" type="text" placeholder="jméno nebo přezdívka">
        <label for="player4">Čtvrtý hráč</label>
        <input id="player4" v-model="teamForm.members[3]" class="u-full-width" type="text" placeholder="jméno nebo přezdívka">
        <label for="player5">Pátý hráč</label>
        <input id="player5" v-model="teamForm.members[4]" class="u-full-width" type="text" placeholder="jméno nebo přezdívka">
      </div>
    </div>
    <div class="row">
      <div class="twelve columns">
        <input class="button-primary u-full-width" type="submit" :value="buttonText">
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
interface TeamForm {
  username: String
  email: String
  password: String
  members: String[]
}

defineEmits(['on-submit'])

const props = defineProps({
  buttonText: { type: String, required: true },
  team: { type: Object, default () { return {} } },
  required: Boolean,
  disabled: Boolean
})

const teamForm: TeamForm = {
  username: props.team?.username ?? '',
  email: props.team?.email ?? '',
  password: props.team?.password ?? '',
  members: props.team?.members ?? []
}
</script>
