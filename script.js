'use strict';

///////////////////////////////////////
//MODAL WINDOW

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SMOOTH SCROLLING
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect(); //coordinates want to get to
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect()); //e.target get the button element clicked
  // //bounding client rec is dependent on the visible page
  // console.log('current scroll (X/Y)', window.pageXOffset, pageYOffset); //current position vs top of page
  // // height and width of viewport
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

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
  section1.scrollIntoView({ behavior: 'smooth' });
});

// PAGE NAVIGATION WITH SMOOTH SCROLLING
// MUST FIND OUT WHY THIS DOES NOT WORK
// document.querySelectorAll('.nav__link').forEach((e) => {
//   // returning a node list and we can use foreach to add event handler to each
//   return e.addEventListener('click', (el) => {
//     el.preventDefault(); //prevent default behaviour of jumping to location
//     const id = this.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// OPTION IF YOU HAVE A LIMITED NUMBER OF ELEMENTS THAT IT APPLIES TO.
//if we have 1000 then this code would make 1000 copies of the function
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// BETTER WAY  - events delegation - important when to be used on items that do not exist on the page until a button is pressed
// 1. Add event listener to common parent element of all elements - nav__links
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target); //e.target is where the event happened
  e.preventDefault();

  // Matching Strategy
  // does the target element have the classlist we are interested in?
  if (e.target.classList.contains('nav__link')) {
    console.log('Link');
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// SELECTING ELEMENTS
// console.log(document.documentElement);
// const HEADER = document.querySelector(".header"); //returns first element of header
// const section = document.querySelectorAll(".section"); //will select a nodelist of all elements called by the .section
// console.log(section);
// const section1 = document.getElementById("section--1"); //id search
// const section2 = document.getElementById("section--2");
// const section3 = document.getElementById("section--3");
// const buttons = document.getElementsByTagName("button"); // all elemenst with name
// console.log(); //returns HTML Collection. Updated live. (Node the same for nodelist)
// const btn = document.getElementsByClassName("btn"); //for elemenst with class name without selector - returns live html collection
// section1.style.backgroundColor = "blue";
// section2.style.backgroundColor = "red";
// section3.style.backgroundColor = "yellow";

// CREATING AND INSERTING ELEMENTS

//.insertAdjacentHTML //inserting adding html to an element - used to create movements

//create a div element to be used
const message = document.createElement('div');

// add a class list to the div element
message.classList.add('cookie-message'); //cookie-message exist in style.css

//set the innerHTML to include a button
message.innerHTML =
  "Cookies for improved functionality <button class='btn btn--close-cookie' >OK</button>";

// append or prepend the header with the message
const HEADER = document.querySelector('.header');
HEADER.prepend(message);
// HEADER.append(message); //cannot have both so the last one is taken
// HEADER.append(message.cloneNode(true)); //must copy the message node and set to true to both append and prepend
// HEADER.before(message);
// HEADER.after(message);

// DELETING ELEMENETS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // console.log('Clicked');
    message.remove(); //es6 way
    //old way
    // message.parentElement.removeChild(message); //example of dom traversing
  });

// STYLES, ATTRIBUTES, CLASSES
message.style.backgroundColor = 'green';
message.style.padding = '1rem 0';
message.style.width = '100vw';

// can read styles of inline styles only - not styles hidden inside a class
console.log(message.style.color); //will return nothing
console.log(message.style.backgroundColor); //will return the inline style color

// to read styles hidden inside classes
console.log(getComputedStyle(message).color); //will return the computed style

const height = getComputedStyle(message).height;
message.style.height = Number.parseFloat(height, 10) + 20 + 'px';

// changing css variables listed in the css file but in JS
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES - standard attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //works with standard properties only
console.log(logo.src);
console.log(logo.className);
logo.alt = 'Changed it';
console.log(logo.alt); //works with standard properties only

// ATTRIBUTES - non-standard
console.log(logo.designer); // will not work as non standard attribute name
console.log(logo.getAttribute('designer')); //gets non standard attirbute value
logo.setAttribute('company', 'BANKIST'); //creates attributes
console.log(logo.getAttribute('src')); //return what is in the code
console.log(logo.src); //returns full src
console.log(logo);

// DATA ATTRIBUTES - all attributes starting with data-
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
console.log(logo.classList.contains('c'));
console.log(logo);

// DO NOT USE
// logo.className = 'x'; //allows only to set one class name and overides all exisitng classes

// Events - signal generated by dom node - signal means somehing has happened. like a click.
//we use event listeners to listen for the signal,
// whether we add a an action to the event or not when it is clicked -
// the event will happen when it is clicked.

// mouse enter event
const h1 = document.querySelector('.h1');
console.log(h1);

const alertH1 = () => {
  setTimeout(() => {
    //can add a timeout delay to the alert
    alert('Works');
  }, 2000);

  //remove the alert so it doesnt happen each time
  h1.removeEventListener('mouseenter', alertH1);
};

// MODERN WAY - BETTER WAY. CAN ADD MULTIPLE FUNCTIONS
h1.addEventListener('mouseenter', alertH1);

// can set a timeout to remove the event listener
setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1), 5000;
});

// OLD SCHOOL
// h1.onmouseenter = function (e) {
//   alert('Works');
// };

// Event propogation

//rgb(255,255,255)
// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation(); //an option but not to be used
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// elements are listening for events coming from the element but also for bubbling up ones

// using event delegation to implement smooth scrolling

// DOM TRAVERSING

const h11 = document.querySelector('.h1');

// GOING DOWN: selecting child
// selects all elements with highlight class that are children of h11 element
console.log(h11.querySelectorAll('.highlight'));
console.log(h11.childNodes); //selects all child nodes
console.log(h11.children); //collects only direct CHILDREN (HTML LIVE COLLECTION)
h11.firstElementChild.style.color = 'orange';
h11.lastElementChild.style.color = 'orange';

// GOING UP: selecting parents

console.log(h11.parentNode);
console.log(h11.parentElement); //usually the one interested in

//more often need to find a parent element no matter how far away
h11.closest('.header').style.background = 'var(--gradient-secondary)';
h11.closest('.h1').style.background = 'red';

// GOING SIDEWAYS: DIRECT SIBLINGS
console.log(h11.previousElementSibling);
console.log(h11.nextElementSibling);

// if need all siblings - then  go up one to parent and then select all children from there
// can then iterate over the html collection (even if not an array) and can apply action to each elemtn with the foreach method
console.log(h11.parentElement.children); //html collection
[...h11.parentElement.children].forEach((e) => {
  if (e !== h11) {
    e.style.transform = 'scale(0.5)';
  }
});

// TABBED COMPONENTS
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// BAD TO USE AS IF WE HAD 100 OF THESE TABS AND THUS 100 COPIES OF THIS CALLBACK FUNCTION.
// tabs.forEach((t) => {
//   t.addEventListener('click', () => {
//     console.log('Tab clicked');
//   });
// });

// THEREFORE - USE EVENT DELEGATION
//  need to attach event handler on the common parent element that we are interested in
// need the event as the parameter - so we can identify where the click happened
tabContainer.addEventListener('click', (e) => {
  // find out where the button was clicked
  const clicked = e.target.closest('.operations__tab');
  // but we need to make sure when we click the span it will select the button not just the span
  // need to find a way to select the parent element that is always a tab
  // use DOM TRAVERSING and the closest method. ---- VERY COMMON IN EVENT DELEGATION
  // console.log(clicked);

  // since we have added the evnt listenser to the tab container. Users can still click anywhere in the tab and not on the buttons and will get a null response in the console.
  // to remove this we can do an if statement that will return early if a condition is matched
  // GUARD CLAUSE
  if (!clicked) return; //this will end the function if clicked does not exist

  // remove the active classlist from all the tabs first
  tabs.forEach((t) => {
    t.classList.remove('operations__tab-active');
  });

  // then add it once it is clicked
  clicked.classList.add('operations__tab--active');

  // activate the content part
  // console.log(clicked.dataset.tab);

  // remove the classlist active for each tab so that they do not stack up on each other when clicked
  tabsContent.forEach((t) => {
    t.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// POINT WITH TABBED CONTENT IS TO WORK WITH CLASSES AND ADD AND REMOVE COMPONENTS AND MANIPULATING CSS STYLES
