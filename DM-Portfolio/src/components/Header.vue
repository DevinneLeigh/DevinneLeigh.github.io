<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  body: {
    type: String,
    default: "",
  },
});
</script>

<template>
    <div class="header">
        <div class="header-text">
            <div class="title">
                <h1>{{ title }}</h1>
            </div>
            <div class="subtitle">
                <h2>{{ subtitle }}</h2>
            </div>
            <div class="body">
                <p>{{ body }}</p>
            </div>
        </div>
    </div>
</template>