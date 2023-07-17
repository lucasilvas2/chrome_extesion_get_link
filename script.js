const getSrcIframe = () => {
  let iframe = document.querySelector("iframe");

  return iframe.src;
};
const botao = document.getElementById("btn_buscar");
botao.addEventListener("click", async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let data = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSrcIframe,
  });
  let url = convertEmbedToURL(data[0].result)

  let btn_link = document.getElementById("link");
  btn_link.href = url;
  btn_link.classList.remove("disabled");
  console.log(data[0].result);
});


function getYouTubeVideoID(embeddedCode) {
  const regex = /\/embed\/([^"?]+)/;
  const match = embeddedCode.match(regex);
  return match ? match[1] : null;
}

// Function to convert the YouTube video ID to a video URL
function convertEmbedToURL(embeddedCode) {
  const videoID = getYouTubeVideoID(embeddedCode);
  if (videoID) {
      return `https://www.youtube.com/watch?v=${videoID}`;
  }
  return null;
}
