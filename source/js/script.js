'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slider__vertical-item');
  const slide3 = document.querySelector('.slider__vertical-item3');
  const bottomLink = document.querySelector('.slider__item1-link');
  const range = document.querySelector('.slider__range');
  const horizontalList = document.querySelector('.slider__horizontal-list');
  const dethRange = document.querySelector('.slider__range-deth');
  const dots = document.querySelectorAll('.slider__dot');

  // Логика ползунка
  range.addEventListener('input', function () {
    if (range.value > 70 && range.value <= 100) {
      horizontalList.style.transform = 'translateX(-2048px)';
    } else if (range.value <= 70 && range.value > 30) {
      horizontalList.style.transform = 'translateX(-1024px)';
    } else if (range.value >= 0 && range.value <= 30) {
      horizontalList.style.transform = 'translateX(0)';
    }
    dethRange.style.width = range.value + '%';
  });

  // Плавная прокрутка
  function onBottomLinkClick(evt) {
    evt.preventDefault();
    slide3.scrollIntoView({behavior: 'smooth'});
  }

  if (bottomLink) {
    bottomLink.addEventListener('click', onBottomLinkClick);
  }

  // Слайдер
  let touchstartY = 0;
  let touchendY = 0;
  let indexSlide = 0;

  function changeDot(currentIndex) {
    for (let j = 0; j < dots.length; j++) {
      dots[j].classList.remove('slider__dot--active');
    }
    dots[currentIndex].classList.add('slider__dot--active');
  }

  slides.forEach((slide, i) => {
    slide.addEventListener('touchstart', function (evt) {
      touchstartY = (evt.target !== range) ? evt.changedTouches[0].screenY : undefined;
    });

    slide.addEventListener('touchend', function (evt) {
      touchendY = evt.changedTouches[0].screenY;

      if (i === 0) {
        if (touchendY < touchstartY) {
          slides[1].scrollIntoView({behavior: 'smooth'});
          indexSlide = 1;
          changeDot(indexSlide);
        }
      } else if (i === slides.length - 1) {
        if (touchendY > touchstartY) {
          slides[slides.length - 2].scrollIntoView({behavior: 'smooth'});
          indexSlide = slides.length - 2;
          changeDot(indexSlide);
        }
      } else {
        if (touchendY < touchstartY) {
          slides[i + 1].scrollIntoView({behavior: 'smooth'});
          indexSlide = i + 1;
          changeDot(indexSlide);
        } else if (touchendY > touchstartY) {
          slides[i - 1].scrollIntoView({behavior: 'smooth'});
          indexSlide = i - 1;
          changeDot(indexSlide);
        }
      }
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      slides[i].scrollIntoView({behavior: 'smooth'});
      changeDot(i);
    });
  });
});

// let touchstartY = 0;
// let touchendY = 0;

// slide1.addEventListener('touchstart', function (evt) {
//   touchstartY = evt.changedTouches[0].screenY;
// });

// slide1.addEventListener('touchend', function (evt) {
//   touchendY = evt.changedTouches[0].screenY;
//   if (touchendY < touchstartY) {
//     slide2.scrollIntoView({behavior: 'smooth'});
//   }
// });


// slide2.addEventListener('touchstart', function (evt) {
//   touchstartY = evt.changedTouches[0].screenY;
// });

// slide2.addEventListener('touchend', function (evt) {
//   touchendY = evt.changedTouches[0].screenY;
//   if (touchendY < touchstartY) {
//     slide3.scrollIntoView({behavior: 'smooth'});
//   } else if (touchendY > touchstartY) {
//     slide1.scrollIntoView({behavior: 'smooth'});
//   }
// });

// slide3.addEventListener('touchstart', function (evt) {
//   touchstartY = (evt.target !== range) ? evt.changedTouches[0].screenY : undefined;
// });

// slide3.addEventListener('touchend', function (evt) {
//   touchendY = evt.changedTouches[0].screenY;
//   if (touchendY > touchstartY) {
//     slide2.scrollIntoView({behavior: 'smooth'});
//   }
// });
