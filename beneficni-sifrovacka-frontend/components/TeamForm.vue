<template>
  <form @submit.prevent="$emit('on-submit', teamForm)">
  <div class="row">
    <div class="six columns">
      <label for="name">Název týmu</label>
      <input class="u-full-width" type="text" placeholder="název týmu" id="name" v-model="teamForm.username" required />
      <label for="email">Email</label>
      <input class="u-full-width" type="email" placeholder="beneficni@sifrovacky.cz" id="email" v-model="teamForm.email" required />
      <label for="password">Heslo</label>
      <input class="u-full-width" type="password" placeholder="heslo" id="password" v-model="teamForm.password" required />
    </div>
    <div class="six columns">
      <label for="player1">První hráč</label>
      <input class="u-full-width" type="text" placeholder="jméno nebo přezdívka" id="player1" v-model="teamForm.members[0]" required />
      <label for="player2">Druhý hráč</label>
      <input class="u-full-width" type="text" placeholder="jméno nebo přezdívka" id="player2" v-model="teamForm.members[1]" />
      <label for="player3">Třetí hráč</label>
      <input class="u-full-width" type="text" placeholder="jméno nebo přezdívka" id="player3" v-model="teamForm.members[2]" />
      <label for="player4">Čtvrtý hráč</label>
      <input class="u-full-width" type="text" placeholder="jméno nebo přezdívka" id="player4" v-model="teamForm.members[3]" />
      <label for="player5">Pátý hráč</label>
      <input class="u-full-width" type="text" placeholder="jméno nebo přezdívka" id="player5" v-model="teamForm.members[4]" />
    </div>
  </div>
  <div class="row">
    <div class="twelve columns">
      <input class="button-primary u-full-width" type="submit" value="Zaregistrovat">
    </div>
  </div>
</form>
</template>

<script setup lang="ts">
  interface TeamForm {
    username: String
    email: String
    password: String
    members: Array<String>
  }

  defineEmits(['on-submit'])

  const props = defineProps({
    buttonText: { type: String, required: true },
    team: { type: Object, default () { return {} } },
    required: Boolean,
    disabled: Boolean
  })

  const teamForm: TeamForm = {
    username: props.team?.username || '',
    email: props.team?.email || '',
    password: props.team?.password || '',
    members: props.team?.members || []
  }
</script>

