//find the current week's sunday's date.
var rawDate = new Date();
var thisSundayRaw = rawDate;

//get current day of week as number from 0 to 6. 0 being sunday
var currentDayOfWeek = rawDate.getDay();

thisSundayRaw.setDate(thisSundayRaw.getDate() - currentDayOfWeek);

var month = thisSundayRaw.getMonth() + 1; //months from 1-12
var day = thisSundayRaw.getDate();
var year = thisSundayRaw.getFullYear();

var thisSunday = month + "/" + day + "/" + year;

//insert the thisSunday date into the html
var sermonDate = document.querySelector(".date");
sermonDate.innerHTML = thisSunday;

//current sermon link
var sermon =
  "/sermons/" +
  year +
  "_" +
  ("0" + month).slice(-2) +
  "_" +
  ("0" + day).slice(-2) +
  ".mp3";

//parse csv file with all the bible verses
var bibleVerse = [];
var verseDate = [];
//asyncronous function to get csv file with bible verses.
async function getVerses() {
  const response = await fetch("/sermons/bibleverses.csv");
  const data = await response.text();

  const table = data.split("\n");

  table.forEach((row) => {
    const column = row.split(",");
    bibleVerse.push(column[0]);
    verseDate.push(column[1]);
  });
}
console.log(bibleVerse);

// make big download button work
var sermonDownload = document.querySelector(".download-this-week");
sermonDownload.setAttribute("href", sermon);

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

playCurrent();

//make the archive
const makeArchive = async () => {
  const sermonList = document.querySelector(".sermon-list");
  const currentSermonVerse = document.querySelector(".current-verse");
  let pastSermonsRaw = thisSundayRaw;
  await getVerses();

  currentSermonVerse.innerHTML = bibleVerse[0];

  if (sermonList) {
    for (let i = 0; i > -1; i++) {
      pastSermonsRaw.setDate(pastSermonsRaw.getDate() - 7);

      const pastMonth = pastSermonsRaw.getMonth() + 1; //months from 1-12
      const pastDay = pastSermonsRaw.getDate();
      const pastYear = pastSermonsRaw.getFullYear();
      const pastDates = pastMonth + "/" + pastDay + "/" + pastYear;
      if (pastDates == "3/29/2020") {
        continue;
      }
      let pastSermonsPath =
        "/sermons/" +
        pastYear +
        "_" +
        ("0" + pastMonth).slice(-2) +
        "_" +
        ("0" + pastDay).slice(-2) +
        ".mp3";

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
      verse.innerHTML = bibleVerse[i + 1];

      //the date
      const date = document.createElement("h1");
      date.innerHTML = pastDates;

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

      sermonAudio.append(play, verse, date, playLink);
      sermonList.append(sermonAudio);

      if (pastDates == "1/5/2020") {
        break;
      }
    }
  }
};

makeArchive();
