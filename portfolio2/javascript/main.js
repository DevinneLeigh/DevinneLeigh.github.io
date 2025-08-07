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

const menu = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")

//open mobile navigation
menu.addEventListener("click", function() { 
    if (mobileNav) {
        mobileNav.classList.toggle("open");

    }
        
})

function validateForm() {
  // Get the form elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const commentInput = document.getElementById('comment');
  const submit = document.getElementById('submit');

  // Get the error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const commentError = document.getElementById('messageError');

  var isValid = true;

  // Validate the name field
  if (nameInput.value === '') {
    nameError.textContent = 'Name is required';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  // Validate the email field
  if (emailInput.value === '') {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    emailError.textContent = 'Invalid email format';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

    // Validate the name field
    if (commentInput.value === '') {
      commentError.textContent = 'Message is required';
      isValid = false;
    } else {
      commentError.textContent = '';
    }

    if (isValid) {
      if (submit) {
        window.open("contactConfirm.html", "_self");
      }
    }
  }

// Function to validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Add event listeners to the input fields to trigger validation on change
document.getElementById('name').addEventListener('change', validateForm);
document.getElementById('email').addEventListener('change', validateForm);
document.getElementById('comment').addEventListener('change', validateForm);

document.addEventListener("DOMContentLoaded", function () {
  if (submit) {
    document.querySelector("#submit").addEventListener("onclick", validateForm);
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  const descriptions = document.querySelectorAll('.description');

  if (!descriptions.length) return;

  if (!supportsHover) {
    descriptions.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });
  } else {
    descriptions.forEach(item => {
      item.addEventListener('mouseenter', () => item.classList.add('active'));
      item.addEventListener('mouseleave', () => item.classList.remove('active'));
    });
  }
});




// const header = document.querySelector("header")

// document.addEventListener("scroll", function() { 
  
//   if (window.scrollY > document.getElementById('one').getBoundingClientRect().height) {
//     header.classList.toggle("hide");
//     console.log("We scrolled past it");
//   }
//   else {
//     header.classList.toggle("show");
//   }
      
// })
