export default function initMathJaxLib() {
  //if already loaded
  if (window.MathJax) {
    return setTimeout(() => MathJax.startup.defaultPageReady(), 100);
  }
  let mathML = document.createElement("script");
  mathML.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-chtml.js"
  );
  document.head.appendChild(mathML);
}
