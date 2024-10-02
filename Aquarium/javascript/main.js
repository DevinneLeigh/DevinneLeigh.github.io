"use strict";
var menuToggle = document.getElementById("menu_toggle");
var mobileNav = document.getElementById("nav");
var signUpButton = document.getElementById("sign_up_button");
var openForm = document.getElementById("open_form");
var background = document.getElementById("kelpImage");
//open mobile navigation
menuToggle.addEventListener("click", function () {
    if (mobileNav) {
        mobileNav.classList.toggle("open");
    }
});
//open form
if (signUpButton) {
    signUpButton.addEventListener("click", function () {
        if (openForm) {
            openForm.classList.toggle("open");
        }
        if (background) {
            background.classList.toggle("open");
        }
    });
}
// submit form
var nameError = document.getElementById("name_error");
var phoneError = document.getElementById("phone_error");
var emailError = document.getElementById("email_error");
var processEntries = function () {
    var name = document.querySelector("#name");
    var email = document.querySelector("#email_address");
    var phone = document.querySelector("#phone");
    var isValid = true;
    if (name && nameError) {
        if (name.value === "") {
            nameError.innerText = "Name required";
            isValid = false;
        }
        else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phone.value === "") {
            phoneError.innerText = "Phone number required";
            isValid = false;
        }
        else {
            phoneError.innerText = "";
        }
    }
    if (email && emailError) {
        if (email.value === "") {
            emailError.innerText = "Email required";
            isValid = false;
            // } // TODO: UNCOMMENT LATER
            // else if (!email.value.includes("@") || !email.value.includes(".")) {
            //     emailError.innerText ="Invalid Email";
            //     isValid = false;
        }
        else {
            emailError.innerText = "";
        }
        if (isValid) {
            window.open("confirm.html", "_self");
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var submit = document.querySelector("#submit");
    if (submit) {
        (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", processEntries);
    }
});
// image slides
var slideIndex = 1;
if (document.getElementsByClassName("mySlides").length) {
    showSlides(slideIndex);
}
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        var slide_1 = slides[i];
        slide_1.style.display = "none";
    }
    var slide = slides[slideIndex - 1];
    slide.style.display = "block";
}
// ticket price calc
var adult = document.getElementById("adult_number");
var child = document.getElementById("child_number");
var total = document.getElementById("total");
var childPrice = 0;
var adultPrice = 0;
var ticketTotal = childPrice + adultPrice;
if (total) {
    total.innerText = "Total: $0";
}
adult === null || adult === void 0 ? void 0 : adult.addEventListener('change', function (event) {
    var selectElement = event.target;
    var selectedIndex = selectElement.selectedIndex;
    var numTickets = parseInt(selectElement.options[selectedIndex].value);
    adultPrice = numTickets * 20;
    ticketTotal = childPrice + adultPrice;
    if (total) {
        total.innerText = "Total: $" + ticketTotal;
    }
});
child === null || child === void 0 ? void 0 : child.addEventListener('change', function (event) {
    var selectElement = event.target;
    var selectedIndex = selectElement.selectedIndex;
    var numTickets = parseInt(selectElement.options[selectedIndex].value);
    childPrice = numTickets * 15;
    ticketTotal = childPrice + adultPrice;
    if (total) {
        total.innerText = "Total: $" + ticketTotal;
    }
});
