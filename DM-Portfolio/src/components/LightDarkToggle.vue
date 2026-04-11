<script setup>
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()

</script>

<template>
  <div class ="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="themeToggle" @click="toggle">
    <!-- <label class="form-check-label" for="flexSwitchCheckDefault">Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode</label> -->
  </div>

</template>