var navMain = document.querySelectorAll('.main-nav');
var pageHeaderToggle = document.querySelector('.page-header__toggle');
var toggleOpen = document.querySelector('.page-header__icon-menu-open');
var toggleClose = document.querySelector('.page-header__icon-menu-close');

for (var i = 0; i < navMain.length; i++) {
  // navMain[i].classList.remove('main-nav--nojs');
  // pageHeaderToggle.classList.add('page-header__toggle--closed');
  toggleOpen.classList.remove('page-header__icon-menu-open--disabled');
  toggleClose.classList.add('page-header__icon-menu-close--disabled');
  navMain[i].classList.add('main-nav--closed');
}

pageHeaderToggle.addEventListener('click', function() {
  for (var j = 0; j < navMain.length; j++) {
    if (navMain[j].classList.contains('main-nav--closed')) {
      // pageHeaderToggle.classList.remove('page-header__toggle--closed');
      toggleOpen.classList.add('page-header__icon-menu-open--disabled');
      toggleClose.classList.remove('page-header__icon-menu-close--disabled');
      navMain[j].classList.remove('main-nav--closed');
      navMain[j].classList.add('main-nav--opened');
    }
    else {
      // pageHeaderToggle.classList.add('page-header__toggle--closed');
      toggleOpen.classList.remove('page-header__icon-menu-open--disabled');
      toggleClose.classList.add('page-header__icon-menu-close--disabled');
      navMain[j].classList.add('main-nav--closed');
      navMain[j].classList.remove('main-nav--opened');
    }
  }
})
