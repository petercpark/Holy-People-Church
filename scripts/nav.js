const navAppear = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".navlinks");
  const navLinks = document.querySelectorAll(".navlinks li");

  burger.addEventListener("click", () => {
    //TOGGLE NAV
    nav.classList.toggle("nav-active");

    //toggle burger x
    burger.classList.toggle("toggle");
  });
};

navAppear();
