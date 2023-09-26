<template>
  <header>
      <img src="./logo2.png">
      <h1>
          Benefiční šifrovačka<br>Divadla Barka
      </h1>
  </header>
  <div>
    <MainMenu />
    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup lang="ts">

</script>


<style>
  *
  {
      padding: 0;
      margin: 0;
  }

  body
  {
      background: #FFF;
      font-family: Source Sans Pro;
      margin: 0;
      padding: 10px 0 0 0;
  }

  header
  {
      width: 1000px;
      height: 200px;
      background: #FFF;
      margin-left: auto;
      margin-right: auto;
      
  }
  header img
  {
      height: 180px;
      float: left;
  }

  header h1
  {
      font-size: 350%;
      text-transform: uppercase;
      padding: 20px;
      margin-left: 20px;
      text-align: center;
      font-weight: 100;
  }

  .content
  {
      width: 1000px;
      padding-top: 20px;
      background: #FFF;
      margin-left: auto;
      margin-right: auto;
  }

  .content p
  {
      margin: 20px 0;
  }
</style>
