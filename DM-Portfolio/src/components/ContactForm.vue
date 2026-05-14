<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";

const emit = defineEmits(["success"]);

const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");

const sendEmail = async () => {
  try {
    await emailjs.send(
      "service_6kn8eop",
      "template_wr02gkh",
      {
        from_name: name.value,
        from_email: email.value,
        subject: subject.value,
        message: message.value,
      },
      "csAX1d4oB0_VB9HYo"
    );

    emit("success");
    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
  } catch (error) {
    console.error("Email failed:", error);
    alert("Failed to send message.");
  }
};
</script>

<template>
    <div class="container contact-form-wrapper">
      <div class="justify-content-center contact-form">
        <form @submit.prevent="sendEmail">
            <div class="row g-3">
                <div class="col-md-6">
                    <label for="name" class="form-label">Name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="name"
                        required
                    >
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="email"
                      required
                    >
                </div>
                <div class="col-12">
                    <label for="subject" class="form-label">Subject</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="subject"
                    >
                </div>
                <div class="col-12">
                    <label for="message" class="form-label">Message</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="message"
                      required
                    ></textarea>
                </div>
                <div class="col-12 text-end">
                    <button type="submit" class="contact-btn">
                      Send Message
                    </button>                 
                </div>
                <span id="status" class="text-danger"></span>
            </div>
        </form>
      </div>
    </div>
</template>