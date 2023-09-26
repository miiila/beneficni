<template>
  <section>
    <nav id="navbar" class="navbar pt-4" role="navigation" aria-label="main navigation">
      <div class="menu">
        <NuxtLink to="/o-barce" class="menu-item">
          o barce
        </NuxtLink>
        <NuxtLink to="/pravidla" class="menu-item">
          pravidla
        </NuxtLink>
        <NuxtLink v-if="!gameFinished" to="/registrace" class="menu-item">
          Registrace
        </NuxtLink>
        <NuxtLink v-if="gameFinished" to="/sifry" class="menu-item">
          Šifry
        </NuxtLink>
        <NuxtLink v-if="gameFinished" to="/statistiky" class="menu-item">
          Statistiky
        </NuxtLink>
        <NuxtLink v-if="gameFinished" to="/vysledky" class="menu-item">
          Výsledky
        </NuxtLink>
        <NuxtLink to="/tymy" class="menu-item">
          týmy
        </NuxtLink>
      </div>
    </nav>
  </section>
</template>

<script setup lang="ts">

const config: { public: { gameFinished: boolean } } = useRuntimeConfig()
const showNav = ref(false)
const gameFinished = config.public.gameFinished
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
    }
  .menu a:hover
    {
        color: #F00;
    }

</style >

