<template>
  <section>
    <nav id="navbar" role="navigation" aria-label="main navigation">
      <div class="row menu">
        <template v-for="item in menuItems" :key="item.href">
          <div class="three columns">
            <NuxtLink :to="item.href" class="menu-item">
              {{ item.text }}
            </NuxtLink>
          </div>
        </template>
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
    }

  .menu-item
    {
        text-transform: uppercase;
        font-size: 150%;

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
