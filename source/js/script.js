'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const STEP_HEIGHT = 768;
  const FIRST_POINT = 30;
  const SECOND_POINT = 70;
  const THIRD_POINT = 100;
  const slides = document.querySelectorAll('.slider__vertical-item');
  const bottomLink = document.querySelector('.slider__item-1-link');
  const range = document.querySelector('.slider__range');
  const horizontalList = document.querySelector('.slider__horizontal-list');
  const dethRange = document.querySelector('.slider__range-deth');
  const dots = document.querySelectorAll('.slider__dot');
  const verticalList = document.querySelector('.slider__vertical-list');

  let touchstartY = 0;
  let touchendY = 0;
  let indexSlide = 0;
  let currentHeight = 0;

  slides.forEach((slide, i) => {
    slide.addEventListener('touchstart', function (evt) {
      touchstartY = (evt.target !== range) ? evt.changedTouches[0].screenY : undefined;
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
      verticalList.style.transform = `translateY(${currentHeight}px)`;
      changeDot(indexSlide);
    });
  });

  function onBottomLinkClick(evt) {
    evt.preventDefault();
    currentHeight += -STEP_HEIGHT * (slides.length - 1);
    verticalList.style.transform = `translateY(${currentHeight}px)`;
    changeDot(2);
  }

  if (bottomLink) {
    bottomLink.addEventListener('click', onBottomLinkClick);
  }

  function changeDot(currentIndex) {
    dots.forEach(d => {
      d.classList.remove('slider__dot--active');
    });
    dots[currentIndex].classList.add('slider__dot--active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      currentHeight = -STEP_HEIGHT * i;
      verticalList.style.transform = `translateY(${currentHeight}px)`;
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
