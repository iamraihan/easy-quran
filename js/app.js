let surahContainer = document.querySelector(".surahs");
let ayah = document.querySelector(".ayah");
let audio = document.querySelector(".audio");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
getSura();

function getSura() {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.data);
      for (let surah in data.data) {
        // console.log(surah);

        surahContainer.innerHTML += `
  <div>
    <p>${data.data[surah].name.long}</p>
     <p>${data.data[surah].name.transliteration.en}</p>
      <p>verses: ${data.data[surah].numberOfVerses}</p>
    
  </div>
  `;
      }

      let allSura = document.querySelectorAll(".surahs div"),
        AyahsAudio,
        AyahText;

      allSura.forEach((sur, index) => {
        sur.addEventListener("click", () => {
          fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              let verses = data.data.verses;
              AyahsAudio = [];
              AyahText = [];
              console.log(verses);
              verses.forEach((verse) => {
                AyahsAudio.push(verse.audio.primary);
                AyahText.push(verse.text.arab);
              });

              let AyahIndex = 0;
              changeAyah(AyahIndex);
              audio.addEventListener("ended", () => {
                AyahIndex++;

                if (AyahIndex < AyahsAudio.length) {
                  changeAyah(AyahIndex);
                } else {
                  AyahIndex = 0;
                  changeAyah(AyahIndex);
                  audio.pause();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sura has been ended",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });

              //  next and prev
              next.addEventListener("click", function () {
                AyahIndex++;

                if (AyahIndex < AyahsAudio.length) {
                  changeAyah(AyahIndex);
                } else {
                  console.log("ses");
                }

                // AyahIndex < AyahsAudio.length  ? AyahIndex++ : AyahIndex=0;
                //  changeAyah(AyahIndex)
              });
              prev.addEventListener("click", function () {
                AyahIndex--;
                changeAyah(AyahIndex);
              });
              // audio.play()
              function changeAyah(index) {
                audio.src = AyahsAudio[index];
                ayah.innerHTML = AyahText[index];
                audio.play();
              }
            });
        });
      });
    });
}
