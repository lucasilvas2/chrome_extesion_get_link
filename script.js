const getSrcIframe = () => {
  let iframe = document.querySelector("iframe");

  return iframe.src;
};
const botao = document.getElementById("btn_buscar");
botao.addEventListener("click", async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let test = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSrcIframe,
  });
  let btn_link = document.getElementById("link");
  btn_link.href = test[0].result;
  btn_link.classList.remove("disabled");
  console.log(test[0].result);
});
