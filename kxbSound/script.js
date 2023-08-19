document.addEventListener("DOMContentLoaded", function () {
  const kxbAudioPlayer = document.getElementById("kxbPlayer");
  const kxbAudioSource = document.querySelector("#kxbPlayer source");

  const taigiAudioPlayer = document.getElementById("taigiPlayer");
  const taigiAudioSource = document.querySelector("#taigiPlayer source");

  // Function to change the audio source
  function changeAudioSource(newSource, audioSource, audioPlayer) {
    audioSource.src = newSource;
    audioPlayer.load(); // Reload the audio player with the new source
    // audioPlayer.play(); // Start playing the new audio
  }

  // 取得網址參數: Function to get parameter by name from URL
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    // URL解碼
    url = decodeURIComponent(url);
    
    console.log("url: ", url);
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // 替換噶哈巫發音
  const kxbSoundParam = getParameterByName("sound");
  console.log("kxbSoundParam: ", kxbSoundParam);
  // if (soundParam) {
  const kxbAudioURL = `https://dbkaxabu.ithuan.tw/%E8%81%BD?%E8%AA%9E%E8%A9%9E%E7%B7%A8%E8%99%9F=${kxbSoundParam}&%E5%85%A7%E5%AE%B9=%E5%99%B6%E5%93%88%E5%B7%AB`;
  changeAudioSource(kxbAudioURL, kxbAudioSource, kxbAudioPlayer);
  // }

   // 替換臺語發音
   const taigiSoundParam = getParameterByName("sound");
   console.log("kxbSoundParam: ", taigiSoundParam);
   // if (soundParam) {
   const taigiAudioURL = `https://dbkaxabu.ithuan.tw/%E8%81%BD?%E8%AA%9E%E8%A9%9E%E7%B7%A8%E8%99%9F=${taigiSoundParam}&%E5%85%A7%E5%AE%B9=%e8%87%ba%e8%aa%9e`;
   changeAudioSource(taigiAudioURL, taigiAudioSource, taigiAudioPlayer);
   // }

  // 查詢資料
   const kxbText = document.querySelector("#kxbText");
   const tunKunayText = document.querySelector("#tunKunayText");
   const chText = document.querySelector("#chText");
   const taigiText = document.querySelector("#taigiText");
   // 取得網址參數的值
   const kxbStr = getParameterByName("kxb");
   const tunKunaytStr = getParameterByName("tunKunay");
   const chStr = getParameterByName("ch");
   const taigiStr = getParameterByName("taigi");

   // 詞彙文字替換成參數的值
   kxbText.textContent = kxbStr;
   tunKunayText.textContent = tunKunaytStr;
   chText.textContent = chStr;
   taigiText.textContent = taigiStr;

});



// 聽噶哈巫語
var playButton = document.getElementById("kxbBtn");
var audio = document.getElementById("kxbPlayer");

playButton.addEventListener("click", function () {
  if (audio.paused) {
    console.log("paused");
    audio.play();
    playButton.textContent = "暫停";
  } else {
    console.log("not paused");
    audio.pause();
    playButton.textContent = "聽族語";
  }
});

audio.addEventListener("ended", function () {
  playButton.textContent = "聽族語";
});

// 聽臺語
var taigiPlayButton = document.getElementById("taigiBtn");
var taigiAudio = document.getElementById("taigiPlayer");

taigiPlayButton.addEventListener("click", function () {
  if (audio.paused) {
    console.log("paused");
    taigiAudio.play();
    taigiPlayButton.textContent = "暫停";
  } else {
    console.log("not paused");
    audtaigiAudioio.pause();
    taigiPlayButton.textContent = "聽解釋";
  }
});

taigiAudio.addEventListener("ended", function () {
  taigiPlayButton.textContent = "聽解釋";
});
