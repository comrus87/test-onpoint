'use strict';

document.addEventListener('DOMContentLoaded', function () {
  let slide1 = document.querySelector('.slider__vertical-item1');
  let slide2 = document.querySelector('.slider__vertical-item2');
  let slide3 = document.querySelector('.slider__vertical-item3');
  let slider = document.querySelector('.slider__vertical-list');

  let touchstartY = 0;
  let touchendY = 0;

  slide1.addEventListener('touchstart', function(evt) {
    touchstartY = evt.changedTouches[0].screenY;
  });

  slide1.addEventListener('touchend', function(evt) {
    touchendY = evt.changedTouches[0].screenY;
    if (touchendY < touchstartY) {
      slide2.scrollIntoView({behavior: 'smooth'});
    }
  });


  slide2.addEventListener('touchstart', function(evt) {
    touchstartY = evt.changedTouches[0].screenY;
  });

  slide2.addEventListener('touchend', function(evt) {
    touchendY = evt.changedTouches[0].screenY;
    if (touchendY < touchstartY) {
      slide3.scrollIntoView({behavior: 'smooth'});
    } else if (touchendY > touchstartY) {
      slide1.scrollIntoView({behavior: 'smooth'});
    }
  });

  slide3.addEventListener('touchstart', function(evt) {
    touchstartY = evt.changedTouches[0].screenY;
  });

  slide3.addEventListener('touchend', function(evt) {
    touchendY = evt.changedTouches[0].screenY;
    if (touchendY > touchstartY) {
      slide2.scrollIntoView({behavior: 'smooth'});
    }
  });



});


