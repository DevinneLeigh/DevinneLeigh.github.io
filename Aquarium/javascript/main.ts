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

// submit membership form
const nameError = document.getElementById("name_error")
const phoneError = document.getElementById("phone_error")
const emailError = document.getElementById("email_error")
let submit = document.querySelector("#submit");

const processMembership = () => {
    const name = document.querySelector("#name") as HTMLInputElement;
    const email = document.querySelector("#email_address") as HTMLInputElement;
    const phone = document.querySelector("#phone") as HTMLInputElement;
    let phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);

    let isValid = true;
    if (name && nameError) {
        if (name.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        } else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phonePattern) {
            phoneError.innerText = "";
        } else {
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

document.addEventListener("DOMContentLoaded", () => { 
    if (submit) {
        document.querySelector("#submit")?.addEventListener("click", processMembership);
    }
});

// submit ticket form
const cardError = document.getElementById("card_error")
const monthError = document.getElementById("month_error")
const yearError = document.getElementById("year_error")
const ccvError = document.getElementById("ccv_error")
const dateError = document.getElementById("date_error")
let confirmTickets = document.querySelector("#confirm");
const card = document.querySelector("#card_number") as HTMLInputElement;

const processTickets = () => {
    const name = document.querySelector("#name") as HTMLInputElement;
    const email = document.querySelector("#email_address") as HTMLInputElement;
    const phone = document.querySelector("#phone") as HTMLInputElement;
    const card = document.querySelector("#card_number") as HTMLInputElement;
    const month = document.querySelector("#month") as HTMLSelectElement;
    const year = document.querySelector("#year") as HTMLSelectElement;
    const ccv = document.querySelector("#ccv") as HTMLInputElement;
    const date = document.querySelector("#datepicker") as HTMLInputElement;
    let phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    let cardPattern = card.value.match(/^\d{4}[ \t]+\d{4}[ \t]+\d{4}[ \t]+\d{4}/);

    let isValid = true;
    if (name && nameError) {
        if (name.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        } else {
            nameError.innerText = "";
        }
    }
    if (phone && phoneError) {
        if (phonePattern) {
            phoneError.innerText = "";
        } else {
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

document.addEventListener("DOMContentLoaded", () => { 
    if (confirmTickets) {
        document.querySelector("#confirm")?.addEventListener("click", processTickets);
    }
});

// image slides
let slideIndex = 1;
if (document.getElementsByClassName("mySlides").length) {
    showSlides(slideIndex);
}

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

// ticket price calc
const adult = document.getElementById("adult_number")
const child = document.getElementById("child_number")
const total = document.getElementById("total")

let childPrice = 0;
let adultPrice = 0;
let ticketTotal = childPrice + adultPrice;

if (total) {
    total.innerText = "Total: $0";
}

adult?.addEventListener('change', function(event) {
    let adult = parseFloat((<HTMLInputElement>document.getElementById("adult_number")).value);
    
    adultPrice = adult * 20;
    ticketTotal = childPrice + adultPrice;
    if (total) {
        total.innerText = "Total: $" + ticketTotal;
    }
});

child?.addEventListener('change', function(event) {
    let child = parseFloat((<HTMLInputElement>document.getElementById("child_number")).value);
    
    childPrice = child * 15;
    ticketTotal = childPrice + adultPrice;
    if (total) {
        total.innerText = "Total: $" + ticketTotal;
    }
});
