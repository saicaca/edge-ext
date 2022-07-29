(function () {
  function setupCatPanel() {
    let canvas = document.createElement("canvas");
    canvas.id = "live2d";
    canvas.width = 300;
    canvas.height = 400;
    canvas.style.width = "150px";
    canvas.style.height = "200px";
    canvas.style.position = "fixed";
    canvas.style.right = 0;
    canvas.style.bottom = 0;
    canvas.style.pointerEvents = "none";
    canvas.style.filter = "drop-shadow(0px 10px 10px #ccc)";

    document.body.appendChild(canvas);
    const divElem = document.createElement("div");
    divElem.id = "content-js-div";
    divElem.style.position = "absolute";
    divElem.style.right = "0";
    divElem.style.bottom = "0";
    divElem.style.pointerEvents = "none";
    document.body.appendChild(divElem);
    const reactScript = document.createElement("script");
    reactScript.setAttribute("type", "text/javascript");
    reactScript.src = chrome.runtime.getURL("/assets/react.js");
    const styleCss = document.createElement("link");
    styleCss.setAttribute("rel", "stylesheet");
    styleCss.setAttribute("href", chrome.runtime.getURL("/assets/content.css"));
    document.head.appendChild(reactScript);
    document.head.appendChild(styleCss);
  }

  function setupModel() {
    let loadLive = document.createElement("script");
    loadLive.setAttribute("type", "text/javascript");
    loadLive.src = chrome.runtime.getURL("/assets/contentLoader.js");
    document.body.appendChild(loadLive);
    let meta = document.createElement("meta");
    meta.setAttribute("content", chrome.runtime.getURL("/assets/model.json"));
    meta.setAttribute("name", "model_url");
    document.head.appendChild(meta);
  }

  function injectCustomJs(jsPath, callbackFn) {
    let temp = document.createElement("script");
    temp.setAttribute("type", "text/javascript");
    temp.src = chrome.runtime.getURL(jsPath);
    temp.onload = function () {
      this.parentNode.removeChild(this);
      if (callbackFn) callbackFn();
    };
    document.head.appendChild(temp);
  }

  injectCustomJs("/assets/live2d-mini.js", function () {
    setupCatPanel();
    setupModel();
  });
})();
