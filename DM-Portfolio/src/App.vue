<template>
  <div class="container">
    <h1>Vue Theme Starter</h1>
    <p>This is a simple light/dark mode setup.</p>

    <button @click="toggle">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
    </button>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()
</script>