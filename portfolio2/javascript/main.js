"use strict";

// Wrap every letter in a span
var text = document.querySelectorAll('.ml12');
for (let i = 0; i < text.length; i++) {
  text[i].innerHTML = text[i].textContent.replace(/\S/g, "<span class='letter'>$&</span>");
}

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1500,
    delay: (el, i) => 500 + 30 * i
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
});

// var path = document.querySelector('.path');
// var length = path.getTotalLength();
// var r = document.querySelector(':root');
// r.style.setProperty('--strokeLength', length);

anime({
  targets: '.line-drawing-demo .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

const menu = document.getElementById("menuToggle")
const mobileNav = document.getElementById("nav")

//open mobile navigation
menu.addEventListener("click", function() { 
    if (mobileNav) {
        mobileNav.classList.toggle("open");

    }
        
})

var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var messageError = document.getElementById("messageError");

var submit = document.querySelector("#submit");

var userName = document.querySelector("#name");
var email = document.querySelector("#email");
var message = document.querySelector("#comment");

var processContact = function () {
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
  }
  if (message && messageError) {
    if (message.value === "") {
      messageError.innerText = "*Required*";
      isValid = false;
    }
    else {
      messageError.innerText = "";
    }
    if (isValid) {
      if (submit) {
        alert("Thank you for your message! You'll receive a response in the next 48 hours.")
      }
    }
  }
};
document.addEventListener("DOMContentLoaded", function () {
  var _a;
  if (submit) {
    (_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", processContact);
  }
});

