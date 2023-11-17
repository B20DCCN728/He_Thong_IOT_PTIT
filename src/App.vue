<script setup>
// import { defineProps, withDefaults } from 'vue';
// import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import SideBar from './components/SideBar.vue';
</script>
<template>
  <header>
    <Header />
  </header>

  <main>
    <div class="container">
      <SideBar style="width: 17%; float: left;" />
      <div class="application">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style scoped>
.application {
  margin-top: 60px;
  float: right;
  width: 83%;
}
</style>