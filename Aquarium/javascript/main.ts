"use strict";

const menuToggle = document.getElementById("menu_toggle")!
const mobileNav = document.getElementById("nav")
const signUpButton = document.getElementById("sign_up_button")
const openForm = document.getElementById("open_form")
const background = document.getElementById("kelpImage")

//open mobile navigation
menuToggle.addEventListener("click", function() { 
    if (mobileNav) {
        mobileNav.classList.toggle("open");

    }
        
})

//open form
if (signUpButton) {
    signUpButton.addEventListener("click", function() {
        if (openForm) {
            openForm.classList.toggle("open");
        }
        if (background) {
            background.classList.toggle("open");
        }
    })
}

// submit form
const nameError = document.getElementById("name_error")
const phoneError = document.getElementById("phone_error")
const emailError = document.getElementById("email_error")

const processEntries = () => {
    const name = document.querySelector("#name") as HTMLInputElement;
    const email = document.querySelector("#email_address") as HTMLInputElement;
    const phone = document.querySelector("#phone") as HTMLInputElement;

    let isValid = true;
    if (name && nameError) {
        if (name.value === "") {
            nameError.innerText = "Name required";
            isValid = false;
        } else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phone.value === "") {
            phoneError.innerText = "Phone number required"; 
            isValid = false;
        } else {
            phoneError.innerText = "";
        }
    }
    if (email && emailError) {
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
    }
};
document.addEventListener("DOMContentLoaded", () => { 
    let submit = document.querySelector("#submit");
    if (submit) {
        document.querySelector("#submit")?.addEventListener("click", processEntries);
    }
});

// image slides
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n: number) {
  showSlides(slideIndex += n);
}

function currentSlide(n: number) {
  showSlides(slideIndex = n);
}

function showSlides(n: number) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    let slide = slides[i] as HTMLElement;
    slide.style.display = "none";
  }

  let slide = slides[slideIndex-1] as HTMLElement;
  slide.style.display = "block";  
}