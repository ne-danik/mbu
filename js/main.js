
let url = 'js/tours.json';
let toursList = [];
fetch(url).then(function (response) {
  return response.json()
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
}

//Hide overlay
const hideOverlay = () => {
  overlay.style.opacity = '0';
  overlay.style.height = '0';
}


document.addEventListener('click', event => {
  event.preventDefault();

  const currentTarget = event.target;
  const btn = currentTarget.dataset.btn;

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
      const items = currentTarget.nextElementSibling;
      currentTarget.classList.toggle("active");
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
})


createTours = (data) => {
  const tour = document.querySelector("#tours");
  let index = 0;
  const addMore = document.querySelector('#addMore');
  let currentIndex = 0;
  for (; index < (index + (6 - currentIndex));) {
    if (index < data.length) {
      tour.innerHTML += `
        <a class="teams__item ${data[index].tag} show" id="${data[index].id}" href="#">
          <span class="teams__item-days">${data[index].days} дней</span>
          <span class="teams__item-camp teams__item-camp--${data[index].tag}">${data[index].name}</span>
          <span class="teams__item-team">${data[index].tour} ${data[index].season}</span>
         <span class="teams__item-date">${data[index].startTour} - ${data[index].endTour}</span>
        </a>`;
      currentIndex++;
      index += 1;
    } else if (data.length == 0) {
      document.querySelector('.teams__not-found').style.display = 'block';
      addMore.style.display = 'none';
      return
    } else if (index == data.length) {
      addMore.style.display = 'none';
      return
    } else {
      return
    }
  }
}


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
}


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
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


filterSelection("all");
function filterSelection(c) {
  let teamsItem;
  teamsItem = document.getElementsByClassName("teams__item");
  if (c == "all") c = "";
  for (let i = 0; i < teamsItem.length; i++) {
    hideFiltered(teamsItem[i], "show");
    if (teamsItem[i].className.indexOf(c) > -1) showFiltered(teamsItem[i], "show");
  }
}

// Show filtered elements
function showFiltered(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function hideFiltered(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button
let btnContainer = document.getElementById("teams__filter");
let btns = btnContainer.getElementsByClassName("teams__filter-btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("mousedown", function () {
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
  btns[i].addEventListener("mouseup", function () {
    let prevMousedown = document.getElementsByClassName("teams__filter-btn--focus");
    if (this.className.includes("teams__filter-btn--focus" || prevMousedown[0] != "undefined")) {
      prevMousedown[0].className = prevMousedown[0].className.replace(" teams__filter-btn--focus", "");
    }
    let current = document.getElementsByClassName("teams__filter-btn--active");
    current[0].className = current[0].className.replace(" teams__filter-btn--active", "");
    this.className += " teams__filter-btn--active";
  });
}


new Splide('.review', {
  type: 'loop',
  perPage: 1,
  perMove: 1,
  width: '620px',
  height: '130px',
  breakpoints: {
    767: {
      width: '345px',
      height: 'auto',
    },
  }
}).mount();