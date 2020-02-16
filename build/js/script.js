'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var STEP_HEIGHT = 768;
  var FIRST_POINT = 30;
  var SECOND_POINT = 70;
  var THIRD_POINT = 100;
  var slides = document.querySelectorAll('.slider__vertical-item');
  var bottomLink = document.querySelector('.slider__item-1-link');
  var range = document.querySelector('.slider__range');
  var horizontalList = document.querySelector('.slider__horizontal-list');
  var dethRange = document.querySelector('.slider__range-deth');
  var dots = document.querySelectorAll('.slider__dot');
  var verticalList = document.querySelector('.slider__vertical-list');
  var touchstartY = 0;
  var touchendY = 0;
  var indexSlide = 0;
  var currentHeight = 0;
  slides.forEach(function (slide, i) {
    slide.addEventListener('touchstart', function (evt) {
      touchstartY = evt.target !== range ? evt.changedTouches[0].screenY : undefined;
    });
    slide.addEventListener('touchend', function (evt) {
      touchendY = evt.changedTouches[0].screenY;

      if (i === 0) {
        if (touchendY < touchstartY) {
          currentHeight += -STEP_HEIGHT;
          indexSlide = 1;
        }
      } else if (i === slides.length - 1) {
        if (touchendY > touchstartY) {
          currentHeight += STEP_HEIGHT;
          indexSlide = slides.length - 2;
        }
      } else {
        if (touchendY < touchstartY) {
          currentHeight += -STEP_HEIGHT;
          indexSlide = i + 1;
        } else if (touchendY > touchstartY) {
          currentHeight += STEP_HEIGHT;
          indexSlide = i - 1;
        }
      }

      verticalList.style.transform = "translateY(".concat(currentHeight, "px)");
      changeDot(indexSlide);
    });
  });

  function onBottomLinkClick(evt) {
    evt.preventDefault();
    currentHeight += -STEP_HEIGHT * (slides.length - 1);
    verticalList.style.transform = "translateY(".concat(currentHeight, "px)");
    changeDot(2);
  }

  if (bottomLink) {
    bottomLink.addEventListener('click', onBottomLinkClick);
  }

  function changeDot(currentIndex) {
    dots.forEach(function (d) {
      d.classList.remove('slider__dot--active');
    });
    dots[currentIndex].classList.add('slider__dot--active');
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      currentHeight = -STEP_HEIGHT * i;
      verticalList.style.transform = "translateY(".concat(currentHeight, "px)");
      changeDot(i);
    });
  });
  range.addEventListener('input', function () {
    if (range.value > SECOND_POINT && range.value <= THIRD_POINT) {
      horizontalList.style.transform = 'translateX(-2048px)';
    } else if (range.value <= SECOND_POINT && range.value > FIRST_POINT) {
      horizontalList.style.transform = 'translateX(-1024px)';
    } else if (range.value >= 0 && range.value <= FIRST_POINT) {
      horizontalList.style.transform = 'translateX(0)';
    }

    dethRange.style.width = range.value + '%';
  });
});