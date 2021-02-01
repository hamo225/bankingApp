'use strict';

///////////////////////////////////////
//MODAL WINDOW

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
// h11.firstElementChild.style.color = 'orange';
// h11.lastElementChild.style.color = 'orange';

// GOING UP: selecting parents

console.log(h11.parentNode);
console.log(h11.parentElement); //usually the one interested in

//more often need to find a parent element no matter how far away
// h11.closest('.header').style.background = 'var(--gradient-secondary)';
// h11.closest('.h1').style.background = 'red';

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

// PASSING ARGUMENTS INTO EVENT HANDLERS - menu fade animation
// event delegation instead of repeating a function
const nav = document.querySelector('.nav');

// REFACTORING CODE - MAKING A GENERAL FUCNTION FOR THE MENU FADE ANIMATION
const handleHover = (e) => {
  //mouse over similar to mouse enter but it bubbles
  if (e.target.classList.contains('nav__link')) {
    //if the target element contains the class name then
    //select the target element
    const link = e.target; //finding out the link that is clicked
    //select the siblings - go to closest .nav and then select all nav__link
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //finding the closest element with .nav class
    //select the logo
    const logo = link.closest('.nav').querySelector('img');

    // for each sibling if it is not selected or not the target then opacity 0.5
    siblings.forEach((s) => {
      if (s != link) {
        s.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

// Use the bind method. It makes a copy of the function and then we pass into it the params we want to use to get the response
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// nav.addEventListener('mouseover', (e) => {
//   // //mouse over similar to mouse enter but it bubbles
//   // if (e.target.classList.contains('nav__link')) {
//   //   //if the target element contains the class name then
//   //   //select the target element
//   //   const link = e.target; //finding out the link that is clicked
//   //   //select the siblings - go to closest .nav and then select all nav__link
//   //   const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //finding the closest element with .nav class
//   //   //select the logo
//   //   const logo = link.closest('.nav').querySelector('img');
//   //   // for each sibling if it is not selected or not the target then opacity 0.5
//   //   siblings.forEach((s) => {
//   //     if (s != link) {
//   //       s.style.opacity = 0.5;
//   //     }
//   //   });
//   //   logo.style.opacity = 0.5;
//   // }
// });

// nav.addEventListener('mouseout', (e) => {
//   // //mouse over similar to mouse enter but it bubbles
//   // if (e.target.classList.contains('nav__link')) {
//   //   //if the target element contains the class name then
//   //   //select the target element
//   //   const link = e.target; //finding out the link that is clicked
//   //   //select the siblings - go to closest .nav and then select all nav__link
//   //   const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //finding the closest element with .nav class
//   //   //select the logo
//   //   const logo = link.closest('.nav').querySelector('img');
//   //   // for each sibling if it is not selected or not the target then opacity 0.5
//   //   siblings.forEach((s) => {
//   //     if (s != link) {
//   //       s.style.opacity = 1;
//   //     }
//   //   });
//   //   logo.style.opacity = 1;
//   // }
// });

// STICKY NAVIGATION
// using scroll event -NOT BEST PERFORMANCE AS THE SCROLL EVENT IS CONSTANTLY FIRING OFF EVENTS - NOT GOOD FOR PERFORMANCE
// need to calc position dynamically
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', () => {
  // define when the navigation should become sticky
  // when we scroll enough to reach the first section

  // if the distance we reach in scrolling the page is greater than the starting distance from top of page to bottom then
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// INTERSECTION OF SERVER API and implementing sticky navigation
// - allows us to observe changes in how a target element interacts with another element or the viewport

// HOW DOES IT WORK?

// observer callback
//TAKES 2 ARGUMENTS, entries and observer. entries is actually an array of the threshold entries.
//as we can have an array of thresholds to observe

const obsCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry);
  });
};

// what to observe. These are the observe object of options
const obsOptions = {
  // FIRST DEFINE THE ROOT PROPERTY
  //this will be the element that the target is intersecting.
  root: null, //null means we will see the target element interesecting with the viewport
  // DEFINE THE THRESHOLD
  // the percentage at wich there is intersection of the target elemtn with the viewport,
  //and thus when the callback will be called
  //threshold: 0.1, //think of this as the threshhold we want to have visible in our root (in this case the viewport)
  threshold: [0, 0.2], //try with an array now. With 0 means callback triggered as soon as moves out of view of viewport and as soon as enters
};

//create new one , takes callback function and the object of options
const observer = new IntersectionObserver(obsCallback, obsOptions);
// use this observer to observe a certain target -
observer.observe(section1); //this is the first section we want to observe

// BANKIST APPLICATION- we want to trigger callback when header section is no longer in the viewport

// create callback fucntion
const observerCallback = (entries, observer1) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

// reading the height from the rectangle better for resposivness
const navHeight = nav.getBoundingClientRect().height;

//create options
const observerOptions = {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
};

// create observer
const observer1 = new IntersectionObserver(observerCallback, observerOptions);
observer1.observe(HEADER);

// REVEAL ELEMENTS ON SCROLLING
// comes from adding a css class as you reah them
// use the intersection observer API to remove the hidden class as you approach each section
// need to observe all 4 sections in this case - dynamically using the same observer not 1 for each
const allSections = document.querySelectorAll('.section'); //select all the elements with section class. Creatign a node list

const sectionObsCallback = (entries, sectionObserver) => {
  const [entry] = entries; //get entries by destructuring
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //unobserve sections once observed. Rmoves unessesary observations and helps with performance
};

const sectionObsOption = {
  root: null,
  threshold: 0.25,
};

const sectionObserver = new IntersectionObserver(
  sectionObsCallback,
  sectionObsOption
);

// loop over the selection of .section class elements
// using forEach to loop over somethignt that does nto involve creating a new array
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES - great for performance
// Have two sets of each image - one a low res copy, one a high res copy
// add a html attribute data-src for the image
// when you scroll to the image - the data-src value will change from the low res image to the high res one
// remove the class name that causes blurry styling to the image

const imgTargets = document.querySelectorAll('img[data-src]');

const imgObserverCallback = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target); //unobserve sections once observed. Rmoves unessesary observations and helps with performance
};

const imgObserverOptions = {
  root: null,
  threshhold: 0,
  rootMargin: '200px',
};

const imgObserver = new IntersectionObserver(
  imgObserverCallback,
  imgObserverOptions
);

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

// BUILDING THE SLIDER - Testimonils/products
// SELECTING ELEMENTS
const slides = document.querySelectorAll('.slide');
const maxSlides = slides.length;
const minSlides = slides[0];
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

// // this puts the slides next to each other
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`;
//   // 0, 100, 200, 300
// });

// FUNCTIONS

const slider = () => {
  const goToSlide = (slide) => {
    // this puts the slides next to each other
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      // 0, 100, 200, 300
    });
  };
  const nextSlide = () => {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const previousSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlides - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const createDots = () => {
    slides.forEach((s, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document.querySelectorAll('.dots__dot').forEach((d) => {
      d.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // EVENT HANDLERS
  // ADD KEYBOARD EVENTS
  // we handle keyboard events at the document
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', (e) => {
    console.log(e);
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else {
      previousSlide();
    }
  });
  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      const [slide] = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
