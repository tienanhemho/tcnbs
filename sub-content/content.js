// declare valuables
const slides = document.getElementsByClassName("slides");
const searchValue = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const navbar = document.getElementById("nav-content-collasp");
const up = document.getElementsByClassName('up')[0];
const down = document.getElementsByClassName('down')[0];
const collaspBtn = document.getElementById('collaspe-btn');
const dropdownList = document.querySelectorAll('#ver-nav .dropdown-menu');
const dropdownBtn = document.querySelectorAll('#ver-nav .dropdown');
const navbarFull = document.getElementById('nav-full');
const verNav = document.querySelector('#ver-nav>.header-nav-list');
const navElem = document.querySelectorAll('#ver-nav .nav-content');
const bannerImg = document.getElementById('banner-img');
const logo = document.querySelector('#nav-content-collasp .logo');
const listStatus = {}; // sub dropdown menu
const bannerImgNum = 3;
let bannerindex = 1;
let breakpoint = navbar.offsetTop;
let breakpointFull = navbarFull.offsetTop;
//Dynamic banner


setInterval(() => {
  changeBanner();
}, 3000);

function changeBanner() {
  bannerImg.setAttribute('src', `../Image/banner${bannerindex}.jpg`);
  bannerindex++;
  if(bannerindex > bannerImgNum) bannerindex = 1;
}

// search box
searchBtn.addEventListener('click', () => {
  searchBtn.setAttribute('href', `https://www.google.nl/search?q=${searchValue.value}+huc.edu.vn`);
});

// vertical nav dropdown
$('.sub-menu').hide();
$('.menu-item a').click(function () {
  $(this).parent('.menu-item').children('ul').slideToggle('100');
  $(this).find('.right').toggleClass('fa-caret-up fa-caret-down');
});

//responsive up down button
window.addEventListener("scroll", () => {
  let dheight = $(document).height();
  window.pageYOffset < 200 ? up.style.display = "none" : up.style.display = "";
  (dheight - window.pageYOffset) < 800 ? down.style.display = "none": down.style.display = "";

  // sticky nav
  sticky(navbar, breakpoint);
  sticky(navbarFull, breakpointFull);
  hideLogo(breakpoint);
});

function sticky(element, breakpoint) {
  if (window.pageYOffset >= breakpoint) {
    element.classList.add("sticky")
  } else {
    element.classList.remove("sticky");
  }
}

function hideLogo(breakpoint) {
  if (window.pageYOffset >= breakpoint) {
    logo.classList.remove("hide");
  } else {
    logo.classList.add("hide");
  }
}

// get time 
document.getElementById('time').innerText = getTime();
function getTime() {
  let date = new Date();
  return "Ngày: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

// responsive ver-nav 
collaspBtn.addEventListener('click', () => {
  if (verNav.style.width == '250px') {
    verNav.style.width = '0px';
    for (let i = 0; i < navElem.length; i++) {
      navElem[i].classList.remove('appear');
    }
  }
  else {
    verNav.style.width = '250px';
    for (let i = 0; i < navElem.length; i++) {
      navElem[i].classList.add('appear');
    }
  }
});

// hide 
let dWidth;
window.addEventListener('resize', () => {
  dWidth = window.innerWidth;
  if (dWidth > 1024) {
    verNav.style.width = '0px';
  }
});

// drop down ver-nav
function hideSubItem (element, bool) {
	if(bool) element.style.display = 'none';
	else element.style.removeProperty('display');
}

for (let i = 0; i < dropdownList.length; i++) {
	listStatus[i] = true;
	hideSubItem(dropdownList[i], listStatus[i]);
}

for (let i = 0; i < dropdownBtn.length; i++) {
  dropdownBtn[i].addEventListener('click', (e) => {
    e.preventDefault(); 
    listStatus[i] = !listStatus[i];
    hideSubItem(dropdownList[i], listStatus[i]);
  });
}