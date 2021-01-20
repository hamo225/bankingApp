"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//
//
//
//
//
// SELECTING ELEMENTS
// const HEADER = document.querySelector(".header");
// const section = document.querySelectorAll(".section"); //will select a nodelist
// const section1 = document.getElementById("section--1");
// const section2 = document.getElementById("section--2");
// const section3 = document.getElementById("section--3");
// const buttons = document.getElementsByTagName("button"); //collection
// const btn = document.getElementsByClassName("btn"); //collection

// section1.style.backgroundColor = "blue";
// section2.style.backgroundColor = "red";
// section3.style.backgroundColor = "yellow";

// CREATING AND INSERTING ELEMENTS
//.insertAdjacentHTML //inserting adding html to an element

//create a div element to be used
// const message = document.createElement("div");
// // add a class list to the div element
// message.classList.add("cookie-message"); //cookie-message exist in style.css
// //set the innerHTML to include a button
// message.innerHTML =
//   "Cookies for improved functionality <button class='btn btn--close-cookie' >OK</button>";

// // append or prepend the header with the message
// HEADER.prepend(message);
// // HEADER.append(message); //cannot have both so the last one is taken
// // HEADER.append(message.cloneNode(true)); //must copy the message node and set to true to both append and prepend
// // HEADER.before(message);
// // HEADER.after(message);

// // DELETING ELEMENETS
// document.querySelector(".btn--close-cookie").addEventListener("click", () => {
//   message.remove(); //es6 way
//   //old way
//   message.parentElement.removeChild(message); //example of dom traversing
// });

// // STYLES, ATTRIBUTES, CLASSES

// // styles
// message.style.backgroundColor = "#37383d";
// message.style.padding = "1rem";
// message.style.width = "120%";

// console.log(getComputedStyle(message).color);

// const height = getComputedStyle(message).height;
// message.style.height = Number.parseFloat(height, 10) + 20 + "px";

// // changing css variables in JS
// // document.documentElement.style.setProperty("--color-primary", "orangered");

// // attributes - standard
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt); //works with standard properties only
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = "Changed it";
// console.log(logo.alt); //works with standard properties only

// // attributes - non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "BANKIST");
// logo.getAttribute("src");
// console.log(logo.src);
// console.log(logo);
// console.log(logo.src);

// // data attributes

// // classes

// logo.classList.add("c", "j");
// logo.classList.remove("c");
// logo.classList.toggle("c");
// logo.classList.contains("c");
/* ******************************************************************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************
 ******************************************************************************
 */

// Smooth Scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log("current scroll (X/Y)", window.pageXOffset, pageYOffset);

  // height and width of viewport
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling -current position plus current scroll old way. Calculating the position
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // to implement smooth scrolling need to specify an object
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // modern browser way
  section1.scrollIntoView({ behavior: "smooth" });
});

// Events - signal generated by dom node - signal means somehing has happened. like a click.
//we use event listeners to listen for the signal, whether we add a an action to the event or not when it is clicked - the event will happen when it is clicked.

// mouse enter event
const h1 = document.querySelector("h1");

const alertH1 = () => {
  alert("enters");
};

h1.addEventListener("mouseenter", alertH1);

// removing the event listener
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 5000);

h1.addEventListener("mouseleave", () => {
  alert("leave");
});
