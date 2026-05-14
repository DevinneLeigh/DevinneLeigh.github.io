<script setup>
import { ref } from "vue";
import ContactForm from "./ContactForm.vue";
import SuccessPopup from "./SuccessPopup.vue";

const emit = defineEmits(["close"]);

const showSuccess = ref(false);

function close() {
  emit("close");
}

function handleSuccess() {
  showSuccess.value = true;
}

function closeSuccess() {
  showSuccess.value = false;
  close();
}
</script>

<template>
  <div class="contact-backdrop" @click.self="close">
    <div class="popup">
        <div class="content-wrapper">
            <button class="close-button" @click="close">✕</button>
            <h2>{{ title }}</h2> 
            <ContactForm @success="handleSuccess"/>
            <SuccessPopup
              v-if="showSuccess"
              @close="closeSuccess"
            />
        </div>
    </div>
  </div>
</template>
