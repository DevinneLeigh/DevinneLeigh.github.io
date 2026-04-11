import email from '../assets/images/icons/email.svg';
import github from '../assets/images/icons/github.svg';
import itch from '../assets/images/icons/itch.svg';

export const footer = [
    {
        id: 1,
        class: "email",
        alt: "Email icon",
        text: "Email me at: ",
        image: email,
        link: "mailto:devinneleigh@gmail.com",
        linkText: "DevinneLeigh@gmail.com" 
    },
    {
        id: 2,
        class: "github",
        alt: "GitHub icon",
        text: "View my code on ",
        image: github,
        link: "https://www.github.com/DevinneLeigh/",
        linkText: "GitHub"
    },
    {
        id: 3,
        class: "itch",
        alt: "itch.io icon",
        text: "Check out my games on ",
        image: itch,
        link: "https://devinneleigh.itch.io/",
        linkText: "itch.io"
    }
]