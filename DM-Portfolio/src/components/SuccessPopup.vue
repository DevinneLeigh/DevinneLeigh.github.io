<script setup>
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="contact-backdrop">
    <div class="popup success-popup">
        <div class="content-wrapper">
            <h2>Message Sent</h2>
            <p>Your message was sent successfully.</p>

            <button
                type="button"
                class="contact-btn"
                @click="emit('close')"
            >
                Close
            </button>
        </div>
    </div>
  </div>
</template>