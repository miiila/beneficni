<template>
  <section>
    <nav id="navbar" role="navigation" aria-label="main navigation">
      <div class="row">
        <div class="twelve columns menu">
          <template v-for="item in menuItems" :key="item.href">
            <NuxtLink :to="item.href" class="menu-item">
              {{ item.text }}
            </NuxtLink>
          </template>
          <NuxtLink v-if="gameStarted && !gameFinished && authStore.team" to="/hra" class="menu-item">
            hra
          </NuxtLink>
          <NuxtLink v-if="gameStarted && authStore.team" to="/vysledky" class="menu-item">
            výsledky
          </NuxtLink>
          <NuxtLink v-if="gameStarted && authStore.team" to="/vase-akce" class="menu-item">
            vaše akce
          </NuxtLink>
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore, type AuthStore } from '~/stores/auth'
const authStore: AuthStore = useAuthStore()

const config: { public: { gameFinished: boolean, registrationFinished: boolean, gameStarted: boolean } } = useRuntimeConfig()
const registrationFinished = config.public.registrationFinished
const gameFinished = config.public.gameFinished
const gameStarted = config.public.gameStarted

const menuItems: Array<Record<string, string>> = [
  { href: '/o-barce', text: 'o barce' },
  { href: '/pravidla', text: 'pravidla' }
]

if (!registrationFinished) {
  menuItems.push({ href: '/registrace', text: 'registrace' })
}

menuItems.push({ href: '/tymy', text: 'týmy' })
menuItems.push({ href: '/tym', text: 'Váš tým' })

if (gameStarted) {
  menuItems.push({ href: '/hra', text: 'hra' })
  menuItems.push({ href: '/vysledky', text: 'vysledky' })
}

if (gameFinished) {
  menuItems.push({ href: '/sifry', text: 'šifry' }, { href: '/statistiky', text: 'statistiky' }, { href: '/vysledky', text: 'výsledky' })
}

</script>

<style>
  .menu
    {
        text-align: center;
        border-top: black 1px solid;
        border-bottom: black 1px solid;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

  .menu-item
    {
        text-transform: uppercase;
        font-size: 150%;
        flex-grow: 1;
    }

  .menu a
    {
        text-decoration: none;
        font-weight: normal;
    }

  .menu a.router-link-active {
      text-decoration: underline;
    }

</style>
