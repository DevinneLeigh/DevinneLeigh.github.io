<script setup>
// import { ref } from 'vue'

// const props = defineProps({
  
// })

function showAlert(msg) {
  alert(msg);
}

</script>

<template>

  <!-- Header -->
  <header id="home" class="w3-container w3-red w3-center" style="padding:128px 16px">
    <h1 class="w3-margin w3-jumbo">A Service Company</h1>
    <p class="w3-xlarge">Performing Services</p>
    <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top" @click="showAlert('Started.')">Get Started</button>
  </header>


</template>
