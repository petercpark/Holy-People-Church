let sermon;
let bibleVerse = [];
let verseDate = [];

//asyncronous function to get csv file with bible verses.
async function getVerses() {
  const response = await fetch("/bibleverses.csv");
  const data = await response.text();

  const table = data.split("\n");

  table.forEach((row) => {
    const column = row.split(",");
    bibleVerse.push(column[0]);
    verseDate.push(column[1]);
  });
}
console.log(bibleVerse, verseDate);

// big play button actually make it play.
const playCurrent = () => {
  const button = document.querySelector(".play-button");
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
  });
};

//make the archive
const makeArchive = async () => {
  const sermonList = document.querySelector(".sermon-list");
  const currentSermonVerse = document.querySelector(".current-verse");

  await getVerses();
  sermon = "./sermons/" + verseDate[0] + ".mp3";

  //insert the thisSunday date into the html
  var sermonDate = document.querySelector(".date");
  sermonDate.innerHTML = verseDate[0];
  // make big download button work
  var sermonDownload = document.querySelector(".download-this-week");
  sermonDownload.setAttribute("href", sermon);
  playCurrent(); // function from above plays the audio for this week.
  currentSermonVerse.innerHTML = bibleVerse[0]; // set the verse of this week's verse to the first in the list

  // create the list of past sermons
  if (sermonList) {
    verseDate.forEach((date, i) => {
      // pastSermonsRaw.setDate(pastSermonsRaw.getDate() - 7);

      // const pastMonth = pastSermonsRaw.getMonth() + 1; //months from 1-12
      // const pastDay = pastSermonsRaw.getDate();
      // const pastYear = pastSermonsRaw.getFullYear();
      // const pastDates = pastMonth + "/" + pastDay + "/" + pastYear;

      let pastSermonsPath =
        "/sermons/" + date + ".mp3";

      const sermonAudio = document.createElement("div");
      sermonAudio.classList.add("sermon-audio");

      //play button img
      const play = document.createElement("img");
      play.setAttribute("src", "/images/playbutton.svg");
      play.classList.add("play-button");

      //play button clicked then:
      let sound = new Audio(pastSermonsPath);

      let clicked = false;
      play.addEventListener("click", () => {
        clicked = !clicked;
        if (clicked) {
          sound.play();
          play.src = "/images/pausebutton.svg";
        } else {
          sound.pause();
          play.src = "/images/playbutton.svg";
        }
      });

      //bible verse
      const verse = document.createElement("h1");
      verse.classList.add("sermon-verse");
      verse.innerHTML = bibleVerse[i];

      //the date
      const dateElement = document.createElement("h1");
      dateElement.innerHTML = date;

      //download button actually downloads sermon
      const playLink = document.createElement("a");
      playLink.setAttribute("href", pastSermonsPath);
      playLink.setAttribute("download", "");
      playLink.classList.add("play-button");

      //download button img
      const download = document.createElement("img");
      playLink.append(download);
      download.setAttribute("src", "/images/downloadbutton.svg");
      download.setAttribute("alt", "Download");

      sermonAudio.append(play, verse, dateElement, playLink); //finally appends all of the nodes created above to make one of the rows of the archive table
      sermonList.append(sermonAudio);

    });
  }
}

makeArchive();
