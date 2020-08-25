const introCarousel = () => {
  const introText = document.querySelectorAll(".intro-text");
  const btnBack = document.querySelector(".button-back");
  const btnForwards = document.querySelector(".button-forward");
  let indicatorDot = document.querySelectorAll(".indicator-dot");
  let active = 0;
  let thisPosition = 0;

  let goTo = (position) => {
    //toggle the position
    introText[active].classList.remove("intro-text-active");
    introText[position].classList.toggle("intro-text-active");
    //toggle the indicator dot state
    indicatorDot[active].classList.remove("dot-active");
    indicatorDot[position].classList.toggle("dot-active");
    active = position;
  };

  //arrow buttons
  btnForwards.addEventListener("click", () => {
    if (thisPosition < 4) {
      thisPosition++;
    } else {
      thisPosition = 0;
    }
    goTo(thisPosition);
  });

  btnBack.addEventListener("click", () => {
    if (thisPosition > 0) {
      thisPosition--;
    } else {
      thisPosition = 4;
    }
    goTo(thisPosition);
  });

  //indicator buttons
  indicatorDot.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      thisPosition = i;
      goTo(i);
    });
  });
};

introCarousel();
