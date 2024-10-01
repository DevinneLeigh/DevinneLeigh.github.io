"use strict";

const menuToggle = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")
const signUpButton = document.getElementById("sign_up_button")

//open mobile navigation
// if (menuToggle) {
    menuToggle.addEventListener("click", function() { 
        console.log("click")
        if (mobileNav) {
            mobileNav.classList.toggle("open");

        }
        
    })
// }


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

