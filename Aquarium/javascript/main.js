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
// submit membership form
var nameError = document.getElementById("name_error");
var phoneError = document.getElementById("phone_error");
var emailError = document.getElementById("email_error");
var submit = document.querySelector("#submit");
var processMembership = function () {
    var name = document.querySelector("#name");
    var email = document.querySelector("#email_address");
    var phone = document.querySelector("#phone");
    var phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    var isValid = true;
    if (name && nameError) {
        if (name.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        }
        else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phonePattern) {
            phoneError.innerText = "";
        }
        else {
            phoneError.innerText = "*Required*";
            isValid = false;
        }
    }
    if (email && emailError) {
        if (email.value === "") {
            emailError.innerText = "*Required*";
            isValid = false;
        }
        // else if (!email.value.includes("@") || !email.value.includes(".")) {
        //     emailError.innerText ="Invalid Email";
        //     isValid = false;
        // } 
        else {
            emailError.innerText = "";
        }
        if (isValid) {
            if (submit) {
                window.open("memberConfirm.html", "_self");
            }
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    if (submit) {
        (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", processMembership);
    }
});
// submit ticket form
var cardError = document.getElementById("card_error");
var monthError = document.getElementById("month_error");
var yearError = document.getElementById("year_error");
var ccvError = document.getElementById("ccv_error");
var dateError = document.getElementById("date_error");
var confirmTickets = document.querySelector("#confirm");
var card = document.querySelector("#card_number");
var processTickets = function () {
    var name = document.querySelector("#name");
    var email = document.querySelector("#email_address");
    var phone = document.querySelector("#phone");
    var card = document.querySelector("#card_number");
    var month = document.querySelector("#month");
    var year = document.querySelector("#year");
    var ccv = document.querySelector("#ccv");
    var date = document.querySelector("#datepicker");
    var phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    var cardPattern = card.value.match(/^\d{4}[ \t]+\d{4}[ \t]+\d{4}[ \t]+\d{4}/);
    var isValid = true;
    if (name && nameError) {
        if (name.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        }
        else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phonePattern) {
            phoneError.innerText = "";
        }
        else {
            phoneError.innerText = "*Required*";
            isValid = false;
        }
    }
    if (email && emailError) {
        if (email.value === "") {
            emailError.innerText = "*Required*";
            isValid = false;
        }
        // else if (!email.value.includes("@") || !email.value.includes(".")) {
        //     emailError.innerText ="Invalid Email";
        //     isValid = false;
        // } 
        else {
            emailError.innerText = "";
        }
        if (isValid) {
            if (submit) {
                window.open("memberConfirm.html", "_self");
            }
        }
    }
    if (card && cardError) {
        if (cardPattern) {
            cardError.innerText = "";
        }
        else {
            cardError.innerText = "*Required*";
            isValid = false;
        }
    }
    if (month && monthError) {
        if (month.value === "") {
            monthError.innerText = "*Required*";
            isValid = false;
        }
        else {
            monthError.innerText = "";
        }
    }
    if (year && yearError) {
        if (year.value === "") {
            yearError.innerText = "*Required*";
            isValid = false;
        }
        else {
            yearError.innerText = "";
        }
    }
    if (ccv && ccvError) {
        if (ccv.value === "") {
            ccvError.innerText = "*Required*";
            isValid = false;
        }
        else {
            ccvError.innerText = "";
        }
    }
    if (date && dateError) {
        if (date.value === "") {
            dateError.innerText = "*Required*";
            isValid = false;
        }
        else {
            dateError.innerText = "";
        }
        if (isValid) {
            if (confirmTickets) {
                window.open("ticketConfirm.html", "_self");
            }
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    if (confirmTickets) {
        (_a = document.querySelector("#confirm")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", processTickets);
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
    var adult = parseFloat(document.getElementById("adult_number").value);
    adultPrice = adult * 20;
    ticketTotal = childPrice + adultPrice;
    if (total) {
        total.innerText = "Total: $" + ticketTotal;
    }
});
child === null || child === void 0 ? void 0 : child.addEventListener('change', function (event) {
    var child = parseFloat(document.getElementById("child_number").value);
    childPrice = child * 15;
    ticketTotal = childPrice + adultPrice;
    if (total) {
        total.innerText = "Total: $" + ticketTotal;
    }
});
// open event info
var eventBox1 = document.getElementById("event_box1");
eventBox1.addEventListener("click", function () {
    if (eventBox1) {
        eventBox1.classList.toggle("open");
    }
});
var eventBox2 = document.getElementById("event_box2");
eventBox2.addEventListener("click", function () {
    if (eventBox2) {
        eventBox2.classList.toggle("open");
    }
});
var eventBox3 = document.getElementById("event_box3");
eventBox3.addEventListener("click", function () {
    if (eventBox3) {
        eventBox3.classList.toggle("open");
    }
});
var eventBox4 = document.getElementById("event_box4");
eventBox4.addEventListener("click", function () {
    if (eventBox4) {
        eventBox4.classList.toggle("open");
    }
});
var eventBox5 = document.getElementById("event_box5");
eventBox5.addEventListener("click", function () {
    if (eventBox5) {
        eventBox5.classList.toggle("open");
    }
});
var eventBox6 = document.getElementById("event_box6");
eventBox6.addEventListener("click", function () {
    if (eventBox6) {
        eventBox6.classList.toggle("open");
    }
});
