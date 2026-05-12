<script setup>
import messageIcon from "@/assets/images/icons/message-icon.svg";
import Nav from './components/Nav.vue';
import Header from "./components/Header.vue";
import ProjectCard from './components/ProjectCard.vue';
import ModalButton from './components/ModalButton.vue';
import LightDarkToggle from './components/LightDarkToggle.vue';
import Footer from './components/Footer.vue';
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()

</script>

<template>
    <Nav ></Nav>
      <router-view />
      <ModalButton
      :image="messageIcon"
      alt="Contact Devinne"
      title="Contact Devinne"
      />
      <LightDarkToggle />
</template>

<style lang="scss">
@use '@/assets/styles/main.scss';
</style>
