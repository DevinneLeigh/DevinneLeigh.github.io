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
var cardError = document.getElementById("card_error");
var monthError = document.getElementById("month_error");
var yearError = document.getElementById("year_error");
var ccvError = document.getElementById("ccv_error");
var dateError = document.getElementById("date_error");
var ticketError = document.getElementById("ticket_error");
var confirmTickets = document.querySelector("#confirm");
var submit = document.querySelector("#submit");
var userName = document.querySelector("#name");
var email = document.querySelector("#email_address");
var phone = document.querySelector("#phone");
var cardNumber = document.querySelector("#card_number");
var month = document.querySelector("#month");
var year = document.querySelector("#year");
var ccv = document.querySelector("#ccv");
var date = document.querySelector("#datepicker");
var adultTicket = document.querySelector("#adult_number");
var childTicket = document.querySelector("#child_number");
var toddlerTicket = document.querySelector("#toddler_number");
var processMembership = function () {
    var phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    var emailPattern = email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var isValid = true;
    if (userName && nameError) {
        if (userName.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        }
        else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phone.value === "") {
            phoneError.innerText = "*Required*";
            isValid = false;
        }
        else if (!phonePattern) {
            phoneError.innerText = "*Invalid Number*";
            isValid = false;
        }
        else {
            phoneError.innerText = "";
        }
    }
    if (email && emailError) {
        if (email.value === "") {
            emailError.innerText = "*Required*";
            isValid = false;
        }
        else if (!emailPattern) {
            emailError.innerText = "*Invalid Email*";
            isValid = false;
        }
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
var processTickets = function () {
    var phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    var cardPattern = cardNumber.value.match(/^\d{4}[ \t]+\d{4}[ \t]+\d{4}[ \t]+\d{4}/);
    var emailPattern = email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var ccvPattern = ccv.value.match(/^[0-9]{3}/);
    var isValid = true;
    if (userName && nameError) {
        if (userName.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        }
        else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phone.value === "") {
            phoneError.innerText = "*Required*";
            isValid = false;
        }
        else if (!phonePattern) {
            phoneError.innerText = "*Invalid*";
            isValid = false;
        }
        else {
            phoneError.innerText = "";
        }
    }
    if (email && emailError) {
        if (email.value === "") {
            emailError.innerText = "*Required*";
            isValid = false;
        }
        else if (!emailPattern) {
            emailError.innerText = "*Invalid*";
            isValid = false;
        }
        else {
            emailError.innerText = "";
        }
    }
    if (cardNumber && cardError) {
        if (cardNumber.value === "") {
            cardError.innerText = "*Required*";
            isValid = false;
        }
        else if (!cardPattern) {
            cardError.innerText = "*Invalid*";
            isValid = false;
        }
        else {
            cardError.innerText = "";
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
        else if (!ccvPattern) {
            ccvError.innerText = "*Invalid*";
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
    }
    if (adultTicket && childTicket && ticketError) {
        var adultTicket_1 = parseFloat(document.getElementById("adult_number").value);
        var childTicket_1 = parseFloat(document.getElementById("child_number").value);
        var toddlerTicket_1 = parseFloat(document.getElementById("toddler_number").value);
        var ratio = adultTicket_1 / (childTicket_1 + toddlerTicket_1);
        if (!adultTicket_1 && !childTicket_1 && !toddlerTicket_1) {
            ticketError.innerText = "*Please add tickets to continue*";
            isValid = false;
        }
        else if (!adultTicket_1) {
            ticketError.innerText = "*At least one adult is required*";
            isValid = false;
        }
        else if (ratio < (1 / 6)) {
            ticketError.innerText = "*One adult for every six children is required*";
            isValid = false;
        }
        else {
            ticketError.innerText = "";
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
var eventBox = document.querySelectorAll(".event_box2");
var _loop_1 = function (i) {
    eventBox[i].addEventListener("click", function () {
        eventBox[i].classList.toggle("open");
    });
};
for (var i = 0; i < eventBox.length; i++) {
    _loop_1(i);
}
