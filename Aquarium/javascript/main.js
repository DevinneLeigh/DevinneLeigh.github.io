
const menuToggle = document.getElementById("menu_toggle")
const mobileNav = document.getElementById("nav")

menuToggle.addEventListener("click", function() {
    mobileNav.classList.toggle("open");
})