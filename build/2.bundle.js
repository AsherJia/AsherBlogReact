webpackJsonp([2],{

/***/ 749:
/*!*******************************!*\
  !*** ./~/classnames/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },

/***/ 914:
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 915:
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 916:
/*!***********************************************************!*\
  !*** ./src/modules/musicPlayer/container/aplayerPage.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(/*! D:/WebApp/AsherBlogReact/~/react-hot-api/modules/index.js */ 79), RootInstanceProvider = __webpack_require__(/*! D:/WebApp/AsherBlogReact/~/react-hot-loader/RootInstanceProvider.js */ 87), ReactMount = __webpack_require__(/*! react-dom/lib/ReactMount */ 89), React = __webpack_require__(/*! react */ 174); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(/*! react */ 174);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(/*! react-redux */ 561);

	var _redux = __webpack_require__(/*! redux */ 568);

	var _APlayer = __webpack_require__(/*! APlayer */ 917);

	var _APlayer2 = _interopRequireDefault(_APlayer);

	var _classnames = __webpack_require__(/*! classnames */ 749);

	var _classnames2 = _interopRequireDefault(_classnames);

	__webpack_require__(/*! ./aplayerPage.scss */ 918);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// http://aplayer.js.org/docs/
	// https://github.com/DIYgod/APlayer
	var APlayerContainer = function (_Component) {
	    _inherits(APlayerContainer, _Component);

	    function APlayerContainer(props) {
	        _classCallCheck(this, APlayerContainer);

	        var _this = _possibleConstructorReturn(this, (APlayerContainer.__proto__ || Object.getPrototypeOf(APlayerContainer)).call(this, props));

	        _this.componentDidMount = function () {
	            _this.renderAplayerPanel();
	        };

	        _this.renderAplayerPanel = function () {
	            var ap1 = new _APlayer2.default({
	                element: document.getElementById('player1'),
	                narrow: false,
	                autoplay: true,
	                showlrc: false,
	                mutex: true,
	                theme: '#e6d0b2',
	                preload: 'metadata',
	                mode: 'circulation',
	                music: {
	                    title: 'Preparation',
	                    author: 'Hans Zimmer/Richard Harvey',
	                    url: 'http://devtest.qiniudn.com/Preparation.mp3',
	                    pic: 'http://devtest.qiniudn.com/Preparation.jpg'
	                }
	            });

	            ap1.on('play', function () {
	                console.log('play');
	            });
	            ap1.on('play', function () {
	                console.log('play play');
	            });
	            ap1.on('pause', function () {
	                console.log('pause');
	            });
	            ap1.on('canplay', function () {
	                console.log('canplay');
	            });
	            ap1.on('playing', function () {
	                console.log('playing');
	            });
	            ap1.on('ended', function () {
	                console.log('ended');
	            });
	            ap1.on('error', function () {
	                console.log('error');
	            });

	            var ap2 = new _APlayer2.default({
	                element: document.getElementById('player3'),
	                narrow: false,
	                autoplay: false,
	                showlrc: false,
	                mutex: true,
	                theme: '#615754',
	                mode: 'circulation',
	                music: {
	                    title: '回レ！雪月花',
	                    author: '小倉唯',
	                    url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
	                    pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
	                }
	            });
	        };

	        _this.state = {};
	        return _this;
	    }

	    _createClass(APlayerContainer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    'APlayer'
	                ),
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    'Wow, such a beautiful html5 music player'
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'playerWidth' },
	                    _react2.default.createElement('div', { id: 'player1', className: 'aplayer' }),
	                    _react2.default.createElement('div', { id: 'player3', className: 'aplayer' })
	                ),
	                this.props.children
	            );
	        }
	    }]);

	    return APlayerContainer;
	}(_react.Component);

	APlayerContainer.propTypes = {
	    // enableTableSelection: PropTypes.func.isRequired
	};


	var mapStateToProps = function mapStateToProps(state) {
	    return {};
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {};
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(APlayerContainer);

	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(/*! D:/WebApp/AsherBlogReact/~/react-hot-loader/makeExportsHot.js */ 598); if (makeExportsHot(module, __webpack_require__(/*! react */ 174))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "aplayerPage.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../../~/webpack/buildin/module.js */ 4)(module)))

/***/ },

/***/ 917:
/*!***************************************!*\
  !*** ./~/APlayer/dist/APlayer.min.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("APlayer",[],t):"object"==typeof exports?exports.APlayer=t():e.APlayer=t()}(this,function(){return function(e){function t(l){if(a[l])return a[l].exports;var r=a[l]={exports:{},id:l,loaded:!1};return e[l].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){"use strict";function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}();console.log("\n %c APlayer 1.5.8 %c http://aplayer.js.org \n\n","color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;"),a(1);var i=[],n=function(){function e(t){function a(e){for(var t=e.offsetLeft,a=e.offsetParent,l=void 0;null!==a;)t+=a.offsetLeft,a=a.offsetParent;return l=document.body.scrollLeft+document.documentElement.scrollLeft,t-l}function r(e){for(var t=e.offsetTop,a=e.offsetParent,l=void 0;null!==a;)t+=a.offsetTop,a=a.offsetParent;return l=document.body.scrollTop+document.documentElement.scrollTop,t-l}var n=this;l(this,e);var o={play:["0 0 16 31","M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"],pause:["0 0 17 32","M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"],"volume-up":["0 0 28 32","M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z"],"volume-down":["0 0 28 32","M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"],"volume-off":["0 0 28 32","M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"],circulation:["0 0 29 32","M25.6 9.92q1.344 0 2.272 0.928t0.928 2.272v9.28q0 1.28-0.928 2.24t-2.272 0.96h-22.4q-1.28 0-2.24-0.96t-0.96-2.24v-9.28q0-1.344 0.96-2.272t2.24-0.928h8v-3.52l6.4 5.76-6.4 5.76v-3.52h-6.72v6.72h19.84v-6.72h-4.8v-4.48h6.080z"],random:["0 0 33 31","M29.867 9.356l-5.003 5.003c-0.094 0.094-0.235 0.141-0.36 0.141-0.266 0-0.5-0.219-0.5-0.5v-3.002h-4.002c-2.079 0-3.064 1.423-3.94 3.111-0.453 0.875-0.844 1.782-1.219 2.673-1.735 4.033-3.768 8.223-8.849 8.223h-3.502c-0.281 0-0.5-0.219-0.5-0.5v-3.002c0-0.281 0.219-0.5 0.5-0.5h3.502c2.079 0 3.064-1.423 3.94-3.111 0.453-0.875 0.844-1.782 1.219-2.673 1.735-4.033 3.768-8.223 8.849-8.223h4.002v-3.002c0-0.281 0.219-0.5 0.5-0.5 0.141 0 0.266 0.063 0.375 0.156l4.987 4.987c0.094 0.094 0.141 0.235 0.141 0.36s-0.047 0.266-0.141 0.36zM10.262 14.781c-0.907-1.892-1.907-3.783-4.268-3.783h-3.502c-0.281 0-0.5-0.219-0.5-0.5v-3.002c0-0.281 0.219-0.5 0.5-0.5h3.502c2.783 0 4.831 1.298 6.41 3.518-0.876 1.344-1.517 2.798-2.142 4.268zM29.867 23.363l-5.003 5.003c-0.094 0.094-0.235 0.141-0.36 0.141-0.266 0-0.5-0.235-0.5-0.5v-3.002c-4.643 0-7.504 0.547-10.396-3.518 0.86-1.344 1.501-2.798 2.126-4.268 0.907 1.892 1.907 3.783 4.268 3.783h4.002v-3.002c0-0.281 0.219-0.5 0.5-0.5 0.141 0 0.266 0.063 0.375 0.156l4.987 4.987c0.094 0.094 0.141 0.235 0.141 0.36s-0.047 0.266-0.141 0.36z"],order:["0 0 32 32","M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"],single:["0 0 38 32","M2.072 21.577c0.71-0.197 1.125-0.932 0.928-1.641-0.221-0.796-0.333-1.622-0.333-2.457 0-5.049 4.108-9.158 9.158-9.158h5.428c0.056-0.922 0.221-1.816 0.482-2.667h-5.911c-3.158 0-6.128 1.23-8.361 3.463s-3.463 5.203-3.463 8.361c0 1.076 0.145 2.143 0.431 3.171 0.164 0.59 0.7 0.976 1.284 0.976 0.117 0 0.238-0.016 0.357-0.049zM21.394 25.613h-12.409v-2.362c0-0.758-0.528-1.052-1.172-0.652l-5.685 3.522c-0.644 0.4-0.651 1.063-0.014 1.474l5.712 3.69c0.637 0.411 1.158 0.127 1.158-0.63v-2.374h12.409c3.158 0 6.128-1.23 8.361-3.463 1.424-1.424 2.44-3.148 2.99-5.029-0.985 0.368-2.033 0.606-3.125 0.691-1.492 3.038-4.619 5.135-8.226 5.135zM28.718 0c-4.985 0-9.026 4.041-9.026 9.026s4.041 9.026 9.026 9.026 9.026-4.041 9.026-9.026-4.041-9.026-9.026-9.026zM30.392 13.827h-1.728v-6.822c-0.635 0.576-1.433 1.004-2.407 1.285v-1.713c0.473-0.118 0.975-0.325 1.506-0.62 0.532-0.325 0.975-0.665 1.329-1.034h1.3v8.904z"],menu:["0 0 22 32","M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"]};this.getSVG=function(e){return'\n                <svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="'+o[e][0]+'" width="100%">\n                    <use xlink:href="#aplayer-'+e+'"></use>\n                    <path class="aplayer-fill" d="'+o[e][1]+'" id="aplayer-'+e+'"></path>\n                </svg>\n            '},this.isMobile=/mobile/i.test(window.navigator.userAgent),this.isMobile&&(t.autoplay=!1);var s={element:document.getElementsByClassName("aplayer")[0],narrow:!1,autoplay:!1,mutex:!0,showlrc:0,theme:"#b7daff",mode:"circulation"};for(var p in s)s.hasOwnProperty(p)&&!t.hasOwnProperty(p)&&(t[p]=s[p]);if(this.playIndex="[object Array]"===Object.prototype.toString.call(t.music)?0:-1,this.option=t,this.audios=[],this.mode=t.mode,this.secondToTime=function(e){var t=function(e){return e<10?"0"+e:""+e},a=parseInt(e/60),l=parseInt(e-60*a),r=parseInt(a/60),i=parseInt(e/60-60*parseInt(e/60/60));return e>=3600?t(r)+":"+t(i)+":"+t(l):t(a)+":"+t(l)},this.element=this.option.element,2===this.option.showlrc||this.option.showlrc===!0){this.savelrc=[];for(var c=0;c<this.element.getElementsByClassName("aplayer-lrc-content").length;c++)this.savelrc.push(this.element.getElementsByClassName("aplayer-lrc-content")[c].innerHTML)}this.lrcs=[],this.updateBar=function(e,t,a){t=t>0?t:0,t=t<1?t:1,m[e+"Bar"].style[a]=100*t+"%"},this.updateLrc=function(){var e=arguments.length<=0||void 0===arguments[0]?n.audio.currentTime:arguments[0];if(n.lrcIndex>n.lrc.length-1||e<n.lrc[n.lrcIndex][0]||!n.lrc[n.lrcIndex+1]||e>=n.lrc[n.lrcIndex+1][0])for(var t=0;t<n.lrc.length;t++)e>=n.lrc[t][0]&&(!n.lrc[t+1]||e<n.lrc[t+1][0])&&(n.lrcIndex=t,n.lrcContents.style.transform="translateY("+16*-n.lrcIndex+"px)",n.lrcContents.style.webkitTransform="translateY("+16*-n.lrcIndex+"px)",n.lrcContents.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"),n.lrcContents.getElementsByTagName("p")[t].classList.add("aplayer-lrc-current"))};var d=["play","pause","canplay","playing","ended","error"];this.event={};for(var u=0;u<d.length;u++)this.event[d[u]]=[];this.trigger=function(e){for(var t=0;t<n.event[e].length;t++)n.event[e][t]()},this.multiple=this.playIndex>-1,this.music=this.multiple?this.option.music[this.playIndex]:this.option.music,this.option.showlrc&&this.element.classList.add("aplayer-withlrc"),this.option.music.length>1&&this.element.classList.add("aplayer-list"),this.multiple||"circulation"===this.mode||"order"===this.mode||(this.mode="circulation"),this.getRandomOrder();var y='\n            <div class="aplayer-pic" '+(this.music.pic?"style=\"background-image: url('"+this.music.pic+"');\"":"")+'>\n                <div class="aplayer-button aplayer-play">\n                    <button class="aplayer-icon aplayer-icon-play">'+this.getSVG("play")+('     </button>\n                </div>\n            </div>\n            <div class="aplayer-info">\n                <div class="aplayer-music">\n                    <span class="aplayer-title"></span>\n                    <span class="aplayer-author"></span>\n                </div>\n                <div class="aplayer-lrc">\n                    <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n                </div>\n                <div class="aplayer-controller">\n                    <div class="aplayer-bar-wrap">\n                        <div class="aplayer-bar">\n                            <div class="aplayer-loaded" style="width: 0"></div>\n                            <div class="aplayer-played" style="width: 0; background: '+this.option.theme+';">\n                                <span class="aplayer-thumb" style="border: 1px solid '+this.option.theme+';"></span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="aplayer-time">\n                        <span class="aplayer-time-inner">\n                            - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n                        </span>\n                        <div class="aplayer-volume-wrap">\n                            <button class="aplayer-icon aplayer-icon-volume-down" '+(this.isMobile?'style="display: none;"':"")+">")+this.getSVG("volume-down")+('             </button>\n                            <div class="aplayer-volume-bar-wrap">\n                                <div class="aplayer-volume-bar">\n                                    <div class="aplayer-volume" style="height: 80%; background: '+this.option.theme+';"></div>\n                                </div>\n                            </div>\n                        </div>\n                        <button class="aplayer-icon aplayer-icon-mode">')+this.getSVG(this.mode)+("         </button>\n                        "+(this.multiple?'<button class="aplayer-icon aplayer-icon-menu">'+this.getSVG("menu")+"         </button>":"")+"\n                    </div>\n                </div>\n            </div>");if(this.multiple){y+='\n            <div class="aplayer-list" '+(this.option.listmaxheight?'style="max-height: '+this.option.listmaxheight:"")+'">\n                <ol>';for(var h=0;h<this.option.music.length;h++)y+='\n                    <li>\n                        <span class="aplayer-list-cur" style="background: '+this.option.theme+';"></span>\n                        <span class="aplayer-list-index">'+(h+1)+'</span>\n                        <span class="aplayer-list-title">'+this.option.music[h].title+'</span>\n                        <span class="aplayer-list-author">'+this.option.music[h].author+"</span>\n                    </li>";y+="\n                </ol>\n            </div>"}this.element.innerHTML=y,this.element.offsetWidth<300&&(this.element.getElementsByClassName("aplayer-icon-mode")[0].style.display="none"),this.ptime=this.element.getElementsByClassName("aplayer-ptime")[0],this.element.getElementsByClassName("aplayer-info")[0].offsetWidth<200&&this.element.getElementsByClassName("aplayer-time")[0].classList.add("aplayer-time-narrow");var m={};m.barWrap=this.element.getElementsByClassName("aplayer-bar-wrap")[0],this.option.narrow&&this.element.classList.add("aplayer-narrow"),this.button=this.element.getElementsByClassName("aplayer-button")[0],this.button.addEventListener("click",function(e){n.toggle()}),this.multiple&&!function(){for(var e=n.element.getElementsByClassName("aplayer-list")[0].getElementsByTagName("li"),t=function(t){e[t].addEventListener("click",function(){var a=parseInt(e[t].getElementsByClassName("aplayer-list-index")[0].innerHTML)-1;a!==n.playIndex?(n.setMusic(a),n.play()):n.toggle()})},a=0;a<n.option.music.length;a++)t(a)}(),m.playedBar=this.element.getElementsByClassName("aplayer-played")[0],m.loadedBar=this.element.getElementsByClassName("aplayer-loaded")[0];var f=this.element.getElementsByClassName("aplayer-thumb")[0],v=void 0;m.barWrap.addEventListener("click",function(e){var t=e||window.event;v=m.barWrap.clientWidth;var l=(t.clientX-a(m.barWrap))/v;n.updateBar("played",l,"width"),n.element.getElementsByClassName("aplayer-ptime")[0].innerHTML=n.secondToTime(l*n.audio.duration),n.audio.currentTime=parseFloat(m.playedBar.style.width)/100*n.audio.duration}),f.addEventListener("mouseover",function(){f.style.background=n.option.theme}),f.addEventListener("mouseout",function(){f.style.background="#fff"});var g=function(e){var t=e||window.event,l=(t.clientX-a(m.barWrap))/v;l=l>0?l:0,l=l<1?l:1,n.updateBar("played",l,"width"),n.option.showlrc&&n.updateLrc(parseFloat(m.playedBar.style.width)/100*n.audio.duration),n.element.getElementsByClassName("aplayer-ptime")[0].innerHTML=n.secondToTime(l*n.audio.duration)},b=function E(){document.removeEventListener("mouseup",E),document.removeEventListener("mousemove",g),n.audio.currentTime=parseFloat(m.playedBar.style.width)/100*n.audio.duration,n.playedTime=setInterval(function(){n.updateBar("played",n.audio.currentTime/n.audio.duration,"width"),n.option.showlrc&&n.updateLrc(),n.element.getElementsByClassName("aplayer-ptime")[0].innerHTML=n.secondToTime(n.audio.currentTime),n.trigger("playing")},100)};f.addEventListener("mousedown",function(){v=m.barWrap.clientWidth,clearInterval(n.playedTime),document.addEventListener("mousemove",g),document.addEventListener("mouseup",b)}),m.volumeBar=this.element.getElementsByClassName("aplayer-volume")[0];var x=this.element.getElementsByClassName("aplayer-volume-bar")[0];this.volumeicon=this.element.getElementsByClassName("aplayer-time")[0].getElementsByTagName("button")[0];var w=35;this.element.getElementsByClassName("aplayer-volume-bar-wrap")[0].addEventListener("click",function(e){var t=e||window.event,a=(w-t.clientY+r(x))/w;a=a>0?a:0,a=a<1?a:1,n.volume(a)}),this.volumeicon.addEventListener("click",function(){n.audio.muted?(n.audio.muted=!1,n.volumeicon.className=1===n.audio.volume?"aplayer-icon aplayer-icon-volume-up":"aplayer-icon aplayer-icon-volume-down",1===n.audio.volume?(n.volumeicon.className="aplayer-icon aplayer-icon-volume-up",n.volumeicon.innerHTML=n.getSVG("volume-up")):(n.volumeicon.className="aplayer-icon aplayer-icon-volume-down",n.volumeicon.innerHTML=n.getSVG("volume-down")),n.updateBar("volume",n.audio.volume,"height")):(n.audio.muted=!0,n.volumeicon.className="aplayer-icon aplayer-icon-volume-off",n.volumeicon.innerHTML=n.getSVG("volume-off"),n.updateBar("volume",0,"height"))});var A=this.element.getElementsByClassName("aplayer-icon-mode")[0];A.addEventListener("click",function(){n.multiple?"random"===n.mode?n.mode="single":"single"===n.mode?n.mode="order":"order"===n.mode?n.mode="circulation":"circulation"===n.mode&&(n.mode="random"):"circulation"===n.mode?n.mode="order":n.mode="circulation",A.innerHTML=n.getSVG(n.mode),n.audio.loop=!(n.multiple||"order"===n.mode)}),this.multiple&&!function(){var e=n.element.getElementsByClassName("aplayer-list")[0];e.style.height=e.offsetHeight+"px",n.element.getElementsByClassName("aplayer-icon-menu")[0].addEventListener("click",function(){e.classList.contains("aplayer-list-hide")?e.classList.remove("aplayer-list-hide"):e.classList.add("aplayer-list-hide")})}(),"random"===this.mode?this.setMusic(this.randomOrder[0]):this.setMusic(0),i.push(this)}return r(e,[{key:"setMusic",value:function(e){var t=this;this.multiple&&"undefined"!=typeof e&&(this.playIndex=e);var a=this.playIndex;this.music=this.multiple?this.option.music[a]:this.option.music,this.music.pic&&(this.element.getElementsByClassName("aplayer-pic")[0].style.backgroundImage="url('"+this.music.pic+"')"),this.element.getElementsByClassName("aplayer-title")[0].innerHTML=this.music.title,this.element.getElementsByClassName("aplayer-author")[0].innerHTML=" - "+this.music.author,this.multiple&&(this.element.getElementsByClassName("aplayer-list-light")[0]&&this.element.getElementsByClassName("aplayer-list-light")[0].classList.remove("aplayer-list-light"),this.element.getElementsByClassName("aplayer-list")[0].getElementsByTagName("li")[a].classList.add("aplayer-list-light")),this.audio&&(this.pause(),this.audio.currentTime=0),this.multiple&&(this.element.getElementsByClassName("aplayer-list")[0].scrollTop=33*a),this.multiple&&!this.audios[a]||this.playIndex===-1?(this.audio=document.createElement("audio"),this.audio.src=this.music.url,this.audio.preload=this.option.preload?this.option.preload:"auto",this.audio.addEventListener("durationchange",function(){1!==t.audio.duration&&(t.element.getElementsByClassName("aplayer-dtime")[0].innerHTML=t.secondToTime(t.audio.duration))}),this.audio.addEventListener("progress",function(){var e=t.audio.buffered.length?t.audio.buffered.end(t.audio.buffered.length-1)/t.audio.duration:0;t.updateBar("loaded",e,"width")}),this.audio.addEventListener("error",function(){t.element.getElementsByClassName("aplayer-author")[0].innerHTML=" - Error happens ╥﹏╥",t.trigger("pause")}),this.audio.addEventListener("canplay",function(){t.trigger("canplay")}),this.ended=!1,this.multiple?this.audio.addEventListener("ended",function(){return t.isMobile?(t.ended=!0,void t.pause()):void(0!==t.audio.currentTime&&("random"===t.mode?t.setMusic(t.nextRandomNum()):"single"===t.mode?t.setMusic(t.playIndex):"order"===t.mode?t.playIndex<t.option.music.length-1?t.setMusic(++t.playIndex):(t.ended=!0,t.pause(),t.trigger("ended")):"circulation"===t.mode&&(t.playIndex<t.option.music.length-1?t.setMusic(++t.playIndex):t.setMusic(0))))}):this.audio.addEventListener("ended",function(){"order"===t.mode&&(t.ended=!0,t.pause(),t.trigger("ended"))}),this.audio.volume=parseInt(this.element.getElementsByClassName("aplayer-volume")[0].style.height)/100,this.audio.loop=!(this.multiple||"order"===this.mode),this.multiple&&(this.audios[a]=this.audio)):(this.audio=this.audios[a],this.audio.volume=parseInt(this.element.getElementsByClassName("aplayer-volume")[0].style.height)/100,this.audio.currentTime=0);var l=function(e){for(var t=e.split("\n"),a=[],l=t.length,r=0;r<l;r++){var i=t[r].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g),n=t[r].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g,"").replace(/^\s+|\s+$/g,"");if(null!=i)for(var o=i.length,s=0;s<o;s++){var p=/\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(i[s]),c=60*p[1]+parseInt(p[2])+parseInt(p[3])/(2===(p[3]+"").length?100:1e3);a.push([c,n])}}return a.sort(function(e,t){return e[0]-t[0]}),a};this.option.showlrc&&!function(){var e=t.multiple?a:0;t.lrcs[e]||!function(){var a="";1===t.option.showlrc?a=t.multiple?t.option.music[e].lrc:t.option.music.lrc:2===t.option.showlrc||t.option.showlrc===!0?a=t.savelrc[e]:3===t.option.showlrc&&!function(){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4===r.readyState)if(r.status>=200&&r.status<300||304===r.status){a=r.responseText,t.lrcs[e]=l(a),t.lrc=t.lrcs[e];var i="";t.lrcContents=t.element.getElementsByClassName("aplayer-lrc-contents")[0];for(var n=0;n<t.lrc.length;n++)i+="<p>"+t.lrc[n][1]+"</p>";t.lrcContents.innerHTML=i,t.lrcIndex||(t.lrcIndex=0),t.lrcContents.getElementsByTagName("p")[0].classList.add("aplayer-lrc-current"),t.lrcContents.style.transform="translateY(0px)",t.lrcContents.style.webkitTransform="translateY(0px)"}else console.log("Request was unsuccessful: "+r.status)};var i=void 0;i=t.multiple?t.option.music[e].lrc:t.option.music.lrc,r.open("get",i,!0),r.send(null)}(),a?t.lrcs[e]=l(a):t.lrcs[e]=[["00:00","Loading"]]}(),t.lrc=t.lrcs[e];var r="";t.lrcContents=t.element.getElementsByClassName("aplayer-lrc-contents")[0];for(var i=0;i<t.lrc.length;i++)r+="<p>"+t.lrc[i][1]+"</p>";t.lrcContents.innerHTML=r,t.lrcIndex||(t.lrcIndex=0),t.lrcContents.getElementsByTagName("p")[0].classList.add("aplayer-lrc-current"),t.lrcContents.style.transform="translateY(0px)",t.lrcContents.style.webkitTransform="translateY(0px)"}(),1!==this.audio.duration&&(this.element.getElementsByClassName("aplayer-dtime")[0].innerHTML=this.audio.duration?this.secondToTime(this.audio.duration):"00:00"),this.option.autoplay&&!this.isMobile&&this.play(),this.option.autoplay=!0,this.isMobile&&this.pause()}},{key:"play",value:function(e){var t=this;if("[object Number]"===Object.prototype.toString.call(e)&&(this.audio.currentTime=e),this.button.classList.contains("aplayer-play")){if(this.button.classList.remove("aplayer-play"),this.button.classList.add("aplayer-pause"),this.button.innerHTML="",setTimeout(function(){t.button.innerHTML='\n                            <button class="aplayer-icon aplayer-icon-pause">'+t.getSVG("pause")+"     </button>"},100),this.option.mutex)for(var a=0;a<i.length;a++)this!=i[a]&&i[a].pause();this.audio.play(),this.playedTime&&clearInterval(this.playedTime),this.playedTime=setInterval(function(){t.updateBar("played",t.audio.currentTime/t.audio.duration,"width"),t.option.showlrc&&t.updateLrc(),t.ptime.innerHTML=t.secondToTime(t.audio.currentTime),t.trigger("playing")},100),this.trigger("play")}}},{key:"pause",value:function(){var e=this;(this.button.classList.contains("aplayer-pause")||this.ended)&&(this.ended=!1,this.button.classList.remove("aplayer-pause"),this.button.classList.add("aplayer-play"),this.button.innerHTML="",setTimeout(function(){e.button.innerHTML='\n                            <button class="aplayer-icon aplayer-icon-play">'+e.getSVG("play")+"     </button>"},100),this.audio.pause(),clearInterval(this.playedTime),this.trigger("pause"))}},{key:"volume",value:function(e){this.updateBar("volume",e,"height"),this.audio.volume=e,this.audio.muted&&(this.audio.muted=!1),1===e?(this.volumeicon.className="aplayer-icon aplayer-icon-volume-up",this.volumeicon.innerHTML=this.getSVG("volume-up")):(this.volumeicon.className="aplayer-icon aplayer-icon-volume-down",this.volumeicon.innerHTML=this.getSVG("volume-down"))}},{key:"on",value:function(e,t){"function"==typeof t&&this.event[e].push(t)}},{key:"toggle",value:function(){this.button.classList.contains("aplayer-play")?this.play():this.button.classList.contains("aplayer-pause")&&this.pause()}},{key:"getRandomOrder",value:function(){function e(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))}function t(t){for(var a,l=t.length,r=new Array(l),i=0;i<l;i++)a=e(0,i),a!==i&&(r[i]=r[a]),r[a]=t[i];return r}if(this.multiple){if(!this.normalOrder){this.normalOrder=[];for(var a=0;a<this.option.music.length;a++)this.normalOrder[a]=a}this.randomOrder=t(this.normalOrder)}}},{key:"nextRandomNum",value:function(){if(this.multiple){var e=this.randomOrder.indexOf(this.playIndex);return e===this.randomOrder.length-1?this.randomOrder[0]:this.randomOrder[e+1]}return 0}}]),e}();e.exports=n},function(e,t,a){var l=a(2);"string"==typeof l&&(l=[[e.id,l,""]]);a(5)(l,{});l.locals&&(e.exports=l.locals)},function(e,t,a){t=e.exports=a(3)(),t.push([e.id,".aplayer-narrow{width:66px}.aplayer-narrow .aplayer-info{display:none}.aplayer-withlrc.aplayer-narrow{width:90px}.aplayer-withlrc.aplayer .aplayer-pic{height:90px;width:90px}.aplayer-withlrc.aplayer .aplayer-info{margin-left:90px;height:90px}.aplayer-withlrc.aplayer .aplayer-lrc{display:block}.aplayer-withlrc.aplayer .aplayer-info{padding:10px 7px 0}.aplayer-list.aplayer .aplayer-info{border-bottom:1px solid #e9e9e9}.aplayer{font-family:Arial,Helvetica,sans-serif;margin:5px;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);border-radius:2px;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:normal}.aplayer *{box-sizing:content-box}.aplayer .aplayer-icon{width:15px;height:15px;border:none;background-color:transparent;outline:none;cursor:pointer;opacity:.8;vertical-align:middle;padding:0;font-size:12px;margin:0;display:inline}.aplayer .aplayer-icon .aplayer-fill{-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.aplayer .aplayer-lrc-content{display:none}.aplayer .aplayer-pic{position:relative;float:left;height:66px;width:66px;background-image:url("+a(4)+");background-size:100%;-webkit-transition:all .3s ease;transition:all .3s ease}.aplayer .aplayer-pic .aplayer-button{position:absolute;border-radius:50%;opacity:.8;cursor:pointer;text-shadow:0 1px 1px rgba(0,0,0,.2);box-shadow:0 1px 1px rgba(0,0,0,.2);background:rgba(0,0,0,.2);-webkit-transition:all .1s ease;transition:all .1s ease}.aplayer .aplayer-pic .aplayer-button:hover{opacity:1}.aplayer .aplayer-pic .aplayer-button .aplayer-fill{fill:#fff}.aplayer .aplayer-pic .aplayer-hide{display:none}.aplayer .aplayer-pic .aplayer-play{width:26px;height:26px;border:2px solid #fff;bottom:50%;right:50%;margin:0 -15px -15px 0}.aplayer .aplayer-pic .aplayer-play .aplayer-icon-play{position:absolute;top:3px;left:4px;height:20px;width:20px}.aplayer .aplayer-pic .aplayer-pause{width:16px;height:16px;border:2px solid #fff;bottom:4px;right:4px}.aplayer .aplayer-pic .aplayer-pause .aplayer-icon-pause{position:absolute;top:2px;left:2px;height:12px;width:12px}.aplayer .aplayer-info{margin-left:66px;padding:14px 7px 0 10px;height:66px;box-sizing:border-box}.aplayer .aplayer-info .aplayer-music{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0 0 13px 5px;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;cursor:default;padding-bottom:2px}.aplayer .aplayer-info .aplayer-music .aplayer-title{font-size:14px}.aplayer .aplayer-info .aplayer-music .aplayer-author{font-size:12px;color:#666}.aplayer .aplayer-info .aplayer-controller{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap{margin:0 0 0 5px;padding:4px 0;cursor:pointer!important;-webkit-box-flex:1;-ms-flex:1;flex:1}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar{position:relative;height:2px;width:100%;background:#cdcdcd}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-loaded{position:absolute;left:0;top:0;bottom:0;background:#aaa;height:2px;-webkit-transition:all .5s ease;transition:all .5s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played{position:absolute;left:0;top:0;bottom:0;height:2px}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb{position:absolute;top:0;right:5px;margin-top:-4px;margin-right:-10px;height:8px;width:8px;border-radius:50%;background:#fff;cursor:pointer!important}.aplayer .aplayer-info .aplayer-controller .aplayer-time{position:relative;right:0;bottom:3px;height:17px;color:#999;font-size:11px;padding-left:7px}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-time-inner{vertical-align:middle}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon{cursor:pointer;-webkit-transition:all .2s ease;transition:all .2s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon .aplayer-fill{fill:#666}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-mode{margin-right:4px}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon:hover .aplayer-fill{fill:#000}.aplayer .aplayer-info .aplayer-controller .aplayer-time.aplayer-time-narrow .aplayer-icon-menu,.aplayer .aplayer-info .aplayer-controller .aplayer-time.aplayer-time-narrow .aplayer-icon-mode{display:none}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap{position:relative;display:inline-block;margin-left:3px;cursor:pointer!important}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap:hover .aplayer-volume-bar-wrap{display:block}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap{display:none;position:absolute;bottom:15px;right:-3px;width:25px;height:40px;z-index:99}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap .aplayer-volume-bar{position:absolute;bottom:0;right:10px;width:5px;height:35px;background:#aaa}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap .aplayer-volume-bar .aplayer-volume{position:absolute;bottom:0;right:0;width:5px;-webkit-transition:all .1s ease;transition:all .1s ease}.aplayer .aplayer-lrc{display:none;position:relative;height:30px;background:#fff;text-align:center;overflow:hidden;margin:-10px 0 7px}.aplayer .aplayer-lrc:before{top:0;height:10%;background:-webkit-linear-gradient(top,#fff,hsla(0,0%,100%,0));background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(hsla(0,0%,100%,0)));background:linear-gradient(180deg,#fff 0,hsla(0,0%,100%,0));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff',endColorstr='#00ffffff',GradientType=0)}.aplayer .aplayer-lrc:after,.aplayer .aplayer-lrc:before{position:absolute;z-index:1;display:block;overflow:hidden;width:100%;content:' '}.aplayer .aplayer-lrc:after{bottom:0;height:33%;background:-webkit-linear-gradient(top,hsla(0,0%,100%,0),hsla(0,0%,100%,.8));background:-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,0)),to(hsla(0,0%,100%,.8)));background:linear-gradient(180deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.8));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff',endColorstr='#ccffffff',GradientType=0)}.aplayer .aplayer-lrc p{font-size:12px;color:#666;line-height:16px!important;height:16px!important;padding:0!important;margin:0!important;-webkit-transition:all .5s ease-out;transition:all .5s ease-out;opacity:.4;overflow:hidden}.aplayer .aplayer-lrc p.aplayer-lrc-current{opacity:1}.aplayer .aplayer-lrc .aplayer-lrc-contents{width:100%;-webkit-transition:all .5s ease-out;transition:all .5s ease-out;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;cursor:default}.aplayer .aplayer-list{overflow:auto;-webkit-transition:all .5s ease;transition:all .5s ease;will-change:height}.aplayer .aplayer-list.aplayer-list-hide{height:0!important}.aplayer .aplayer-list::-webkit-scrollbar{width:5px}.aplayer .aplayer-list::-webkit-scrollbar-track{background-color:#f9f9f9}.aplayer .aplayer-list::-webkit-scrollbar-thumb{border-radius:3px;background-color:#eee}.aplayer .aplayer-list::-webkit-scrollbar-thumb:hover{background-color:#ccc}.aplayer .aplayer-list ol{list-style-type:none;margin:0;padding:0}.aplayer .aplayer-list ol li{position:relative;height:32px;line-height:32px;padding:0 15px;font-size:12px;border-top:1px solid #e9e9e9;cursor:pointer;-webkit-transition:all .2s ease;transition:all .2s ease;overflow:hidden}.aplayer .aplayer-list ol li:first-child{border-top:none}.aplayer .aplayer-list ol li:hover{background:#efefef}.aplayer .aplayer-list ol li.aplayer-list-light{background:#e9e9e9}.aplayer .aplayer-list ol li.aplayer-list-light .aplayer-list-cur{display:inline-block}.aplayer .aplayer-list ol li .aplayer-list-cur{display:none;width:3px;height:22px;position:absolute;left:0;top:5px;cursor:pointer}.aplayer .aplayer-list ol li .aplayer-list-index{color:#666;margin-right:12px;cursor:pointer}.aplayer .aplayer-list ol li .aplayer-list-author{color:#666;float:right;cursor:pointer}@-webkit-keyframes aplayer-roll{0%{left:0}to{left:-100%}}@keyframes aplayer-roll{0%{left:0}to{left:-100%}}",""]);
	},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var a=this[t];a[2]?e.push("@media "+a[2]+"{"+a[1]+"}"):e.push(a[1])}return e.join("")},e.i=function(t,a){"string"==typeof t&&(t=[[null,t,""]]);for(var l={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(l[i]=!0)}for(r=0;r<t.length;r++){var n=t[r];"number"==typeof n[0]&&l[n[0]]||(a&&!n[2]?n[2]=a:a&&(n[2]="("+n[2]+") and ("+a+")"),e.push(n))}},e}},function(e,t){e.exports="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE2NjQ3NUZBM0Y4RDExRTY4NzJCRDdCNkZCQTQ0MjNBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2NjQ3NUY5M0Y4RDExRTY4NzJCRDdCNkZCQTQ0MjNBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSI5OENEMEFFRjM0NTI1NjE0NEREQkU4RjkxRjAwNjM3NiIgc3RSZWY6ZG9jdW1lbnRJRD0iOThDRDBBRUYzNDUyNTYxNDREREJFOEY5MUYwMDYzNzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhca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"},function(e,t,a){function l(e,t){for(var a=0;a<e.length;a++){var l=e[a],r=y[l.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](l.parts[i]);for(;i<l.parts.length;i++)r.parts.push(p(l.parts[i],t))}else{for(var n=[],i=0;i<l.parts.length;i++)n.push(p(l.parts[i],t));y[l.id]={id:l.id,refs:1,parts:n}}}}function r(e){for(var t=[],a={},l=0;l<e.length;l++){var r=e[l],i=r[0],n=r[1],o=r[2],s=r[3],p={css:n,media:o,sourceMap:s};a[i]?a[i].parts.push(p):t.push(a[i]={id:i,parts:[p]})}return t}function i(e,t){var a=f(),l=b[b.length-1];if("top"===e.insertAt)l?l.nextSibling?a.insertBefore(t,l.nextSibling):a.appendChild(t):a.insertBefore(t,a.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");a.appendChild(t)}}function n(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function o(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function s(e){var t=document.createElement("link");return t.rel="stylesheet",i(e,t),t}function p(e,t){var a,l,r;if(t.singleton){var i=g++;a=v||(v=o(t)),l=c.bind(null,a,i,!1),r=c.bind(null,a,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(a=s(t),l=u.bind(null,a),r=function(){n(a),a.href&&URL.revokeObjectURL(a.href)}):(a=o(t),l=d.bind(null,a),r=function(){n(a)});return l(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;l(e=t)}else r()}}function c(e,t,a,l){var r=a?"":l.css;if(e.styleSheet)e.styleSheet.cssText=x(t,r);else{var i=document.createTextNode(r),n=e.childNodes;n[t]&&e.removeChild(n[t]),n.length?e.insertBefore(i,n[t]):e.appendChild(i)}}function d(e,t){var a=t.css,l=t.media;if(l&&e.setAttribute("media",l),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}function u(e,t){var a=t.css,l=t.sourceMap;l&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(l))))+" */");var r=new Blob([a],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(r),i&&URL.revokeObjectURL(i)}var y={},h=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=h(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=h(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,g=0,b=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var a=r(e);return l(a,t),function(e){for(var i=[],n=0;n<a.length;n++){var o=a[n],s=y[o.id];s.refs--,i.push(s)}if(e){var p=r(e);l(p,t)}for(var n=0;n<i.length;n++){var s=i[n];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete y[s.id]}}}};var x=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}()}])});
	//# sourceMappingURL=APlayer.min.js.map

/***/ },

/***/ 918:
/*!************************************************************!*\
  !*** ./src/modules/musicPlayer/container/aplayerPage.scss ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/sass-loader!./aplayerPage.scss */ 919);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../../../~/style-loader/addStyles.js */ 915)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(/*! !./../../../../~/css-loader!./../../../../~/sass-loader!./aplayerPage.scss */ 919, function() {
				var newContent = __webpack_require__(/*! !./../../../../~/css-loader!./../../../../~/sass-loader!./aplayerPage.scss */ 919);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 919:
/*!*******************************************************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./src/modules/musicPlayer/container/aplayerPage.scss ***!
  \*******************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../../../~/css-loader/lib/css-base.js */ 914)();
	// imports


	// module
	exports.push([module.id, ".playerWidth {\n  width: 500px; }\n", ""]);

	// exports


/***/ }

});