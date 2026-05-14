<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import GameCanvas from '@/components/GameCanvas.vue';
import ModalButton from '@/components/ModalButton.vue';
import messageIcon from "@/assets/images/icons/message-icon.svg";

const router = useRouter()

</script>

<template>
    <div id="home-page">
        <main id ="home-main">
            <div id="home-top">
                <GameCanvas />
                <div id="button-wrapper">
                    <router-link to="/portfolio" custom v-slot="{ navigate }">
                    <button @click="navigate">
                        <span id="text">View all Project Examples</span><span id="arrow">→</span>
                    </button>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
    <ModalButton
      :image="messageIcon"
      alt="Contact Devinne"
      title="Contact Devinne"
      />
</template>