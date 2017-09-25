/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CurtainSpinner;
/**
 * Draw a spinner
 */
function CurtainSpinner(canvas) {
  const ctx = canvas.getContext("2d");

  let colWidth = 50;
  let numCols = canvas.width / colWidth;
  let colProps = [];
  let t = Date.now();
  let throttleInterval = 10;

  for (let i = 0; i < numCols; i++) {
    colProps.push({
      colLength: generateColLength(),
      rate: generateColRate()
    });
  }

  function generateColLength() {
    return Math.floor(Math.random() * 12) + 5;
  }

  function generateColRate() {
    return Math.random() * 0.1;
  }

  function draw() {
    if (Date.now() - t >= throttleInterval) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t = Date.now();
      let l = 0; // lightness

      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < colProps[i].colLength; j++) {

          l = Math.abs(100 - (colProps[i].rate * t % 200)) *  j;

          ctx.beginPath();
          ctx.fillStyle = "hsl(210, 100%," + l + "%)";
          ctx.rect(i * colWidth, j * colWidth, colWidth, colWidth);
          ctx.fill();
        }
      }
    }

    window.requestAnimationFrame(draw);
  }

  draw();
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__spinner_curtain__ = __webpack_require__(0);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__spinner_curtain__["a" /* default */])(document.getElementsByTagName("canvas")[0]);


/***/ })
/******/ ]);