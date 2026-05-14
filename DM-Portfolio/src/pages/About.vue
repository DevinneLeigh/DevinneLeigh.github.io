<script setup>
import Header from "@/components/Header.vue";
import SkillBubble from "@/components/SkillBubble.vue";
import Footer from '@/components/Footer.vue';
import ModalButton from '@/components/ModalButton.vue';
import messageIcon from "@/assets/images/icons/message-icon.svg";
</script>

<template>
    <div id="about-page">
        <main>
            <Header
            title="About Devinne"
            subtitle="Turning ideas into polished web experiences."
            />
            <div id="about-content-wrapper">
                <div id="bio-wrapper">
                    <div id="bio">
                        <div id="bio-img">
                            <img src="/images/profile.jpg" alt="Profile picture of Devinne" id="profile-pic">
                        </div>
                        <div id="bio-text">
                            <p class="p1">I'm a front-end developer and designer who enjoys building clean, user-friendly experiences. I'm especially drawn to the visual side of development and love making things that are both functional and thoughtfully designed.</p>
                            <p class="p2">Alongside web projects, I also enjoy creating video games. I've made a visual novel using the Ren'Py engine and a first-person survival horror game in Unity.</p>
                            <p class="p3">Right now I'm learning back-end development and working toward becoming a full-stack developer. Check out my <a href="https://www.github.com/DevinneLeigh/" target="_blank">GitHub</a> to see what I’ve been working on!</p>
                        </div>
                    </div>
                </div>
                <div id="skills-wrapper">
                    <div id="skills">
                        <SkillBubble />
                    </div>
                </div>
            </div> 
        </main>
        <Footer ></Footer>
    </div>
    <ModalButton
      :image="messageIcon"
      alt="Contact Devinne"
      title="Contact Devinne"
      />
</template>