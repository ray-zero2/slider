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
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(velocity) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ \"./node_modules/core-js/modules/es.array.concat.js\");\n/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.filter */ \"./node_modules/core-js/modules/es.array.filter.js\");\n/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.from */ \"./node_modules/core-js/modules/es.array.from.js\");\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ \"./node_modules/core-js/modules/es.date.to-string.js\");\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ \"./node_modules/core-js/modules/es.object.get-own-property-descriptor.js\");\n/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.object.keys */ \"./node_modules/core-js/modules/es.object.keys.js\");\n/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.parse-int */ \"./node_modules/core-js/modules/es.parse-int.js\");\n/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/web.timers */ \"./node_modules/core-js/modules/web.timers.js\");\n/* harmony import */ var core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_timers__WEBPACK_IMPORTED_MODULE_18__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar SLIDE_TYPE = {\n  FROM_FIRST_TO_LAST: 'FROM_FIRST_TO_LAST',\n  FROM_LAST_TO_FIRST: 'FROM_LAST_TO_FIRST',\n  TO_LEFT_OR_RIGHT: 'TO_LEFT_OR_RIGHT'\n};\n\nvar outerWidth = function outerWidth(el) {\n  var width = el.offsetWidth;\n  var style = getComputedStyle(el);\n  width += parseInt(style.marginLeft) + parseInt(style.marginRight);\n  return width;\n};\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n\n    this.$slider = document.querySelector('.slider_wrapper');\n    this.$sliderWrapper = this.$slider.querySelector('.slider_window');\n    this.$sliderList = this.$slider.querySelector('.slider_list');\n    this.$slides = this.$sliderList.querySelectorAll('.slider_items');\n    this.$previousButton = this.$slider.querySelector('[data-order=\"before\"]');\n    this.$nextButton = this.$slider.querySelector('[data-order=\"after\"]');\n    this.$dotIndicators = this.createDotIndicators({\n      dotLength: this.$slides.length\n    }); // スライドの幅[width]\n\n    this.slideWidth = outerWidth(this.$slides[0]); // 表示しているスライドのインデックス\n\n    this.currentSlideIndex = 0; // 1つ前のスライドのインデックス\n\n    this.lastSlideIndex = this.currentSlideIndex; // スライドの数\n\n    this.slideLength = this.$slides.length; // スライドの最大インデックス\n\n    this.maxIndex = this.slideLength - 1; // アニメーション動作時間[ms]\n\n    this.duration = 200;\n    this.isTouching = false;\n    this.fingerPosition = {\n      previous: 0,\n      current: 0\n    }; // スワイプで反応するフレームレート\n\n    var fps = 30;\n    this.frameTime = 1000 / fps; //イベント生成\n\n    this.bind();\n  }\n  /**\n   * ドットのインジケータを生成する\n   * @param {number} dotLength 表示させるドットの数\n   * @returns {HTMLElement} 生成したドットのインジケータのDOM\n   */\n\n\n  _createClass(_default, [{\n    key: \"createDotIndicators\",\n    value: function createDotIndicators(_ref) {\n      var dotLength = _ref.dotLength;\n      var dotFragment = document.createDocumentFragment();\n\n      for (var index = 0; index < dotLength; index++) {\n        var $item = document.createElement('li');\n        $item.dataset.index = index;\n        if (index === 0) $item.classList.add('current-image-dot');\n        dotFragment.appendChild($item);\n      }\n\n      var $indicatorWrapper = document.querySelector('.indicator');\n      $indicatorWrapper.appendChild(dotFragment);\n      return $indicatorWrapper.querySelectorAll('li');\n    }\n  }, {\n    key: \"getSliderTranslateX\",\n    value: function getSliderTranslateX(slideIndex, slideWidth) {\n      return -(slideIndex * slideWidth) + 'px';\n    }\n  }, {\n    key: \"next\",\n    value: function next() {\n      this.currentSlideIndex = this.currentSlideIndex + 1 > this.maxIndex ? 0 : this.currentSlideIndex + 1;\n      this.update();\n    }\n  }, {\n    key: \"previous\",\n    value: function previous() {\n      this.currentSlideIndex = this.currentSlideIndex - 1 < 0 ? this.maxIndex : this.currentSlideIndex - 1;\n      this.update();\n    }\n  }, {\n    key: \"setMostLeftPosition\",\n    value: function setMostLeftPosition($element) {\n      $element.style.transform = \"translateX(\".concat(this.getSliderTranslateX(this.maxIndex + 1, this.slideWidth), \")\");\n    }\n  }, {\n    key: \"setMostRightPosition\",\n    value: function setMostRightPosition($element) {\n      $element.style.transform = \"translateX(\".concat(this.getSliderTranslateX(this.maxIndex + 1, -this.slideWidth), \")\");\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      this.updateActiveIndicator();\n      this.readySlide();\n      this.slide();\n      this.lastSlideIndex = this.currentSlideIndex;\n    }\n  }, {\n    key: \"updateActiveIndicator\",\n    value: function updateActiveIndicator() {\n      var _this = this;\n\n      var activeClass = 'current-image-dot';\n\n      _toConsumableArray(this.$dotIndicators).forEach(function ($dotIndicator, index) {\n        $dotIndicator.classList.remove(activeClass);\n        if (index === _this.currentSlideIndex) $dotIndicator.classList.add(activeClass);\n      });\n    }\n  }, {\n    key: \"getTranslateXOfLastSlide\",\n    value: function getTranslateXOfLastSlide() {\n      return this.getSliderTranslateX(this.maxIndex + 1, this.slideWidth);\n    }\n  }, {\n    key: \"getTranslateXOfFirstSlide\",\n    value: function getTranslateXOfFirstSlide() {\n      return this.getSliderTranslateX(-1, this.slideWidth);\n    }\n  }, {\n    key: \"readySlide\",\n    value: function readySlide() {\n      var _this2 = this;\n\n      switch (this.getSlideType()) {\n        case SLIDE_TYPE.FROM_FIRST_TO_LAST:\n          this.addSlideQueue({\n            translateX: this.getTranslateXOfLastSlide()\n          }, {\n            duration: 0,\n            begin: function begin() {\n              _this2.setMostRightPosition(_this2.$slides[0]);\n            }\n          });\n          break;\n\n        case SLIDE_TYPE.FROM_LAST_TO_FIRST:\n          this.addSlideQueue({\n            translateX: this.getTranslateXOfFirstSlide()\n          }, {\n            duration: 0,\n            begin: function begin() {\n              _this2.setMostLeftPosition(_this2.$slides[_this2.maxIndex]);\n            }\n          });\n          break;\n\n        case SLIDE_TYPE.TO_LEFT_OR_RIGHT:\n          this.$slides[0].style.transform = '';\n          this.$slides[this.maxIndex].style.transform = '';\n          break;\n      }\n\n      this.addSlideQueue({\n        translateX: this.getSliderTranslateX(this.currentSlideIndex, this.slideWidth)\n      }, {\n        duration: this.duration,\n        complete: function complete() {\n          _this2.$slides[0].style.transform = '';\n          _this2.$slides[_this2.maxIndex].style.transform = '';\n        }\n      });\n    }\n  }, {\n    key: \"getSlideType\",\n    value: function getSlideType() {\n      var shouldSlideLastFromFirst = this.lastSlideIndex === 0 && this.currentSlideIndex === this.maxIndex;\n      var shouldSlideFirstFromLast = this.lastSlideIndex === this.maxIndex && this.currentSlideIndex === 0;\n\n      if (shouldSlideLastFromFirst) {\n        return SLIDE_TYPE.FROM_FIRST_TO_LAST;\n      } else if (shouldSlideFirstFromLast) {\n        return SLIDE_TYPE.FROM_LAST_TO_FIRST;\n      } else {\n        return SLIDE_TYPE.TO_LEFT_OR_RIGHT;\n      }\n    }\n  }, {\n    key: \"slide\",\n    value: function slide() {\n      velocity.Utilities.dequeue(this.$sliderList, 'slide');\n    }\n  }, {\n    key: \"addSlideQueue\",\n    value: function addSlideQueue(properties, options) {\n      velocity(this.$sliderList, 'stop', true);\n      velocity(this.$sliderList, properties, _objectSpread({}, options, {\n        queue: 'slide'\n      }));\n    }\n  }, {\n    key: \"trackingFinger\",\n    value: function trackingFinger() {\n      var _this3 = this;\n\n      if (!this.isTouching) return; // スワイプ距離計算[px]\n\n      var DISTANCE = this.fingerPosition.current - this.fingerPosition.previous; // スワイプ距離変換[vw]\n\n      this.DISTANCE_VW = DISTANCE * 100 / window.innerWidth; // 移動量計算\n\n      this.moveTo = -(this.currentSlideIndex * this.slideWidth) + this.DISTANCE_VW + 'vw';\n      velocity(this.$sliderList, {\n        translateX: this.moveTo\n      }, {\n        duration: 0\n      });\n      setTimeout(function () {\n        _this3.trackingFinger();\n      }, this.frameTime);\n    }\n  }, {\n    key: \"handlePreviousClick\",\n    value: function handlePreviousClick() {\n      this.previous();\n    }\n  }, {\n    key: \"handleNextClick\",\n    value: function handleNextClick() {\n      this.next();\n    }\n  }, {\n    key: \"handleDotClick\",\n    value: function handleDotClick(event) {\n      this.currentSlideIndex = Number(event.target.dataset.index);\n      this.update();\n    }\n  }, {\n    key: \"handleTouchStart\",\n    value: function handleTouchStart(event) {\n      var startX = event.changedTouches[0].pageX;\n      this.fingerPosition.previous = startX;\n      this.fingerPosition.current = startX; // 指に追従させる\n\n      this.isTouching = true;\n      this.trackingFinger();\n    }\n  }, {\n    key: \"handleTouchMove\",\n    value: function handleTouchMove(event) {\n      var currentX = event.changedTouches[0].pageX;\n      this.fingerPosition.current = currentX;\n    }\n  }, {\n    key: \"handleTouchEnd\",\n    value: function handleTouchEnd() {\n      velocity(this.$sliderList, 'stop', true);\n      this.isTouching = false; // スライド移動実行\n\n      this.render();\n      this.fingerPosition.previous = 0;\n      this.fingerPosition.current = 0;\n    }\n  }, {\n    key: \"bind\",\n    value: function bind() {\n      var _this4 = this;\n\n      this.$previousButton.addEventListener('click', this.handlePreviousClick.bind(this));\n      this.$nextButton.addEventListener('click', this.handleNextClick.bind(this));\n\n      _toConsumableArray(this.$dotIndicators).forEach(function ($element) {\n        $element.addEventListener('click', _this4.handleDotClick.bind(_this4));\n      });\n\n      this.$sliderWrapper.addEventListener('touchstart', this.handleTouchStart.bind(this));\n      this.$sliderWrapper.addEventListener('touchmove', this.handleTouchMove.bind(this));\n      this.$sliderWrapper.addEventListener('touchend', this.handleTouchEnd.bind(this));\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      // スワイプ距離が半分超えたら次のスライドへ\n      if (this.DISTANCE_VW < -(this.slideWidth / 2)) {\n        // 最後のスライドから最初へ飛ぶ場合\n        if (this.currentSlideIndex === this.slideLength) {\n          // 最後の位置に複製した画像１へ送る\n          this.currentSlideIndex++;\n          this.slide(); // 最後の場所から本来の1番目の場所へジャンプ\n\n          this.currentSlideIndex = 1;\n          this.updateActiveIndicator();\n          velocity(this.$sliderList, {\n            translateX: this.getSliderTranslateX(this.currentSlideIndex, this.slideWidth)\n          }, {\n            duration: 0\n          }); // 通常通りの移動\n        } else {\n          this.next();\n        }\n      } else if (this.DISTANCE_VW > this.slideWidth / 2) {\n        // 最初のスライドから最後へ飛ぶ場合\n        if (this.currentSlideIndex === 1) {\n          //最初の位置に複製した最終画像へ送る\n          this.currentSlideIndex--;\n          this.slide(); // 本来の場所へジャンプ\n\n          this.currentSlideIndex = this.slideLength;\n          this.updateActiveIndicator();\n          velocity(this.$sliderList, {\n            translateX: this.getSliderTranslateX(this.currentSlideIndex, this.slideWidth)\n          }, {\n            duration: 0\n          }); // 通常通りの移動\n        } else {\n          this.previous();\n        }\n      } else {\n        // 画像移動ない場合は元に戻す\n        this.slide();\n      }\n    }\n  }]);\n\n  return _default;\n}();\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! velocity-animate */ \"./node_modules/velocity-animate/velocity.js\")))\n\n//# sourceURL=webpack:///./js/modules/slider.js?");

/***/ })

/******/ });