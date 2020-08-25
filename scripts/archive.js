const makeArchive = () => {
  const sermonList = document.querySelector(".sermon-list");
  const sermon = "/sermons/2020_08_09.mp3";

  for (let i = 0; i < 10; i++) {
    const sermonAudio = document.createElement("div");
    sermonAudio.classList.add("sermon-audio");

    //play button img
    const play = document.createElement("img");
    play.setAttribute("src", "/images/playbutton.svg");
    play.classList.add("play-button");

    //bible verse
    const verse = document.createElement("h1");
    verse.classList.add("sermon-verse");
    verse.innerHTML = "빌립보서 3:17-21";

    //the date
    const date = document.createElement("h1");
    date.innerHTML = "8/9/20";

    //download button actually downloads sermon
    const playLink = document.createElement("a");
    playLink.setAttribute("href", sermon);
    playLink.setAttribute("download", "");
    playLink.classList.add("play-button");

    //download button img
    const download = document.createElement("img");
    playLink.append(download);
    download.setAttribute("src", "/images/downloadbutton.svg");
    download.setAttribute("alt", "Download");

    sermonAudio.append(play, verse, date, playLink);
    sermonList.append(sermonAudio);
  }
};

makeArchive();
