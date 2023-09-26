<template>
  <section>
    <nav id="navbar" class="navbar pt-4" role="navigation" aria-label="main navigation">
      <div class="menu">
        <template v-for="item in menuItems">
          <NuxtLink :to="item.href" class="menu-item">
            {{item.text}}
          </NuxtLink>
        </template>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">

const config: { public: { gameFinished: boolean } } = useRuntimeConfig()
const gameFinished = config.public.gameFinished

const menuItems: Record<string, string>[] = [
  {href: '/o-barce', text: 'o barce'},
  {href: '/pravidla', text: 'pravidla'},
]

if (!gameFinished) {
  menuItems.push({href: '/registrace', text: 'registrace'})
}

  menuItems.push({href: '/tymy', text: 'týmy'})

if (gameFinished) {
  menuItems.push({href: '/sifry', text: 'šifry'}, {href: '/statistiky', text: 'statistiky'}, {href: '/vysledky', text: 'výsledky'})
}

</script>

<style>
  .menu
    {
        width: 100%;
        height: 50px;
        background: #FFF;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        border-top: black 1px solid;
        border-bottom: black 1px solid;
    }

  .menu-item
    {
        display: inline-block;
        text-transform: uppercase;
        padding: 10px 20px 10px 20px;
        font-size: 150%;
            
    }

  .menu a
    {
        text-decoration: none;
        color: #000;
        font-weight: normal;
    }

  .menu a.router-link-active {
      text-decoration: underline;
    }

  .menu a:hover
    {
        color: #f00;
    }

</style >

