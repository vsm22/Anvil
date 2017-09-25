import BackgroundBarsSvgGraphic from "../background-bars-graphic-svg";

let graphic = new BackgroundBarsSvgGraphic(
  document.getElementById("graphicContainer"),
  {}
);

document.body.addEventListener("mousedown", (event) => {
  console.log("clicked");
  graphic.animate();
});
