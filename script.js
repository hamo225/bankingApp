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
const HEADER = document.querySelector(".header");
document.querySelectorAll(".section");
document.getElementById("section--1");
document.getElementsByTagName("button");
document.getElementsByClassName("btn");

// CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML

//create a div element to be used
const message = document.createElement("div");
// add a class list to the div element
message.classList.add("cookie-message");

//set the innerHTML to include a button
message.innerHTML =
  "Cookies for improved functionality <button class='btn btn--close-cookie' >OK</button>";

// append or prepend the header with the message
// HEADER.prepend(message);
HEADER.append(message); //cannot have both so the last one is taken
// HEADER.append(message.cloneNode(true)); //must copy the message node and set to true to both append and prepend
// HEADER.before(message);
// HEADER.after(message);

// DELETE ELEMENETS
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove(); //es6 way
  //old way
  message.parentElement.removeChild(message); //example of dom traversing
});

// STYLES, ATTRIBUTES, CLASSES
