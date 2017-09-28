// need to use imports-loader for Snap
const Snap = require("imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js");

class BarsWaveGraphic {
  constructor(container, o) {
    const _this = this;

    o = o || {};

    this.snp = new Snap(container);

    this.animationState = 1;

    this.container = container;
    this.numSegments = (o.numSegments !== undefined) ? o.numSegments : 20;
    this.segmentWidth = this.container.clientWidth / this.numSegments;
    this.segments = [];
    this.driver = {
      x: 0,
      y: 0,
      v: (o.velocity !== undefined) ? o.velocity : (o.v !== undefined) ? o.v : 0.5
    };
    this.waveHeight = (o.waveHeight !== undefined) ? o.waveHeight : 400;
    this.primaryHue = (o.primaryHue !== undefined) ? o.primaryHue : 210;
    this.maxOpacity = (o.maxOpacity !== undefined) ? o.maxOpacity : 1;
    this.centralAxis = (o.centralAxis !== undefined) ? o.centralAxis : this.container.clientHeight / 2;

    _this.init();
    _this.animateTravelingWave();
  }

  init() {
    const _this = this;

    this.segments = (function createBarsArr() {
          let segmentsArr = [];
          for (let i = 0; i < _this.numSegments; i++) {
            let ox = i * _this.segmentWidth;
            let oy = (_this.centralAxis / 2) + Math.sin(ox / 200) * _this.container.clientHeight / 2;
            let newSegment = _this.snp.rect(ox, oy, _this.segmentWidth, 0);
            newSegment.attr({
              fill: "hsl(" + _this.primaryHue + ", 100, 50)",
              opacity: 0
            });
            newSegment.isAvailable = true;
            newSegment.ox = ox;
            newSegment.oy = oy;
            segmentsArr.push(newBar);
          }
          return segmentsArr;
    }());

    _this.runAnimationDriver();
  }

  /**
   * Run a "driver" loop that updates an x-position value (driver.x) in relation to
   *  a velocity (v), current time, and container width.
   */
  runAnimationDriver() {
    const _this = this;

    let animationIsActive = true;
    let pauseStart, pausePeriod;

    if (animationIsActive) {
      if (_this.driver.x > _this.container.clientWidth - 5) {
        animationIsActive = false;
        pausePeriod = Math.floor(Math.random() * 5000);
        pauseStart = Date.now();
        _this.resetWavePath();
      }

      _this.driver.x = (Date.now() % (_this.container.clientWidth / _this.driver.v)) * _this.driver.v;
      _this.draw();
      window.requestAnimationFrame(() => { _this.runAnimationDriver(); });
    }
    else if (Date.now() > pauseStart + pausePeriod) {
      animationIsActive = true;
    }
  }

  /**
   * Create a random wave freq and amplitude
   */
  resetWavePath(o) {
    const _this = this;
    o = o || {};

    // set default freq and amp ranges
    o.minFreq = (o.minFreq !== undefined) ? o.minFreq : 0;
    o.maxFreq = (o.maxFreq !== undefined) ? o.maxFreq : 200;
    o.minAmp = (o.minAmp !== undefined) ? o.minAmp : 0;
    o.maxAmp = (o.maxAmp !== undefined) ? o.maxAmp : _this.container.clientHeight / 2;

    // generate random freq and amplitude within the given range
    let waveFreq = (Math.random() * (o.maxFreq - o.minFreq)) + o.minFreq;
    waveFreq = Math.ceil(waveFreq);
    let waveAmp = (Math.random() * (o.maxAmp - o.minAmp)) + o.minAmp;
    waveAmp = Math.floor(waveAmp);

    // set the y origin (oy) for each segment according to a sin function with given freq and amp
    this.segments.forEach(segment => {
      segment.oy = _this.centralAxis + (Math.sin(segment.ox / waveFreq) * waveAmp);
    });
  }

  /**
   * Set the animation state
   */
  setAnimationState(state) {
    this.animationState = state;
  }

  /**
   * Draw current state
   */
  draw() {
  }

  /**
   * Traveling wave animation
   * Triggered on animationState 1
   */
  animateTravelingWave() {
    const _this = this;
    let animationIsActive = true;
    let pauseStart, pausePeriod;

    _this.animationState = 1;

    // reset opacity to 0 at the beginning of the animation
    _this.segments.forEach(segment => {
        segment.attr({opacity: 0});
    });

    _this.segments.forEach(segment => {
      if (segment.isAvailable && Math.abs(_this.driver.x - segment.attr().x) < 10) {
        segment.attr({ y: segment.oy });
        animateBarExpansion(segment);
      }
    });

    function animateBarExpansion(el) {
      el.isAvailable = false;
      el.animate({
          height: _this.waveHeight,
          y: el.oy - (_this.waveHeight / 2),
          opacity: _this.maxOpacity
        },
        500, mina.easein, () => { animateBarContraction(el)
      });
    }

    function animateBarContraction(el) {
      el.animate({
          height: 0,
          y: el.oy,
          opacity: 0
        },
        1000, mina.easeout, () => { markBarAsAvailable(el)
      });
    }

    function markBarAsAvailable(el) {
      el.isAvailable = true;
    }
  }

  /**
   * Horizontal Lineup Animation
   * Triggered on animationState 2
   */
  lineUpHorizontally(y, height) {
    const _this = this;

    _this.animationState = 2;

    y = (y !== undefined) ? y : 0;
    height = (height !== undefined) ? height : 20;

    _this.segments.forEach(bar => {
        segment.stop();
        segment.animate({y: y, height: height, opacity: _this.maxOpacity}, 1000, mina.elastic);
    });
  }
}

export default BarsWaveGraphic
