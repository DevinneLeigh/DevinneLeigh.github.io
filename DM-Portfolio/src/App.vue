<script setup>
import Nav from './components/Nav.vue';
import Header from "./components/Header.vue";
import ProjectCard from './components/ProjectCard.vue';
import LightDarkToggle from './components/LightDarkToggle.vue';
import Footer from './components/Footer.vue';
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()

</script>

<template>
  <body>
    <Nav ></Nav>
      <router-view />
      <LightDarkToggle />
  </body>
</template>

<style lang="scss">
@use '@/assets/styles/main.scss';
</style>
