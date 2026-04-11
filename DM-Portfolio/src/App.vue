<script setup>
import Nav from './components/Nav.vue';
import ProjectCard from './components/ProjectCard.vue';
import LightDarkToggle from './components/LightDarkToggle.vue';
import Footer from './components/Footer.vue';
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()

</script>

<template>
  <body>
    <Nav />
    <main>
      <h1>Website Designer. Software Developer.</h1>
      <ProjectCard />
      <LightDarkToggle />
    </main>
    <Footer />
  </body>
</template>
