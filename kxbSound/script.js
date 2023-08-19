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

  // #region 透過網址參數取得查詢詞彙相關資料
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
  // #endregion
});

// #region 聽噶哈巫語: 音訊處理
const kxbPlayButton = document.getElementById("kxbBtn");
const kxbAudio = document.getElementById("kxbPlayer");

const taigiPlayButton = document.getElementById("taigiBtn");
const taigiAudio = document.getElementById("taigiPlayer");

// 若無kaxabu音訊則關閉按鈕
let kxbAudioIsActive = true;
kxbAudio.addEventListener("error", function name(params) {
  kxbAudioIsActive = false;
  kxbPlayButton.textContent = "尚無族語發音";
  kxbPlayButton.disabled = true; // 關閉按鈕點擊功能
});

// 若無taigi音訊則關閉按鈕
let taigiAudioIsActive = true;
taigiAudio.addEventListener("error", function name(params) {
  taigiAudioIsActive = false;
  taigiPlayButton.textContent = "尚無族語發音";
  taigiPlayButton.disabled = true; // 關閉按鈕點擊功能
});

if (kxbAudioIsActive) {
  kxbPlayButton.addEventListener("click", function () {
    if (kxbAudio.paused) {
      console.log("paused");
      kxbAudio.play();
      kxbPlayButton.textContent = "暫停";
      if (taigiAudio.played) {
        taigiAudio.pause();
        taigiPlayButton.textContent = "聽解釋";
      }
    } else {
      console.log("not paused");
      kxbAudio.pause();
      kxbPlayButton.textContent = "聽族語";
    }
  });
}

kxbAudio.addEventListener("ended", function () {
  kxbPlayButton.textContent = "聽族語";
});
//#endregion

// #region 聽臺語: 音訊處理

taigiPlayButton.addEventListener("click", function () {
  if (taigiAudio.paused) {
    console.log("paused");
    taigiAudio.play();
    taigiPlayButton.textContent = "暫停";

    if (kxbAudio.played) {
      kxbAudio.pause();
      kxbPlayButton.textContent = "聽族語";
    }
  } else {
    console.log("not paused");
    taigiAudio.pause();
    taigiPlayButton.textContent = "聽解釋";
  }
});

taigiAudio.addEventListener("ended", function () {
  taigiPlayButton.textContent = "聽解釋";
});
//#endregion
