const playCurrent = () => {
  const button = document.querySelector(".play-button");
  let sermon = "/sermons/2020_08_09.mp3";
  let clicked = false;
  let sound = new Audio(sermon);
  button.addEventListener("click", () => {
    clicked = !clicked;
    if (clicked) {
      sound.play();
      button.src = "/images/pausebutton.svg";
    } else {
      sound.pause();
      button.src = "/images/playbutton.svg";
    }
    console.log("clicked = " + clicked);
  });
};

playCurrent();
