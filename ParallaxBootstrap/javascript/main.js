"use strict";

const menuToggle = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")

//open mobile navigation
menuToggle.addEventListener("click", function() { 
    if (mobileNav) {
        mobileNav.classList.toggle("open");

    }
        
})

let img7 = document.getElementById('fake-img7');
let img6 = document.getElementById('img6');
let img5 = document.getElementById('img5');
let img4 = document.getElementById('img4');
let img3 = document.getElementById('img3');
let img2 = document.getElementById('img2');
let img1 = document.getElementById('img1');
let section1 = document.getElementById('section1');
let overflow = document.getElementById('overflow');
let imgHeight = img6.getBoundingClientRect().height;
let startingMargin = 50;
img7.style.top = imgHeight + startingMargin + 'px'; 

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    imgHeight = img6.getBoundingClientRect().height;
  
    // Adjust the speed multiplier as needed
    img1.style.top = scrollTop * -2.5 + 'px';
    img2.style.top = scrollTop * -0.5 + 'px'; 
    img3.style.top = scrollTop * -1 + 'px'; 
    img4.style.top = scrollTop * -1.5 + 'px'; 
    img5.style.top = scrollTop * -2 + 'px'; 
    img6.style.top = scrollTop * -2.5 + 'px';
    img7.style.top = (scrollTop * -2.5) + imgHeight + startingMargin + 'px'; 
    // overflow.style.top = scrollTop * -2.5 + 'px';
    //section1.style.top = scrollTop * 2.5 + 'px';
  });