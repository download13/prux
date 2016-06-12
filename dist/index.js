/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(7).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).setImmediate, __webpack_require__(0).clearImmediate))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(setImmediate) {throw new Error("Cannot find module \"simple-virtual-dom\"");
	/* harmony export */ exports["h"] = h;/* harmony export */ exports["registerComponent"] = registerComponent;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



	function h(name, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_simple_virtual_dom__["el"])(name, props, children);
	}

	function registerComponent(name, spec) {
		var doc = arguments.length <= 2 || arguments[2] === undefined ? document : arguments[2];

		return doc.registerElement(name, {
			prototype: Object.create(HTMLElement.prototype, createComponentPrototype(spec))
		});
	}

	// TODO: Use Shadow DOM if available
	function createComponentPrototype() {
		var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		if (typeof spec === 'function') {
			spec = { render: spec };
		}
		var reduce = spec.reduce || nop;
		var render = spec.render || nop;

		function model(self) {
			var props = self._props;
			var state = self._state;

			return {
				props: props,
				state: state,
				update: function update(type, payload) {
					self._state = reduce(state, { type: type, payload: payload });
					queueRender(self);
				}
			};
		}

		function queueRender(self) {
			if (!self._renderPending) {
				self._renderPending = true;
				doLater(doRender, self);
			}
		}

		function doRender(self) {
			if (!self._renderPending) return;
			var newRender = render(model(self));

			if (self._lastRender) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_simple_virtual_dom__["patch"])(self, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_simple_virtual_dom__["diff"])(self._lastRender, newRender));
				console.log('patch', self._lastRender, newRender);
			} else {
				self.appendChild(newRender.render());
			}

			self._lastRender = newRender;
			self._renderPending = false;
		}

		var elementPrototype = {
			_renderPending: {
				enumerable: false,
				writable: true
			},
			_lastRender: {
				enumerable: false,
				writable: true
			},
			_props: {
				enumerable: false,
				writable: true
			},
			_state: {
				enumerable: false,
				writable: true
			},
			createdCallback: {
				value: function value() {
					this._renderPending = false;
					this._lastRender = null;
					this._props = attributesToProps(this.attributes);
					this._state = reduce(undefined, { type: '_#@init_action' });
					queueRender(this);
				},

				enumerable: false
			},
			attributeChangedCallback: {
				value: function value(name, previousValue, _value) {
					this._props = _extends({}, this._props, _defineProperty({}, name, _value));
					if (spec.onPropsChange) {
						spec.onPropsChange(model(this));
					}
					queueRender(this);
				},

				enumerable: false
			}
		};
		if (spec.onMount) {
			elementPrototype.attachedCallback = {
				value: function value() {
					console.log('onMount', this._props);
					spec.onMount(model(this));
				},

				enumerable: false
			};
		}
		if (spec.onUnmount) {
			elementPrototype.detachedCallback = {
				value: function value() {
					console.log('onUnmount', this);
					spec.onUnmount(model(this));
				},

				enumerable: false
			};
		}

		return elementPrototype;
	}

	function attributesToProps(attributes) {
		var props = {};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var attr = _step.value;

				props[attr.name] = attr.value;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return props;
	}

	function nop() {}

	function doLater(fn) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}

		if (setImmediate) setImmediate.apply(undefined, [fn].concat(args));else setTimeout.apply(undefined, [fn, 0].concat(args));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).setImmediate))

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it don't break things.
	var cachedSetTimeout = setTimeout;
	var cachedClearTimeout = clearTimeout;

	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);