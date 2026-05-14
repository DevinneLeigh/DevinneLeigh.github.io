<script setup>
import Header from "@/components/Header.vue";
import ProjectCard from '@/components/ProjectCard.vue';
import ModalButton from '@/components/ModalButton.vue';
import messageIcon from "@/assets/images/icons/message-icon.svg";
</script>

<template>
    <div id="portfolio-page">
        <main>
            <Header
            title="Portfolio"
            subtitle="A collection of projects, designs, and development work."
            body="Here are some of the projects I’ve worked on, ranging from responsive websites to interactive front-end applications. Each project reflects my focus on clean design, usability, and modern development practices."
            /> 
            <ProjectCard />
        </main>
    </div>
    <ModalButton
      :image="messageIcon"
      alt="Contact Devinne"
      title="Contact Devinne"
      />
</template>
