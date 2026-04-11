<script setup>
import ProjectCard from './components/ProjectCard.vue';
import LightDarkToggle from './components/LightDarkToggle.vue';
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()

</script>

<template>
  <div class="container">
    <h1>Vue Theme Starter</h1>
    <p>This is a simple light/dark mode setup.</p>

    <ProjectCard />
    <LightDarkToggle />
  </div>
</template>
