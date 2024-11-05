"use strict";

const menuToggle = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")

//open mobile navigation
menuToggle.addEventListener("click", function() { 
    if (mobileNav) {
        mobileNav.classList.toggle("open");

    }
        
})