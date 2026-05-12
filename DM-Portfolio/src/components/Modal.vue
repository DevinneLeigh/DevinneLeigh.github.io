<template>
  <div class="backdrop" @click.self="close">
    <div class="modal">
      <h2>My Popup</h2>
      <p>This is content inside the modal.</p>

      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}
</style>