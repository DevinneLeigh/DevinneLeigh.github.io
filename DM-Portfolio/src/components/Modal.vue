<script setup>
import ContactForm from './ContactForm.vue';
const props = defineProps({
  title: {
    type: String,
    default: "",
  }
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<template>
  <div class="contact-backdrop" @click.self="close">
    <div class="popup">
        <div class="content-wrapper">
            <button class="close-button" @click="close">✕</button>
            <h2>{{ title }}</h2> 
            <ContactForm/>
        </div>
    </div>
  </div>
</template>
