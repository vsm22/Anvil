import BarsWaveGraphic from "../bars-wave-graphic";

let barsWaveGraphic = new BarsWaveGraphic(document.getElementById("svg"));

document.getElementById("button1").onclick = function() {
  barsWaveGraphic.animateTravelingWave();
}
document.getElementById("button2").onclick = function() {
  barsWaveGraphic.lineUpHorizontally(30, 100);
}
document.getElementById("button3").onclick = function() {
  console.log("button3")
}
