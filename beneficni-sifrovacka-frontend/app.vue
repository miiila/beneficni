<template>
  <div class="container">
    <div class="row">
      <div class="twelve columns">
      <header>
        <img :src="'/logo2.png'" class="u-pull-left" />
        <h1>
            Benefiční šifrovačka<br>Divadla Barka
        </h1>
      </header>
      <MainMenu />
        <div class="content">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>


<style>
  a
  {
      color: #000;
      font-weight: bold;
  }

  a:hover
  {
      color: #F00;
  }

  body
  {
      background: #FFF;
      font-family: Source Sans Pro;
      font-size: 1.7em;
  }

  header {
    padding-top: 1.5em;
    padding-bottom: 2em;
  }

  header img
  {
      height: 10em;
  }

  header h1
  {
      padding-top: 0.5em;
      font-size: 3em;
      text-transform: uppercase;
      text-align: center;
  }

  .content
  {
      padding-top: 2em;
  }


</style>
