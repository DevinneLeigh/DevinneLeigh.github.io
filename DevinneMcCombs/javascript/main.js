"use strict";

const menuToggle = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")
const btn = document.getElementById("submit_button")

//open mobile navigation
menuToggle.addEventListener("click", function() { 
    if (mobileNav) {
        mobileNav.classList.toggle("open");

    }
        
})

//contact confirm message
btn.addEventListener("click", function() {
    alert("Thanks!"); 
})

