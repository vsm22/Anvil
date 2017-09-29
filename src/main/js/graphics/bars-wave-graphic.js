// need to use imports-loader for Snap
const Snap = require("imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js");

class BarsWaveGraphic {
  constructor(container, o) {
    const _this = this;

    o = o || {};

    this.snp = new Snap(container);

    this.animationState = 0; // animation state determines which animation is currently running

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
            newSegment.isAvailable = true; // isAvailable means not currently being transformed
            newSegment.ox = ox; // original x value
            newSegment.oy = oy; // original y value
            segmentsArr.push(newSegment);
          }
          return segmentsArr;
    }());

    _this.setAnimationState(1);

    _this.runAnimationDriver();
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
   * Run a "driver" loop that updates an x-position value (driver.x) in relation to
   *  a velocity (v), current time, and container width.
   */
  runAnimationDriver() {
    const _this = this;

    let animationIsActive = true;
    let pauseStart, pausePeriod;

    if (animationIsActive) {
      // update the x value and draw the current state
      _this.driver.x = (Date.now() % (_this.container.clientWidth / _this.driver.v)) * _this.driver.v;
      _this.draw();

      // check if we're near the edge. If we are, pause for a random time (up to 5000ms)
      if (_this.driver.x > _this.container.clientWidth - 5) {
        animationIsActive = false;
        pausePeriod = Math.floor(Math.random() * 5000);
        pauseStart = Date.now();
        _this.resetWavePath();
      }
    }
    // if the pause period has elapsed, resume animation
    else if (Date.now() > pauseStart + pausePeriod) {
      animationIsActive = true;
    }

    window.requestAnimationFrame(() => { _this.runAnimationDriver(); });
  }

  /**
   * Draw current state
   */
  draw() {
    switch (this.animationState) {
      case 0:
        break;
      case 1:
        this.animateTravelingWave();
        break;
      case 2:
        //this.animateRain();
        this.animateShimmer();
        break;
      default:
        break;
    }
  }

  /**
   * Set the animation state
   */
  setAnimationState(state) {
    const _this = this;

    // do the necessary initialization before each state change
    switch (state) {
      case 1:
        _this.setAllAvailable(true);
        _this.setAllOpacity(0);
        break;
      case 2:
        _this.setAllAvailable(true);
        _this.lineUpHorizontally(0, _this.container.clientHeight);
        break;
      default:
        break;
    }

    _this.animationState = state;
  }

  /**
   * Marks all segments as available or not
   */
  setAllAvailable(isAvailable = true) {
    this.segments.forEach(segment => {
      segment.isAvailable = isAvailable;
    });
  }

  /**
   * Sets all opacity to a value
   */
  setAllOpacity(newOpacity = 1) {
    this.segments.forEach(segment => {
        segment.attr({opacity: newOpacity});
    });
  }

  /**
   * Traveling wave animation
   * Triggered on animationState 1
   */
  animateTravelingWave() {
    const _this = this;

    _this.segments.forEach(segment => {
      if (segment.isAvailable && Math.abs(_this.driver.x - segment.attr().x) < 10) {
        segment.attr({ y: segment.oy });
        animateExpansion(segment);
      }
    });

    // function for expanding the segment
    function animateExpansion(segment) {
      segment.isAvailable = false;
      segment.animate({
          height: _this.waveHeight,
          y: segment.oy - (_this.waveHeight / 2),
          opacity: _this.maxOpacity
        },
        500,
        mina.easein,
        () => { animateContraction(segment) }
      );
    }

    // function for contracting the segment
    function animateContraction(segment) {
      segment.animate({
          height: 0,
          y: segment.oy,
          opacity: 0
        },
        1000,
        mina.easeout,
        () => { segment.isAvailable = true }
      );
    }
  }

  /**
   * Line up segments in a horizontal line
   */
  lineUpHorizontally(y, height) {
    const _this = this;

    y = (y !== undefined) ? y : 0;
    height = (height !== undefined) ? height : 1;

    _this.segments.forEach(segment => {
        segment.stop();
        segment.oy = y;
        segment.oheight = height;
        segment.animate({
            y: segment.oy,
            height: segment.oheight,
            opacity: _this.maxOpacity
          },
          1000,
          mina.elastic
        );
    });
  }

  /**
   * Creates a falling rain-like animation
   */
  animateRain() {
    const _this = this;

    _this.segments.forEach(segment => {
      if (segment.isAvailable && _this.driver.x > segment.attr().x) {
        animateFalling(segment);
      }
    });

    function animateFalling(segment) {
      segment.isAvailable = false;
      segment.animate({
          y: _this.container.clientHeight,
          height: 100,
          opacity: 0
        },
        (Math.random() * 5000) + 2000,
        mina.easeout,
        () => {
          segment.attr({y: segment.oheight, opacity: 0.1, height: segment.oheight});
          segment.isAvailable = true;
        }
      );
    }
  }

  /**
   * "Fall and shimmer" animation
   */
  animateShimmer() {
    const _this = this;

    _this.segments.forEach(segment => {
      if (segment.isAvailable && Math.abs(_this.driver.x - segment.attr().x) < 10) {
        segment.isAvailable = false;
        fadeOut(segment);
      }
    });

    function fadeOut(segment) {
      segment.animate({
          opacity: 0
        },
        1000,
        mina.linear,
        () => { fadeIn(segment); }
      );
    }

    function fadeIn(segment) {
      segment.animate({
          opacity: 0.2
        },
        1000,
        mina.linear,
        () => { segment.isAvailable = true; }
      );
    }
  }
}

export default BarsWaveGraphic
