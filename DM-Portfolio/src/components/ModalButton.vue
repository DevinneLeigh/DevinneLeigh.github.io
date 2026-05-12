<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";

defineProps({
  image: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  }
});

const showModal = ref(false);
</script>


<template>
  <button type="button" class="modal-button" @click="showModal = true">
    <img :src="image" :alt="alt" />
  </button>

  <Modal v-if="showModal" :title="title" @close="showModal = false" />
</template>
