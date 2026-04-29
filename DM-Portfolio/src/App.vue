<script setup>
import Nav from './components/Nav.vue';
import ProjectCard from './components/ProjectCard.vue';
import LightDarkToggle from './components/LightDarkToggle.vue';
import GameCanvas from './components/GameCanvas.vue';
import Footer from './components/Footer.vue';
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()

</script>

<template>
  <body>
    <Nav ></Nav>
    <main>
      <GameCanvas />
      <ProjectCard />
      <LightDarkToggle />
    </main>
    <Footer ></Footer>
  </body>
</template>
