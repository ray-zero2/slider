/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./js/app.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider */ \"./js/modules/slider.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n\n\nvar App = function App() {\n  _classCallCheck(this, App);\n\n  new _modules_slider__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n};\n\nnew App();\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(velocity) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.from */ \"./node_modules/core-js/modules/es.array.from.js\");\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ \"./node_modules/core-js/modules/es.date.to-string.js\");\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/web.timers */ \"./node_modules/core-js/modules/web.timers.js\");\n/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_12__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import velocity from 'velocity-animate';\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n\n    this.$previousButton = document.querySelector('[data-order=\"before\"]');\n    this.$nextButton = document.querySelector('[data-order=\"after\"]');\n    this.$sliderWindow = document.querySelector('.slider_window');\n    this.$sliderList = document.querySelector('.slider_list');\n    this.$image1 = document.querySelector('.slider_image1');\n    this.$image5 = document.querySelector('.slider_image5');\n    this.$dotIndicators = this.createDotIndicators({\n      dotsToShow: this.$sliderList.childElementCount\n    }); //指スワイプで反応するレート\n\n    this.fps = 30; //スライダー画像サイズ[vw]\n\n    this.slideWidth = 70; //アニメーション動作時間[ms]\n\n    this.duration = 200; //スライダー画像表示番号\n\n    this.sliderCounter = 1; //現在の画像枚数取得\n\n    this.numberOfImages = this.$sliderList.childElementCount; //タッチしたときの動きに関する部分\n\n    this.isFinger = false;\n    this.fingerPosition = {\n      previous: 0,\n      current: 0\n    };\n    this.frameTime = 1000 / this.fps; //初期化\n\n    this.initialize(); //イベント生成\n\n    this.bind();\n  }\n  /**\n   * 初期準備\n   */\n\n\n  _createClass(_default, [{\n    key: \"initialize\",\n    value: function initialize() {\n      // 最初と最後の画像を複製してリストに追加\n      this.cloneSlides(); // スライダー初期位置に移動\n\n      this.goToFirstPosition();\n    }\n  }, {\n    key: \"cloneSlides\",\n    value: function cloneSlides() {\n      var $FIRST_IMAGE = this.$sliderList.firstElementChild.cloneNode(true);\n      var $LAST_IMAGE = this.$sliderList.lastElementChild.cloneNode(true);\n      this.$sliderList.appendChild($FIRST_IMAGE);\n      this.$sliderList.insertBefore($LAST_IMAGE, this.$sliderList.firstElementChild);\n    }\n    /**\n     * ドットのインジケータを生成する\n     * @param {number} dotsToShow 表示させるドットの数\n     * @returns {HTMLElement} 生成したドットのインジケータのDOm\n     */\n\n  }, {\n    key: \"createDotIndicators\",\n    value: function createDotIndicators(_ref) {\n      var dotsToShow = _ref.dotsToShow;\n      var $indicatorWrap = document.querySelector('.indicator');\n      var dotFragment = document.createDocumentFragment();\n\n      for (var i = 1; i <= dotsToShow; i++) {\n        var $item = document.createElement('li');\n        $item.dataset.number = i;\n        if (i === 1) $item.classList.add('current-image-dot');\n        dotFragment.appendChild($item);\n      }\n\n      $indicatorWrap.appendChild(dotFragment);\n      return $indicatorWrap.querySelectorAll('li');\n    }\n  }, {\n    key: \"goToFirstPosition\",\n    value: function goToFirstPosition() {\n      var SLIDER_FIRST_POSITION = this.calcSliderPosition(this.sliderCounter);\n      velocity(this.$sliderList, {\n        translateX: SLIDER_FIRST_POSITION\n      }, {\n        duration: 0\n      });\n    }\n  }, {\n    key: \"calcSliderPosition\",\n    value: function calcSliderPosition(number) {\n      return -(number * this.slideWidth) + 'vw';\n    }\n    /**\n     * インジケーターの表示切り替え\n     */\n\n  }, {\n    key: \"changeActiveIndicator\",\n    value: function changeActiveIndicator() {\n      _toConsumableArray(this.$dotIndicators).forEach(function ($dotIndicator) {\n        $dotIndicator.classList.remove('current-image-dot');\n      });\n\n      _toConsumableArray(this.$dotIndicators)[this.sliderCounter - 1].classList.add('current-image-dot');\n    }\n    /**\n     * slider移動\n     */\n\n  }, {\n    key: \"moveSlide\",\n    value: function moveSlide() {\n      var POSITION = this.calcSliderPosition(this.sliderCounter);\n      velocity(this.$sliderList, {\n        translateX: POSITION\n      }, {\n        duration: this.duration\n      });\n    }\n  }, {\n    key: \"next\",\n    value: function next() {\n      this.sliderCounter++;\n\n      if (this.sliderCounter > this.numberOfImages) {\n        this.sliderCounter = 1;\n        this.goTo({\n          translateX: 0\n        });\n      } else {\n        this.changeActiveIndicator();\n        this.moveSlide();\n      }\n    }\n  }, {\n    key: \"previous\",\n    value: function previous() {\n      this.sliderCounter--;\n\n      if (this.sliderCounter < 1) {\n        this.sliderCounter = this.numberOfImages;\n        this.goTo({\n          translateX: this.calcSliderPosition(this.sliderCounter + 1)\n        });\n      } else {\n        this.changeActiveIndicator();\n        this.moveSlide();\n      }\n    }\n  }, {\n    key: \"goTo\",\n    value: function goTo(_ref2) {\n      var _this = this;\n\n      var translateX = _ref2.translateX;\n      velocity(this.$sliderList, {\n        translateX: translateX\n      }, {\n        duration: 0,\n        complete: function complete() {\n          _this.changeActiveIndicator();\n\n          _this.moveSlide();\n        }\n      });\n    }\n  }, {\n    key: \"trackingFinger\",\n    value: function trackingFinger() {\n      var _this2 = this;\n\n      if (!this.isFinger) return; //スワイプ距離計算[px]\n\n      var DISTANCE = this.fingerPosition.current - this.fingerPosition.previous; //スワイプ距離変換[vw]\n\n      this.DISTANCE_VW = DISTANCE * 100 / window.innerWidth; //移動量計算\n\n      this.moveTo = -(this.sliderCounter * this.slideWidth) + this.DISTANCE_VW + 'vw';\n      velocity(this.$sliderList, {\n        translateX: this.moveTo\n      }, {\n        duration: 0\n      });\n      setTimeout(function () {\n        _this2.trackingFinger();\n      }, this.frameTime);\n    }\n  }, {\n    key: \"bind\",\n    value: function bind() {\n      var _this3 = this;\n\n      this.$previousButton.addEventListener('click', function () {\n        velocity(_this3.$sliderList, 'stop', true);\n\n        _this3.previous();\n      });\n      this.$nextButton.addEventListener('click', function () {\n        velocity(_this3.$sliderList, 'stop', true);\n\n        _this3.next();\n      });\n\n      _toConsumableArray(this.$dotIndicators).forEach(function ($element) {\n        $element.addEventListener('click', function (event) {\n          var SELECT_NUMBER = event.target.dataset.number;\n          _this3.sliderCounter = SELECT_NUMBER;\n\n          _this3.changeActiveIndicator();\n\n          _this3.moveSlide();\n        });\n      });\n\n      this.$sliderWindow.addEventListener('touchstart', function () {\n        var TOUCH_OBJECT = event.changedTouches[0];\n        _this3.fingerPosition.previous = TOUCH_OBJECT.pageX;\n        _this3.fingerPosition.current = TOUCH_OBJECT.pageX; //指に追従させる\n\n        _this3.isFinger = true;\n\n        _this3.trackingFinger();\n      });\n      this.$sliderWindow.addEventListener('touchmove', function () {\n        //座標更新\n        var TOUCH_OBJECT = event.changedTouches[0];\n        _this3.fingerPosition.current = TOUCH_OBJECT.pageX;\n      });\n      this.$sliderWindow.addEventListener('touchend', function () {\n        velocity(_this3.$sliderList, 'stop', true);\n        _this3.isFinger = false; //スライド移動実行\n\n        _this3.render();\n\n        _this3.fingerPosition.previous = 0;\n        _this3.fingerPosition.current = 0;\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      //スワイプ距離が半分超えたら次のスライドへ\n      if (this.DISTANCE_VW < -(this.slideWidth / 2)) {\n        //最後のスライドから最初へ飛ぶ場合\n        if (this.sliderCounter === this.numberOfImages) {\n          //最後の位置に複製した画像１へ送る\n          this.sliderCounter++;\n          this.moveSlide(); //最後の場所から本来の1番目の場所へジャンプ\n\n          this.sliderCounter = 1;\n          this.changeActiveIndicator();\n          velocity(this.$sliderList, {\n            translateX: this.calcSliderPosition(this.sliderCounter)\n          }, {\n            duration: 0\n          }); //通常通りの移動\n        } else {\n          this.next();\n        }\n      } else if (this.DISTANCE_VW > this.slideWidth / 2) {\n        //最初のスライドから最後へ飛ぶ場合\n        if (this.sliderCounter === 1) {\n          //最初の位置に複製した最終画像へ送る\n          this.sliderCounter--;\n          this.moveSlide(); //本来の場所へジャンプ\n\n          this.sliderCounter = this.numberOfImages;\n          this.changeActiveIndicator();\n          velocity(this.$sliderList, {\n            translateX: this.calcSliderPosition(this.sliderCounter)\n          }, {\n            duration: 0\n          }); //通常通りの移動\n        } else {\n          this.previous();\n        }\n      } else {\n        //画像移動ない場合は元に戻す\n        this.moveSlide();\n      }\n    }\n  }]);\n\n  return _default;\n}();\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! velocity-animate */ \"./node_modules/velocity-animate/velocity.js\")))\n\n//# sourceURL=webpack:///./js/modules/slider.js?");

/***/ })

/******/ });