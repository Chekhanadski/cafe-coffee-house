let carouselIndex = 0;
const carouselContents = document.querySelector(".carousel-inner");
const carouselContent = document.querySelectorAll(".carousel-content");
const carouselContentElem = document.querySelector(".carousel-contents");
const leftButton = document.querySelector(".arrow-left-block");
const rightButton = document.querySelector(".arrow-right-block");
const progressBars = document.querySelectorAll(".carousel-control-current");
let sizeOffset = document.querySelector(".favorite-coffee-img").width;
let windowWidth = `${carouselContents.offsetWidth}`;

let width = 0;
let autoSlide;
let autoProgressBar;
let fillBar = 0;

document.getElementById("noContextMenu").oncontextmenu = function() {
  return false;
}

if (windowWidth < 480) {
  sizeOffset = windowWidth;
}

const left = () => {
  width = 0;
  progressBars[carouselIndex].style.width = width + "%";
  carouselIndex--;
  if (carouselIndex < 0) {
    carouselIndex = carouselContent.length - 1;
  }
  carouselContentElem.style.transition = "transform 0.5s ease-in-out";
  carouselContentElem.style.transform = `translateX(${
    -carouselIndex * sizeOffset
  }px)`;
};

const right = () => {
  width = 0;
  progressBars[carouselIndex].style.width = width + "%";
  carouselIndex++;
  if (carouselIndex > carouselContent.length - 1) {
    carouselIndex = 0;
  }
  carouselContentElem.style.transition = "transform 0.5s ease-in-out";
  carouselContentElem.style.transform = `translateX(${
    -carouselIndex * sizeOffset
  }px)`;
};

const frame = () => {
  if (width >= 100) {
    width = 0;
    progressBars[carouselIndex].style.width = width + "%";
    right();
    startCarousel();
  } else {
    width += 1;
    progressBars[carouselIndex].style.width = width + "%";
  }
};

const startCarousel = () => {
  stopCarousel();
  autoSlide = setInterval(right, 6000);
  autoProgressBar = setInterval(frame, 60);
};

const stopCarousel = () => {
  clearInterval(autoSlide);
  clearInterval(autoProgressBar);
};

leftButton.addEventListener("click", () => {
  startCarousel();
  left();
});

rightButton.addEventListener("click", () => {
  startCarousel();
  right();
});

let touchStartX = 0;
let touchEndX = 0;

carouselContentElem.addEventListener("touchstart", (event) => {
  stopCarousel();
  touchStartX = event.changedTouches[0].screenX;
});

carouselContentElem.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  stopCarousel();
  if (Math.abs(touchEndX - touchStartX) > 50) {
    if (touchEndX < touchStartX) {      
      right();      
    }

    if (touchEndX > touchStartX) {     
      left();     
    }
  }
  startCarousel();
}
carouselContentElem.addEventListener("mouseover", () => stopCarousel());

carouselContentElem.addEventListener("mouseout", () => startCarousel());

window.addEventListener("resize", () => {
  windowWidth = `${carouselContents.offsetWidth}`;
  if (windowWidth < 480) {
    sizeOffset = windowWidth;
  } else {
    sizeOffset = document.querySelector(".favorite-coffee-img").width;
  }
});

startCarousel();
