document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audio");
    const audioSource = document.querySelector("#audio source");

    // Function to change the audio source
    function changeAudioSource(newSource) {
      audioSource.src = newSource;
      audioPlayer.load(); // Reload the audio player with the new source
      audioPlayer.play(); // Start playing the new audio
    }

    // Function to get parameter by name from URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        console.log("url: ", url);
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Example usage
    const soundParam = getParameterByName("sound");
    console.log("soundParam: ", soundParam);
    // if (soundParam) {
      const newAudioURL = `https://dbkaxabu.ithuan.tw/%E8%81%BD?%E8%AA%9E%E8%A9%9E%E7%B7%A8%E8%99%9F=${soundParam}&%E5%85%A7%E5%AE%B9=%E5%99%B6%E5%93%88%E5%B7%AB`;
      changeAudioSource(newAudioURL);
    // }
  });
