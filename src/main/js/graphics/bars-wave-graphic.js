// need to use imports-loader for Snap
const Snap = require("imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js");

class BarsWaveGraphic {
  constructor(container, o) {
    const _this = this;

    o = o || {};

    this.snp = new Snap(container);

    this.animationState = 1;

    this.container = container;
    this.numBars = (o.numBars !== undefined) ? o.numBars : 20;
    this.barWidth = this.container.clientWidth / this.numBars;
    this.bars = [];
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

    this.bars = (function createBarsArr() {
          let barsArr = [];
          for (let i = 0; i < _this.numBars; i++) {
            let ox = i * _this.barWidth;
            let oy = (_this.centralAxis / 2) + Math.sin(ox / 200) * _this.container.clientHeight / 2;
            let newBar = _this.snp.rect(ox, oy, _this.barWidth, 0);
            newBar.attr({
              fill: "hsl(" + _this.primaryHue + ", 100, 50)",
              opacity: 0
            });
            newBar.isAvailable = true;
            newBar.ox = ox;
            newBar.oy = oy;
            barsArr.push(newBar);
          }
          return barsArr;
    }());

    _this.runDriver();
  }

  /**
   * Run a "driver" loop that updates an x-position value (driver.x) in relation to
   *  a velocity (v), current time, and container width.
   */
  runDriver() {
    const _this = this;

    _this.driver.x = (Date.now() % (_this.container.clientWidth / _this.driver.v)) * _this.driver.v;

    window.requestAnimationFrame(() => { _this.runDriver(); });
  }

  resetWavePath() {
    const _this = this;

    let waveFreq = Math.ceil(Math.random() * 200);
    let waveAmp = Math.floor(Math.random() * (_this.container.clientHeight / 2));

    this.bars.forEach(bar => {
      bar.oy = _this.centralAxis + (Math.sin(bar.ox / waveFreq) * waveAmp);
    });
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
    _this.bars.forEach(bar => {
        bar.attr({opacity: 0});
    });

    runAnimationLoop();

    function runAnimationLoop() {
      if (animationIsActive) {


        if (_this.driver.x > _this.container.clientWidth - 5) {
          animationIsActive = false;
          pausePeriod = Math.floor(Math.random() * 5000);
          pauseStart = Date.now();
          _this.resetWavePath();
        }

        _this.bars.forEach(bar => {
          if (bar.isAvailable && Math.abs(_this.driver.x - bar.attr().x) < 10) {
            bar.attr({ y: bar.oy });
            animateBarExpansion(bar);
          }
        });
      } else if (Date.now() > pauseStart + pausePeriod){
        animationIsActive = true;
      }

      if (_this.animationState === 1) {
        window.requestAnimationFrame(runAnimationLoop);
      }
    }

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

    _this.bars.forEach(bar => {
        bar.stop();
        bar.animate({y: y, height: height, opacity: _this.maxOpacity}, 1000, mina.elastic);
    });
  }
}

export default BarsWaveGraphic
