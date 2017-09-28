
/**
 * An svg graphic of horizontal bars with randomized width and coloration
 * @param {object} container - The container (usually a div) for the graphic element
 * @param {object} o - options
 * @param {number} [o.numBars = 5]
 * @param {number} [o.primaryHue = 210]
 * @param {number} [o.top = 0]
 * @param {number} [o.bottom = container.clientHeight]
 * @param {number} [o.cx = container.clientWidth/2]
 * @param {number} [o.minWidth = 0]
 * @param {number} [o.maxWidth = container.clientWidth]
 * @param {number} [o.minSaturation = 100]
 * @param {number} [o.maxSaturation = 100]
 * @param {number} [o.minLightness = 0]
 * @param {number} [o.maxLightness = 100]
 */
export default function BackgroundBarsGraphic(container, o) {
  const _this = this;

  o = o || {};

  // canvas and context
  this.container = container;
  this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.svg.setAttribute("width", this.container.clientWidth);
  this.svg.setAttribute("height", this.container.clientHeight);
  this.svg.style.border = "1px solid black";
  this.container.appendChild(this.svg);

  // bars container
  this.bars = [{
    color: "",
    width: 0,
    height: 0
  }];

  this.redraw(o);
}

BackgroundBarsGraphic.prototype.redraw = function redraw(o) {
  // options
  this.numBars = (o.numBars !== undefined) ? o.numBars : 5;
  this.primaryHue = (o.primaryHue !== undefined) ? o.primaryHue : 210;
  this.top = (o.top !== undefined) ? o.top : 0;
  this.bottom = (o.bottom !== undefined) ? o.bottom : this.container.clientHeight;
  this.cx = (o.cx !== undefined) ? o.cx : Math.floor(this.container.clientWidth / 2);
  this.minWidth = (o.minWidth !== undefined) ? this.toPx(o.minWidth, this.container.clientWidth) : 0;
  this.maxWidth = (o.maxWidth !== undefined) ? this.toPx(o.maxWidth, this.container.clientWidth) : this.container.clientWidth;
  this.minSaturation = (o.minSaturation !== undefined) ? o.minSaturation : 100;
  this.maxSaturation = (o.maxSaturation !== undefined) ? o.maxSaturation : 100;
  this.minLightness = (o.minLightness !== undefined) ? o.minLightness : 0;
  this.maxLightness = (o.maxLightness !== undefined) ? o.maxLightness : 100;

  this.generateBars();
  this.draw();
}

// round a value to be an even number
function roundToEven(val) {
  return val + (val % 2);
}

/** Convert a % value to px */
BackgroundBarsGraphic.prototype.toPx = function toPx(val, relativeVal) {
  if (typeof val === "number") {
    return val;
  } else if (typeof val === "string") {
    if (val.match(/%$/) !== null) {
      return (val.match(/[^%]*/)[0] / 100) * relativeVal;
    }
  }
}

/** Generate bars color, width, and height, and place inside bars container */
BackgroundBarsGraphic.prototype.generateBars = function generateBars() {
  for (let i = 0; i < this.numBars; ++i) {
    let curSaturation = (Math.random() * (this.maxSaturation - this.minSaturation)) + this.minSaturation;
    let curLightness = (Math.random() * (this.maxLightness - this.minLightness)) + this.minLightness;
    let barWidth = roundToEven(Math.floor(Math.random() * (this.maxWidth - this.minWidth) + this.minWidth));
    let barHeight = roundToEven(Math.floor((this.bottom - this.top) / this.numBars));

    this.bars[i] = {
      color: "hsl(" + this.primaryHue + ", " + curSaturation + "%, " + curLightness + "%)",
      width: barWidth,
      height: barHeight,
      top: this.top + (Math.floor((this.bottom - this.top) / this.numBars) * i),
      left: this.cx - Math.floor(barWidth / 2)
    }
  }
}

BackgroundBarsGraphic.prototype.animate = function animate() {
  this.bars.forEach(bar => {
    Object.keys(bar.svg.animations).forEach(key => {
      bar.svg.animations[key].beginElement();
    });
  });
}

/** Draw graphic on canvas */
BackgroundBarsGraphic.prototype.draw = function draw() {
  for (let i = 0; i < this.bars.length; ++i) {
    let curBar = this.bars[i];

    let newSvgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newSvgRect.style.position = "absolute";
    newSvgRect.setAttribute("x", curBar.left);
    newSvgRect.setAttribute("y", curBar.top)
    newSvgRect.setAttribute("width", 0);
    newSvgRect.setAttribute("height", curBar.height);
    newSvgRect.setAttribute("fill", curBar.color);

    this.svg.appendChild(newSvgRect);

    newSvgRect.animations = {};

    newSvgRect.animations.width = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    newSvgRect.animations.width.setAttribute("attributeType", "XML");
    newSvgRect.animations.width.setAttribute("attributeName", "width");
    newSvgRect.animations.width.setAttribute("begin", "indefinite");
    newSvgRect.animations.width.setAttribute("from", 0);
    newSvgRect.animations.width.setAttribute("to", curBar.width);
    newSvgRect.animations.width.setAttribute("dur", "0.35s");
    newSvgRect.animations.width.setAttribute("repeatCount", 1);
    newSvgRect.animations.width.setAttribute("fill", "freeze");

    newSvgRect.animations.x = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    newSvgRect.animations.x.setAttribute("attributeType", "XML");
    newSvgRect.animations.x.setAttribute("attributeName", "x");
    newSvgRect.animations.x.setAttribute("begin", "indefinite");
    newSvgRect.animations.x.setAttribute("from", this.cx);
    newSvgRect.animations.x.setAttribute("to", curBar.left);
    newSvgRect.animations.x.setAttribute("dur", "0.35s");
    newSvgRect.animations.x.setAttribute("repeatCount", 1);
    newSvgRect.animations.x.setAttribute("fill", "freeze");

    newSvgRect.appendChild(newSvgRect.animations.width);
    newSvgRect.appendChild(newSvgRect.animations.x);

    this.bars[i].svg = newSvgRect;
  }
}
