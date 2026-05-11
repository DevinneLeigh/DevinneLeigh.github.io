<script setup>
import ContactForm from '@/components/ContactForm.vue';
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue';
</script>

<template>
    <div id="contact-page">
        <main>
            <Header
            title="Contact Devinne"
            subtitle="Questions, ideas, or opportunities."
            body="Feel free to reach out regarding projects, collaborations, freelance work, or general inquiries. I’m always interested in new ideas and opportunities to create meaningful digital experiences."
            />
            <ContactForm />
        </main>
        <Footer ></Footer>
    </div>
</template>