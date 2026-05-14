<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ContactForm from '@/components/ContactForm.vue';
import Header from "@/components/Header.vue";
import SuccessPopup from "@/components/SuccessPopup.vue";

const router = useRouter();

const showSuccess = ref(false);

function handleSuccess() {
  showSuccess.value = true;
}

function closeSuccess() {
  router.push("/");
}
</script>

<template>
    <div id="contact-page">
        <main>
            <Header
            title="Contact Devinne"
            subtitle="Questions, ideas, or opportunities."
            body="Feel free to reach out regarding projects, collaborations, freelance work, or general inquiries. I’m always interested in new ideas and opportunities to create meaningful digital experiences."
            />
            <ContactForm @success="handleSuccess"/>
            <SuccessPopup
                v-if="showSuccess"
                @close="closeSuccess"
            />
        </main>
    </div>
</template>