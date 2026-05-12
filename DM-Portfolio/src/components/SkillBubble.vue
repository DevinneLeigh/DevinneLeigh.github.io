<script setup>
import { skills } from "@/data";

</script>

<template>
<div v-for="skill in skills" :key="skill.id" class="skill">
    <span class="skill-text">{{ skill.name }}</span>
    <img :src="skill.image" :alt="skill.name">
</div>
</template>