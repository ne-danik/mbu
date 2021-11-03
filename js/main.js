let url = 'js/tours.json';
let toursList = [];
fetch(url).then(function (response) {
  return response.json();
}).then(function (data) {
  createTours(data);
  toursList = data;
});

/* createTour = (data) => {
  const tour = document.querySelector("#tours");
  for (let i = 0; i < data.length; i++) {
    tour.innerHTML += `
    <a class="teams__item ${data[i].tag} show" id="${data[i].id}" href="#">
      <span class="teams__item-days">${data[i].days} дней</span>
      <span class="teams__item-camp teams__item-camp--${data[i].tag}">${data[i].name}</span>
      <span class="teams__item-team">${data[i].tour} ${data[i].season}</span>
      <span class="teams__item-date">${data[i].startTour} - ${data[i].endTour}</span>
    </a>`;
  }
} */

const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const searchForm = document.querySelector('.header__nav-search');


//Show orevlay
const showOverlay = () => {
  overlay.style.opacity = '1';
  overlay.style.height = '100%';
};

//Hide overlay
const hideOverlay = () => {
  overlay.style.opacity = '0';
  overlay.style.height = '0';
};


document.addEventListener('click', event => {
  event.preventDefault();

  const target = event.target;
  const btn = target.dataset.btn;

  switch (btn) {
    case 'showMore': // Show more tours
      createTours(toursList);
      break;

    case 'searchFormBtn': // Open search form
      showOverlay();
      body.style.overflow = 'hidden';
      searchForm.style.display = 'block';
      break;

    case 'subMenuItem': // Hide|Show submenu links in mobile menu
      const items = target.nextElementSibling;
      target.classList.toggle("active");
      if (items.style.maxHeight) {
        items.style.maxHeight = null;
      } else {
        items.style.maxHeight = items.scrollHeight + "px";
      }
      break;
  }

  // Close search form
  if (event.target === overlay) {
    searchForm.style.display = 'none';
    body.style.overflow = '';
    hideOverlay();
  }
});

let tour = document.querySelector("#tours");
const notFound = document.querySelector('.teams__not-found');
const addMore = document.querySelector('#addMore');

let createTours = (data) => {
  let idx = 0;
  let currentIndex = 0;

  for (; idx < (idx + (6 - currentIndex));) {
    if (idx < data.length) {
      notFound.style.display = 'none';
      addMore.style.display = 'flex';

      tour.innerHTML += `
        <a class="teams__item ${data[idx].tag} show" id="${data[idx].id}" href="#">
          <span class="teams__item-days">${data[idx].days} дней</span>
          <span class="teams__item-camp teams__item-camp--${data[idx].tag}">${data[idx].name}</span>
          <span class="teams__item-team">${data[idx].tour} ${data[idx].season}</span>
         <span class="teams__item-date">${data[idx].startTour} - ${data[idx].endTour}</span>
        </a>`;
      currentIndex++;
      idx += 1;

    } else if (data.length == 0) {
      notFound.style.display = 'block';
      addMore.style.display = 'none';
      return;

    } else if (idx == data.length) {
      notFound.style.display = 'none';
      addMore.style.display = 'none';
      return;

    } else {
      return;
    }
  }
};


const openBurgerMenu = (elem) => {
  const burgerMenu = document.querySelector('.header__burger-menu');
  if (burgerMenu.style.display === "flex") {
    burgerMenu.style.display = "none";
    if (window.matchMedia("(max-width: 767px)").matches) {
      body.style.overflow = '';
      searchForm.parentNode.style.position = 'static';
    }
  } else {
    burgerMenu.style.display = "flex";
    if (window.matchMedia("(max-width: 767px)").matches) {
      body.style.overflow = 'hidden';
      searchForm.parentNode.style.position = 'fixed';
    }
  }
  elem.childNodes[1].classList.toggle("change");
};


const openCamp = (evt, campName) => {
  let i, tabsection, tablinks;
  tabsection = document.getElementsByClassName("tab__section");
  for (i = 0; i < tabsection.length; i++) {
    tabsection[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab__link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(campName).style.display = "flex";
  evt.currentTarget.className += " active";
};


// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


// Add active class to the current control button

const tabsBtnContainer = document.querySelector("#teams__filter");
const tabsBtn = tabsBtnContainer.querySelectorAll(".teams__filter-btn");

for (let i = 0; i < tabsBtn.length; i++) {
  tabsBtn[i].addEventListener("mousedown", function () {
    if (!this.className.includes("teams__filter-btn--active")) {
      this.className += " teams__filter-btn--focus";
    }
    this.addEventListener("mouseout", function () {
      let prevMousedown = document.getElementsByClassName("teams__filter-btn--focus");
      if (this.className.includes("teams__filter-btn--focus")) {
        prevMousedown[0].className = prevMousedown[0].className.replace(" teams__filter-btn--focus", "");
      }
    });
  });
  tabsBtn[i].addEventListener("mouseup", function () {
    let prevMousedown = document.getElementsByClassName("teams__filter-btn--focus");
    if (this.className.includes("teams__filter-btn--focus" || prevMousedown[0] != "undefined")) {
      prevMousedown[0].className = prevMousedown[0].className.replace(" teams__filter-btn--focus", "");
    }
    let current = document.getElementsByClassName("teams__filter-btn--active");
    current[0].className = current[0].className.replace(" teams__filter-btn--active", "");
    this.className += " teams__filter-btn--active";
  });
}

tabsBtnContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (target && target.classList.contains('teams__filter-btn')) {
    tour.innerHTML = "";

    if (target.textContent != "Все") {
      let results = [];

      for (let i = 0; i < toursList.length; i++) {
        for (let key in toursList[i]) {
          if (toursList[i][key].indexOf(target.textContent) != -1) {
            results.push(toursList[i]);
          }
        }
      }
      createTours(results);
    } else {
      createTours(toursList);
    }
  }
});





new Splide('.review', {
  type: 'loop',
  perPage: 1,
  perMove: 1,
  width: '620px',
  height: 'auto',
  breakpoints: {
    1023: {
      width: '100%',
    },
  }
}).mount();