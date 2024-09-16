"use strict";

const menuToggle = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")
const signUpButton = document.getElementById("sign_up_button")
const openForm = document.getElementById("open_form")
const background = document.getElementById("kelpImage")

//open mobile navigation
menuToggle.addEventListener("click", function() { 
    mobileNav.classList.toggle("open");
})

//open form
if (signUpButton) {
    signUpButton.addEventListener("click", function() {
        openForm.classList.toggle("open");
        background.classList.toggle("open");
    })
}

// submit form
const nameError = document.getElementById("name_error")
const phoneError = document.getElementById("phone_error")
const emailError = document.getElementById("email_error")

const processEntries = () => {
    const name = document.querySelector("#name")
    const email = document.querySelector("#email_address")
    const phone = document.querySelector("#phone")

    let isValid = true;
    if (name.value === "") {
        nameError.innerText = "Name required";
        isValid = false;
    } else {
        nameError.innerText = "";
    }
    if (phone.value === "") {
        phoneError.innerText = "Phone number required"; 
        isValid = false;
    } else {
        phoneError.innerText = "";
    }
    if (email.value === "") {
        emailError.innerText = "Email required";
        isValid = false;
    }
    else if (!email.value.includes("@") || !email.value.includes(".")) {
        emailError.innerText ="Invalid Email";
        isValid = false;
    } else {
        emailError.innerText = "";
    }
    if (isValid) { 
        window.open("confirm.html", "_self");
    }
};
document.addEventListener("DOMContentLoaded", () => { 
    let submit = document.querySelector("#submit");
    if (submit) {
        document.querySelector("#submit").addEventListener("click", processEntries);
    }
});

// image slides
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  slides[slideIndex-1].style.display = "block";  
}

// preloaded images
const logo = new Image();
image.src = "logo.svg";
const _1 = new Image();
image.src = "1.webp";
const _2 = new Image();
image.src = "2.webp";
const _3 = new Image();
image.src = "3.webp";
const _4 = new Image();
image.src = "4.webp";
const _5 = new Image();
image.src = "5.webp";
const _6 = new Image();
image.src = "6.webp";
const _7 = new Image();
image.src = "7.webp";
const _8 = new Image();
image.src = "8.webp";
const kelp = new Image();
image.src = "kelp.png";


