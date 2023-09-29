<template>
  <ClientOnly>
    <LoginForm v-if="!authStore.team" @team-login="teamLogin" />
    <div v-else>
      <section class="block">
        <div class="block">
          <div v-if="!team?.paid">
            <div class="row">
              <div class="eight columns">
                <div>Dobrovolné startovné prosím uhraďte na účet Divadla Barka z.ú.: <strong>2201897677 / 2010</strong>.</div>
                <div>Váš variabilní symbol je: <strong>{{ 202310000 + team?.id }}</strong>.</div>
                <div>Do avíza prosím uveďte slovo “Šifrovačka”.</div>
              </div>

              <div class="four columns">
                <div>Nebo můžete využít QR kód:</div>
                <qrcode-vue :value="value" :size="200" />
              </div>
              <div>
                Nevíte, kolik je vhodné poslat? Tak vězte, že:
                <ul>
                  <li>200 Kč poskytne 1 hodinu tepla,</li>
                  <li>500 Kč poskytne práci technika na půlden,</li>
                  <li>1000 Kč poskytne světlo na 1 představení.</li>
                </ul>
              </div>
              <div>
                Potřebujete-li potvrzení o daru, kontaktujte přímo Barku na e-mailu barka@divadlobarka.cz
              </div>
            </div>
          </div>
          <div v-else>
            Děkujeme za platbu.
          </div>
        </div>
      </section>
      <hr>
      <section class="block">
        <TeamForm button-text="Aktualizovat" :team="team" @on-submit="updateTeam" />
      </section>
      <button class="button twelve columns" @click="authStore.logout">
        Odhlásit se
      </button>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { useAuthStore, type AuthStore } from '~/stores/auth'

interface Team {
  id: number
  username: String
  email: String
  password: String
  paid: Boolean | false
  paymentReference: String
  members: string[]
}

interface TeamForm {
  username: String
  phone: String
  email: String
  password?: String
}

const authStore: AuthStore = useAuthStore()
// const { $notification } = useNuxtApp()
const team = ref<Team | null>(null)

if (authStore.team !== null) {
  await fetchTeam()
}

const value = `SPD*1.0*ACC:CZ3720100000002201897677*AM:200.00*CC:CZK*MSG:Sifrovacka*X-VS:${202310000 + team.value?.id}`

async function fetchTeam () {
  team.value = await $fetch('/api/team', { method: 'GET', headers: { Authorization: `Bearer ${authStore.jwt}` } })
}

function teamLogin (currentTeam: Team) {
  team.value = currentTeam
}

async function updateTeam (teamForm: TeamForm) {
  const updateForm = teamForm
  if (updateForm.password === '') {
    delete updateForm.password
  }

  try {
    await $fetch(`/api/teams/${team.value.id}`, { method: 'PUT', body: updateForm, headers: { Authorization: `Bearer ${authStore.jwt}` } })
    await fetchTeam()
  } catch (err: any) {
  }
}
</script>
