<script setup>
import Header from "@/components/Header.vue";
import ProjectCard from '@/components/ProjectCard.vue';
import Footer from '@/components/Footer.vue';
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
        <Footer ></Footer>
    </div>
</template>
