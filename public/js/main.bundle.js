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
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(velocity) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ \"./node_modules/core-js/modules/es.symbol.js\");\n/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ \"./node_modules/core-js/modules/es.symbol.description.js\");\n/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ \"./node_modules/core-js/modules/es.symbol.iterator.js\");\n/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.from */ \"./node_modules/core-js/modules/es.array.from.js\");\n/* harmony import */ var core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ \"./node_modules/core-js/modules/es.date.to-string.js\");\n/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.parse-int */ \"./node_modules/core-js/modules/es.parse-int.js\");\n/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ \"./node_modules/core-js/modules/es.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ \"./node_modules/core-js/modules/es.string.iterator.js\");\n/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_17__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar SLIDE_TYPE = {\n  TO_LAST_FROM_FIRST: 'TO_LAST_FROM_FIRST',\n  TO_FIRST_FROM_LAST: 'TO_FIRST_FROM_LAST',\n  TO_LEFT_OR_RIGHT: 'TO_LEFT_OR_RIGHT'\n};\n\nvar outerWidth = function outerWidth(el) {\n  var width = el.offsetWidth;\n  var style = getComputedStyle(el);\n  width += parseInt(style.marginLeft) + parseInt(style.marginRight);\n  return width;\n};\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  function _default() {\n    _classCallCheck(this, _default);\n\n    this.$slider = document.querySelector('.slider_wrapper');\n    this.$sliderWrapper = this.$slider.querySelector('.slider_window');\n    this.$sliderList = this.$slider.querySelector('.slider_list');\n    this.$slides = this.$sliderList.querySelectorAll('.slider_items');\n    this.$previousButton = this.$slider.querySelector('[data-order=\"before\"]');\n    this.$nextButton = this.$slider.querySelector('[data-order=\"after\"]');\n    this.$dotIndicators = this.createDotIndicators({\n      dotLength: this.$slides.length\n    }); // スライドの幅[width]\n\n    this.slideWidth = outerWidth(this.$slides[0]); // 表示しているスライドのインデックス\n\n    this.currentSlideIndex = 1; // 現在から1つ前に指定されていたスライドのインデックス\n\n    this.lastSlideIndex = this.currentSlideIndex; // スライドの最大インデックス\n\n    this.maxIndex = this.$slides.length - 1; // スライダーのポジション\n\n    this.currentTranslateX = -(this.slideWidth * this.currentSlideIndex); // スライダーをタッチ中か\n\n    this.touching = false; // スライダーをタッチ中にジャンプしたか（無限ループ処理が実行されたか）\n\n    this.jumpedWhenTouching = false; // タッチ情報\n\n    this.touches = {\n      startX: 0,\n      currentX: 0\n    };\n    this.cloneSlide();\n    this.updateActiveIndicator(this.currentSlideIndex);\n    this.jump(this.currentSlideIndex);\n    this.bind();\n  } // クローンしたスライド以外の先頭のスライドのインデックス\n\n\n  _createClass(_default, [{\n    key: \"indexOfFirstSlide\",\n    value: function indexOfFirstSlide() {\n      return 1;\n    } // クローンしたスライド以外の末尾のスライドのインデックス\n\n  }, {\n    key: \"indexOfLastSlide\",\n    value: function indexOfLastSlide() {\n      return this.maxIndex - 1;\n    }\n    /**\n     * 無限ループを実現するため先頭と末尾のスライドをクローンする\n     */\n\n  }, {\n    key: \"cloneSlide\",\n    value: function cloneSlide() {\n      this.$sliderList.appendChild(this.$slides[0].cloneNode(true));\n      this.$sliderList.insertBefore(this.$slides[this.maxIndex].cloneNode(true), this.$sliderList.querySelectorAll('.slider_items')[0]); // スライドの数が増えたのでDOMを再取得して最大インデックスを更新\n\n      this.$slides = this.$sliderList.querySelectorAll('.slider_items');\n      this.maxIndex = this.$slides.length - 1;\n    }\n    /**\n     * ドットのインジケータを生成し、生成したドットのインジケータのDOMを返す\n     * @param {number} dotLength 表示させるドットの数\n     * @returns {HTMLElement} 生成したドットのインジケータのDOM\n     */\n\n  }, {\n    key: \"createDotIndicators\",\n    value: function createDotIndicators(_ref) {\n      var dotLength = _ref.dotLength;\n      var dotFragment = document.createDocumentFragment();\n\n      for (var index = 0; index < dotLength; index++) {\n        var $item = document.createElement('li');\n        $item.dataset.index = index;\n        dotFragment.appendChild($item);\n      }\n\n      var $indicatorWrapper = document.querySelector('.indicator');\n      $indicatorWrapper.appendChild(dotFragment);\n      return $indicatorWrapper.querySelectorAll('li');\n    }\n    /**\n     * イベントハンドラをバインドする\n     */\n\n  }, {\n    key: \"bind\",\n    value: function bind() {\n      var _this = this;\n\n      window.addEventListener('resize', this.adjust.bind(this));\n      this.$previousButton.addEventListener('click', this.previous.bind(this));\n      this.$nextButton.addEventListener('click', this.next.bind(this));\n\n      _toConsumableArray(this.$dotIndicators).forEach(function ($element) {\n        $element.addEventListener('click', _this.handleDotClick.bind(_this));\n      });\n\n      this.$sliderWrapper.addEventListener('touchstart', this.handleTouchStart.bind(this));\n      this.$sliderWrapper.addEventListener('touchmove', this.handleTouchMove.bind(this));\n      this.$sliderWrapper.addEventListener('touchend', this.handleTouchEnd.bind(this));\n    }\n  }, {\n    key: \"adjust\",\n    value: function adjust() {\n      this.slideWidth = outerWidth(this.$slides[0]);\n      this.jump(this.currentSlideIndex);\n    }\n  }, {\n    key: \"next\",\n    value: function next() {\n      var newIndex = this.currentSlideIndex + 1;\n      this.currentSlideIndex = newIndex > this.maxIndex ? 2 : newIndex;\n      this.update(this.currentSlideIndex);\n    }\n  }, {\n    key: \"previous\",\n    value: function previous() {\n      var newIndex = this.currentSlideIndex - 1;\n      this.currentSlideIndex = newIndex < 0 ? this.maxIndex - 2 : newIndex;\n      this.update(this.currentSlideIndex);\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      velocity(this.$sliderList, 'stop', true);\n    }\n  }, {\n    key: \"update\",\n    value: function update(newSlideIndex) {\n      this.updateActiveIndicator(newSlideIndex);\n      this.slide(newSlideIndex);\n      this.lastSlideIndex = newSlideIndex;\n    }\n  }, {\n    key: \"updateActiveIndicator\",\n    value: function updateActiveIndicator(newSlideIndex) {\n      var activeClass = 'current-image-dot';\n      var targetIndex;\n\n      if (newSlideIndex === 0) {\n        targetIndex = this.maxIndex - 2;\n      } else if (newSlideIndex === this.maxIndex) {\n        targetIndex = 0;\n      } else {\n        targetIndex = newSlideIndex - 1;\n      }\n\n      _toConsumableArray(this.$dotIndicators).forEach(function ($dotIndicator, index) {\n        $dotIndicator.classList.remove(activeClass);\n        if (index === targetIndex) $dotIndicator.classList.add(activeClass);\n      });\n    }\n  }, {\n    key: \"slide\",\n    value: function () {\n      var _slide = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(newSlideIndex) {\n        var slideType;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                slideType = this.getSlideType(newSlideIndex);\n\n                if (!(slideType === SLIDE_TYPE.TO_LAST_FROM_FIRST)) {\n                  _context.next = 4;\n                  break;\n                }\n\n                _context.next = 4;\n                return this.jump(this.indexOfLastSlide());\n\n              case 4:\n                if (!(slideType === SLIDE_TYPE.TO_FIRST_FROM_LAST)) {\n                  _context.next = 7;\n                  break;\n                }\n\n                _context.next = 7;\n                return this.jump(this.indexOfFirstSlide());\n\n              case 7:\n                this.currentTranslateX = -(newSlideIndex * this.slideWidth);\n                velocity(this.$sliderList, {\n                  translateX: this.currentTranslateX\n                }, {\n                  duration: 250,\n                  queue: false\n                });\n\n              case 9:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function slide(_x) {\n        return _slide.apply(this, arguments);\n      }\n\n      return slide;\n    }()\n    /**\n     * スライドアニメーションの処理を分岐するためのスライドのタイプを取得する\n     * @param {number} newSlideIndex 更新されたスライドのインデックス\n     * @returns {string} スライドのタイプ\n     *                   SLIDE_TYPE.TO_LAST_FROM_FIRST : 先頭から末尾にスライド\n     *                   SLIDE_TYPE.TO_FIRST_FROM_LAST : 末尾から先頭にスライド\n     *                   SLIDE_TYPE.TO_LEFT_OR_RIGHT   : 左右にスライド\n     */\n\n  }, {\n    key: \"getSlideType\",\n    value: function getSlideType(newSlideIndex) {\n      var shouldGoToLastFromFirst = this.lastSlideIndex === 0 && newSlideIndex === this.maxIndex - 2 && !this.jumpedWhenTouching;\n      var shouldGoToFirstFromLast = this.lastSlideIndex === this.maxIndex && newSlideIndex === 2 && !this.jumpedWhenTouching;\n\n      if (shouldGoToLastFromFirst) {\n        return SLIDE_TYPE.TO_LAST_FROM_FIRST;\n      } else if (shouldGoToFirstFromLast) {\n        return SLIDE_TYPE.TO_FIRST_FROM_LAST;\n      } else {\n        return SLIDE_TYPE.TO_LEFT_OR_RIGHT;\n      }\n    }\n  }, {\n    key: \"jump\",\n    value: function jump(slideIndex) {\n      return velocity(this.$sliderList, {\n        translateX: -(slideIndex * this.slideWidth)\n      }, {\n        duration: 0,\n        queue: false\n      });\n    }\n  }, {\n    key: \"handleDotClick\",\n    value: function handleDotClick(event) {\n      this.currentSlideIndex = Number(event.target.dataset.index);\n      this.update(this.currentSlideIndex);\n    }\n  }, {\n    key: \"handleTouchStart\",\n    value: function handleTouchStart(event) {\n      this.stop();\n      this.touching = true;\n      this.currentTranslateX = Number(velocity.hook(this.$sliderList, 'translateX').replace('px', ''));\n      var startX = event.changedTouches[0].pageX;\n      this.touches.startX = startX;\n      this.touches.currentX = startX;\n    }\n  }, {\n    key: \"handleTouchMove\",\n    value: function () {\n      var _handleTouchMove = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee2(event) {\n        var currentX, translateXWhenTouching;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                if (this.touching) {\n                  _context2.next = 2;\n                  break;\n                }\n\n                return _context2.abrupt(\"return\");\n\n              case 2:\n                currentX = event.changedTouches[0].pageX;\n                this.touches.currentX = currentX;\n                this.diffX = this.touches.currentX - this.touches.startX; // タッチ中のスライドのポジション\n\n                translateXWhenTouching = this.currentTranslateX + this.diffX; // 先頭にクローンしたスライドからクローン元のスライドにジャンプする\n\n                if (!(translateXWhenTouching > 0)) {\n                  _context2.next = 14;\n                  break;\n                }\n\n                this.jumpedWhenTouching = true;\n                this.currentTranslateX = -(this.slideWidth * this.indexOfLastSlide());\n                this.currentSlideIndex = this.indexOfLastSlide();\n                this.touches.startX = currentX;\n                _context2.next = 13;\n                return this.jump(this.currentSlideIndex);\n\n              case 13:\n                return _context2.abrupt(\"return\");\n\n              case 14:\n                if (!(translateXWhenTouching < -(this.slideWidth * this.maxIndex))) {\n                  _context2.next = 22;\n                  break;\n                }\n\n                this.jumpedWhenTouching = true;\n                this.currentTranslateX = -this.slideWidth;\n                this.currentSlideIndex = this.indexOfFirstSlide();\n                this.touches.startX = currentX;\n                _context2.next = 21;\n                return this.jump(this.currentSlideIndex);\n\n              case 21:\n                return _context2.abrupt(\"return\");\n\n              case 22:\n                velocity(this.$sliderList, {\n                  translateX: translateXWhenTouching\n                }, {\n                  duration: 0,\n                  queue: false\n                });\n\n              case 23:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function handleTouchMove(_x2) {\n        return _handleTouchMove.apply(this, arguments);\n      }\n\n      return handleTouchMove;\n    }()\n  }, {\n    key: \"handleTouchEnd\",\n    value: function handleTouchEnd() {\n      this.stop();\n      var threshold = 30;\n\n      if (this.diffX < -threshold) {\n        this.next();\n      } else if (this.diffX > threshold) {\n        this.previous();\n      } else {\n        this.update(this.currentSlideIndex);\n      }\n\n      this.diffX = 0;\n      this.touches.startX = 0;\n      this.touches.currentX = 0;\n      this.touching = false;\n      this.jumpedWhenTouching = false;\n    }\n  }]);\n\n  return _default;\n}();\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! velocity-animate */ \"./node_modules/velocity-animate/velocity.js\")))\n\n//# sourceURL=webpack:///./js/modules/slider.js?");

/***/ })

/******/ });