<script setup>
import { projects } from "@/data";

document.addEventListener('DOMContentLoaded', () => {
  const isSmallScreen = window.innerWidth <= 768;
  const examples = document.querySelectorAll('.example');

  examples.forEach(example => {
    const desc = example.querySelector('.description');

    if (isSmallScreen) {
      // On small screens: toggle on click
      example.style.cursor = 'pointer'; // indicate clickable
      example.addEventListener('click', () => {
        desc.classList.toggle('open');
      });
    } else {
      // On large screens: show on hover using JS class toggling
      example.addEventListener('mouseenter', () => {
        desc.classList.add('open');
      });
      example.addEventListener('mouseleave', () => {
        desc.classList.remove('open');
      });
    }
  });
});
</script>

<template>
  <div id="webExamples">
    <div v-for="project in projects" :key="project.id" class="example">
        <span class="description">
            <p>{{ project.description }}</p>
            <a :href="project.link" target="_blank">
                <p class="go">VIEW SITE &rarr;</p>
            </a>
        </span>
        <img :src="project.image" :alt="project.name">
    </div>
  </div>
</template>