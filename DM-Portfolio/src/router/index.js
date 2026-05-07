import { createRouter, createWebHistory } from 'vue-router'


import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Contact from '@/pages/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/portfolio', name: 'Portfolio', component: Portfolio },
  { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory('/DM-Portfolio/dist/'),
  routes,
})

export default router