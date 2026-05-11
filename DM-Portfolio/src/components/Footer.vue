<script setup>
    import { footer } from "@/data"
</script>

<template>
    <footer>
        <div v-for="item in footer" :key="item.id" class="footer_section">
            <div>
                <a class="icon" :href="item.link" target="_blank"><div class="icon-image" :class="item.class"></div></a>
            </div>
            <div>
                <p>{{ item.text }}<a :href="item.link" target="_blank">{{ item.linkText }}</a></p>
            </div>
        </div>
    </footer>  
</template>