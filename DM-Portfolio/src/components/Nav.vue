<script setup>
   import { useRouter } from 'vue-router'
</script>

<template>
   <header>
      <nav class="navbar fixed-top">
      <div class="container-fluid">
         <a class="navbar-brand"></a>
         <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <div class="hamburger">☰</div>
         </button>
         <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
               <li class="nav-item">
                  <router-link class="nav-link" to="/">Home</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link" to="/about">About</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link" to="/contact">Contact</router-link>
               </li>
            </ul>
            </div>
         </div>
      </div>
      </nav>
   </header> 
</template>