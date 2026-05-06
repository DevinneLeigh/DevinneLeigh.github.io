<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const isOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

/* auto-close on route change */
watch(
  () => router.currentRoute.value.fullPath,
  () => {
    isOpen.value = false
  }
)
</script>

<template>
  <header>
    <nav class="navbar fixed-top">
      <div class="container-fluid">

        <a class="navbar-brand"></a>

        <!-- toggle -->
        <button class="navbar-toggler" @click="toggleMenu">
          <div class="hamburger">☰</div>
        </button>

        <!-- drawer -->
        <div class="drawer" :class="{ open: isOpen }">

          <div class="drawer-header">
            <button class="close-button" @click="closeMenu">✕</button>
          </div>

          <ul class="nav-list">
            <li>
              <router-link to="/" class="nav-link" @click="closeMenu"><p>Home</p></router-link>
            </li>

            <li>
              <router-link to="/about" class="nav-link" @click="closeMenu"><p>About</p></router-link>
            </li>

            <li>
              <router-link to="/portfolio" class="nav-link" @click="closeMenu"><p>Portfolio</p></router-link>
            </li>

            <li>
              <router-link to="/contact" class="nav-link" @click="closeMenu"><p>Contact</p></router-link>
            </li>
          </ul>

        </div>

        <!-- backdrop -->
        <div v-if="isOpen" class="backdrop" @click="closeMenu"></div>

      </div>
    </nav>
  </header>
</template>