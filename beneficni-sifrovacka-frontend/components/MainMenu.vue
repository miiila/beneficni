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
        </div>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">

const config: { public: { gameFinished: boolean } } = useRuntimeConfig()
const gameFinished = config.public.gameFinished

const menuItems: Array<Record<string, string>> = [
  { href: '/o-barce', text: 'o barce' },
  { href: '/pravidla', text: 'pravidla' }
]

if (!gameFinished) {
  menuItems.push({ href: '/registrace', text: 'registrace' })
}

menuItems.push({ href: '/tymy', text: 'týmy' })
menuItems.push({ href: '/tym', text: 'Váš tým' })

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
