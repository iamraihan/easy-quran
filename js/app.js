function getQuran(){
    fetch('https://api.quran.sutanlab.id/surah?fbclid=IwAR3uac_KoYbCk_AJSxQeUK0R1sMm2ei2hwUXh1dLjJpU-P1L8V1tjjZV7aI')
    .then(res => res.json())
    .then(data=> console.log(data))
}
getQuran()