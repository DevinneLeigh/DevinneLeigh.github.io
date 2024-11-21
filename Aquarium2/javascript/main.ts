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

//open explore page dropdowns
let  dropDown = document.querySelectorAll(".dropdown")!
 
for (let i = 0; i < dropDown.length; i++) {
    dropDown[i].addEventListener("click", function() {
        dropDown[i].classList.toggle("open");
    });
}



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
const cardError = document.getElementById("card_error")
const monthError = document.getElementById("month_error")
const yearError = document.getElementById("year_error")
const ccvError = document.getElementById("ccv_error")
const dateError = document.getElementById("date_error")
const ticketError = document.getElementById("ticket_error")

const confirmTickets = document.querySelector("#confirm")
const submit = document.querySelector("#submit")

const userName = document.querySelector("#name") as HTMLInputElement;
const email = document.querySelector("#email_address") as HTMLInputElement;
const phone = document.querySelector("#phone") as HTMLInputElement;
const cardNumber = document.querySelector("#card_number") as HTMLInputElement;
const month = document.querySelector("#month") as HTMLSelectElement;
const year = document.querySelector("#year") as HTMLSelectElement;
const ccv = document.querySelector("#ccv") as HTMLInputElement;
const date = document.querySelector("#datepicker") as HTMLInputElement;
const adultTicket = document.querySelector("#adult_number") as HTMLInputElement;
const childTicket = document.querySelector("#child_number") as HTMLInputElement;
const toddlerTicket = document.querySelector("#toddler_number") as HTMLInputElement;

const processMembership = () => {
    let phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    let emailPattern = email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

    let isValid = true;
    if (userName && nameError) {
        if (userName.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        } else {
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
            emailError.innerText ="*Invalid Email*";
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

document.addEventListener("DOMContentLoaded", () => { 
    if (submit) {
        document.querySelector("#submit")?.addEventListener("click", processMembership);
    }
});

const processTickets = () => {
    let phonePattern = phone.value.match(/^[(\s]\d{3}[)\s]\d{3}[-\s]\d{4}/);
    let cardPattern = cardNumber.value.match(/^\d{4}[ \t]+\d{4}[ \t]+\d{4}[ \t]+\d{4}/);
    let emailPattern = email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let ccvPattern = ccv.value.match(/^[0-9]{3}/);

    let isValid = true;
    if (userName && nameError) {
        if (userName.value === "") {
            nameError.innerText = "*Required*";
            isValid = false;
        } else {
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
            emailError.innerText ="*Invalid*";
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
        let adultTicket = parseFloat((<HTMLInputElement>document.getElementById("adult_number")).value);
        let childTicket = parseFloat((<HTMLInputElement>document.getElementById("child_number")).value);
        let toddlerTicket = parseFloat((<HTMLInputElement>document.getElementById("toddler_number")).value);
        let ratio = adultTicket / (childTicket + toddlerTicket);

        if (!adultTicket && !childTicket && !toddlerTicket) {
            ticketError.innerText = "*Please add tickets to continue*"
            isValid = false;
        }
        else if (!adultTicket) {
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

// open event info
let  eventBox = document.querySelectorAll(".event_box")!
 
for (let i = 0; i < eventBox.length; i++) {
    eventBox[i].addEventListener("click", function() {
        eventBox[i].classList.toggle("open");
    });
}