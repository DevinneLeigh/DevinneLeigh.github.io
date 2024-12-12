<script setup>
import { ref } from 'vue'

// const props = defineProps({
  
// })

let open = ref(false);

function toggleMenu() {
  open.value = !open.value;
}

</script>

<template>

  <!-- Navbar -->
  <div class="w3-top">
    <div class="w3-bar w3-red w3-card w3-left-align w3-large">
      <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" @click="toggleMenu" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
      <a href="#home" class="w3-bar-item w3-button w3-hide-small  w3-padding-large w3-white">Home</a>
      <a href="#why" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Why?</a>
      <a href="#about" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">About</a>
    </div>

    <!-- Navbar on small screens -->
    <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large" :class="open ? 'w3-show' : ''">
      <a href="#home" class="w3-bar-item w3-button w3-padding-large">Home</a>
      <a href="#why" class="w3-bar-item w3-button w3-padding-large">Why?</a>
      <a href="#about" class="w3-bar-item w3-button w3-padding-large">About</a>
    </div>
  </div>

</template>
