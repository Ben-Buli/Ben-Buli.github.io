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
  kxbText.textContent = kxbStr == "" ? "-" : kxbStr;
  tunKunayText.textContent = tunKunaytStr == "" ? "-" : tunKunaytStr;
  chText.textContent = chStr == "" ? "-" : chStr;
  taigiText.textContent = taigiStr == "" ? "-" : taigiStr;

  const title = document.querySelector('.title');
  title.textContent = kxbText;
  // #endregion
});

 // 音訊播放時搭配欄位標註符號
 function markText(isPlay, textCol) {
  if (isPlay) {
    // 播放時標註聲音對應文字
    let orginalText = textCol.textContent;
    textCol.textContent = `${orginalText}  ←`;
  } else {
    // 註銷標註符號
    let orginalText = textCol.textContent;
    textCol.textContent = orginalText.replace("←", "").trim();
  }
}

// 輔助函數：將秒數轉換為可讀的時間格式（例如，mm:ss）
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  var formattedTime =
    minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
  return formattedTime;
}

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
  taigiPlayButton.textContent = "無臺語解釋";
  taigiPlayButton.disabled = true; // 關閉按鈕點擊功能
});

// #region 聽噶哈巫語: 音訊處理
if (kxbAudioIsActive) {
  kxbPlayButton.addEventListener("click", function () {
    if (kxbAudio.paused) {
      console.log("paused");
      kxbAudio.play();
      kxbPlayButton.textContent = "暫停";
      // 播放時標註聲音對應文字
      markText(true, kxbText);
      // 播放時關閉另一個音訊
      if (taigiAudio.played) {
        taigiAudio.pause();
        taigiAudio.currentTime = 0;
        taigiPlayButton.textContent = "聽解釋";
        // 註銷台語的標註符號
        markText(false, taigiText);
      }
      // 設置音訊的 'timeupdate' 事件處理程序以同步更新當前播放時間
      kxbAudio.addEventListener("timeupdate", function () {
        // 取得音訊的當前播放時間（以秒為單位）
        let currentTime = kxbAudio.currentTime;
        let totalDuration = kxbAudio.duration;

        // 更新顯示當前時間的元素
        kxbPlayButton.textContent = `${formatTime(
          totalDuration - currentTime
        )}`;
      });
    } else {
      console.log("not paused");
      kxbAudio.pause();
      kxbPlayButton.textContent = "聽族語";
    }
  });
}

kxbAudio.addEventListener("ended", function () {
  kxbPlayButton.textContent = "聽族語";
  // 註銷標註符號
  markText(false, kxbText);
});

//#endregion kxb

// #region 聽臺語: 音訊處理
taigiPlayButton.addEventListener("click", function () {
  if (taigiAudio.paused) {
    console.log("paused");
    taigiAudio.play();
    taigiPlayButton.textContent = "暫停";
    // 播放時標註聲音對應文字
    markText(true, taigiText);
    // 播放時關閉另一個音訊
    if (kxbAudio.played) {
      kxbAudio.pause();
      kxbAudio.currentTime = 0;
      kxbPlayButton.textContent = "聽族語";
      // 註銷噶哈巫語標註符號
      markText(false, kxbText);
    }
    taigiAudio.addEventListener("timeupdate", function () {
      // 取得音訊的當前播放時間（以秒為單位）
      let currentTime = taigiAudio.currentTime;
      let totalDuration = taigiAudio.duration;

      // 更新顯示當前時間的元素
      taigiPlayButton.textContent = `${formatTime(
        totalDuration - currentTime
      )}`;
    });
  } else {
    console.log("not paused");
    taigiAudio.pause();
    taigiPlayButton.textContent = "聽解釋";
  }
});

taigiAudio.addEventListener("ended", function () {
  taigiPlayButton.textContent = "聽解釋";
  // 註銷標註符號
  markText(false, taigiText);
});

//#endregion taigi
