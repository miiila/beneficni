<template>
  <div class="container">
    <div class="row">
      <div class="twelve columns">
        <header>
          <a href="/"><img :src="'/logo2.png'" class="u-pull-left"></a>
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
      color: #ea1a21;
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

  .button.button-primary, button.button-primary, input[type="submit"].button-primary, input[type="reset"].button-primary, input[type="button"].button-primary
  {
    background-color: #ea1a21;
    border-color: #ea1a21;
  }

  .button.button-primary:hover, button.button-primary:hover, input[type="submit"].button-primary:hover, input[type="reset"].button-primary:hover, input[type="button"].button-primary:hover, .button.button-primary:focus, button.button-primary:focus, input[type="submit"].button-primary:focus, input[type="reset"].button-primary:focus, input[type="button"].button-primary:focus
  {
    filter: brightness(85%);
    background-color: #ea1a21;
    border-color: #ea1a21;
  }

</style>
