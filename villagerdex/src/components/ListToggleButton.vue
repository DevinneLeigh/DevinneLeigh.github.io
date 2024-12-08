<script setup>
import { ref } from 'vue'

const props = defineProps({
  state: Object,
})

</script>




<template>

    <button @click="state.listView = !state.listView" class="list-btn">
        View Villager List
    </button>

</template>
