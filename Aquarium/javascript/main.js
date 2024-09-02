
let menuToggle = document.getElementById("menu_toggle")
let mobileNav = document.getElementById("nav")

menuToggle.addEventListener("click", function() {
    mobileNav.classList.toggle("open");
})