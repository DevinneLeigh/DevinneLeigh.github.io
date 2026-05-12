<template>
  <button class="modal-button" @click="showModal = true">
    <img :src="image" :alt="alt" />
  </button>

  <Modal v-if="showModal" @close="showModal = false" />
</template>

<script setup>
import { ref } from "vue";
import MyModal from "./Modal.vue";

defineProps({
  image: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
});

const showModal = ref(false);
</script>