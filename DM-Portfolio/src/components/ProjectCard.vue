<script setup>
import { onMounted } from 'vue'
import { projects } from "@/data";

onMounted(() => {
  if (window.innerWidth <= 768) {
    const examples = document.querySelectorAll('.example');

    examples.forEach(example => {
      const desc = example.querySelector('.description');

      example.addEventListener('click', () => {
        desc.classList.toggle('open');
      });
    });
  }
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