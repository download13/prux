module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(9).nextTick;
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	var types_1 = __webpack_require__(2);
	function h(name, props) {
	    var children = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        children[_i - 2] = arguments[_i];
	    }
	    return {
	        type: 'element',
	        name: name,
	        props: normalizeProps(props),
	        children: normalizeChildren(children)
	    };
	}
	exports.h = h;
	function normalizeProps(props) {
	    if (props === void 0) { props = {}; }
	    var r = {};
	    for (var k in props) {
	        r[normalizePropName(k)] = props[k];
	    }
	    return r;
	}
	var onRegex = /^on[A-Z]+/;
	function normalizePropName(name) {
	    if (name === 'className') {
	        return 'class';
	    }
	    if (onRegex.test(name)) {
	        return name.toLowerCase();
	    }
	    return name;
	}
	function normalizeChildren(children) {
	    return children
	        .filter(nonNull)
	        .map(normalizeChild);
	}
	exports.normalizeChildren = normalizeChildren;
	function normalizeChild(child, i) {
	    if (typeof child === 'string') {
	        return {
	            type: 'text',
	            text: child,
	            index: i
	        };
	    }
	    if (types_1.isVNode(child)) {
	        child.index = i;
	        return child;
	    }
	    return normalizeChild(child.toString(), i);
	}
	function nonNull(a) {
	    return a != null;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	function isVTextNode(a) {
	    return a.type === 'text';
	}
	exports.isVTextNode = isVTextNode;
	function isVElement(a) {
	    return a.type === 'element';
	}
	exports.isVElement = isVElement;
	function isVNode(a) {
	    return a && a.type && (isVElement(a) || isVTextNode(a));
	}
	exports.isVNode = isVNode;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	function nop(){}

	module.exports = nop;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var global = (function(){return this}());
	module.exports = function () {
	  global.setImmediate = global.setImmediate || function () {
	    var args = [].slice.apply(arguments);
	    args.splice(1, 0, 0)
	    setTimeout.apply(null, args)
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	var update_dom_1 = __webpack_require__(10);
	exports.updateChildren = update_dom_1.updateChildren;
	var h_1 = __webpack_require__(1);
	exports.h = h_1.h;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_setimmediate_min___default = __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__ && __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_setimmediate_min__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_setimmediate_min___default, 'a', __WEBPACK_IMPORTED_MODULE_0_setimmediate_min___default);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nop__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nop___default = __WEBPACK_IMPORTED_MODULE_1_nop__ && __WEBPACK_IMPORTED_MODULE_1_nop__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_nop__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_nop__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_nop___default, 'a', __WEBPACK_IMPORTED_MODULE_1_nop___default);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_update_element_children__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_update_element_children___default = __WEBPACK_IMPORTED_MODULE_2_update_element_children__ && __WEBPACK_IMPORTED_MODULE_2_update_element_children__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_update_element_children__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_update_element_children__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_update_element_children___default, 'a', __WEBPACK_IMPORTED_MODULE_2_update_element_children___default);
	/* harmony export */ exports["registerComponent"] = registerComponent;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





	function registerComponent(name) {
		var spec = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
		var doc = arguments.length <= 2 || arguments[2] === undefined ? document : arguments[2];

		if (typeof spec === 'function') {
			spec = { render: spec };
		}

		var componentProto = createComponentPrototype({
			render: spec.render || __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
			reduce: spec.reduce || __WEBPACK_IMPORTED_MODULE_1_nop___default.a,
			onMount: spec.onMount,
			onUnmount: spec.onUnmount,
			onPropChange: spec.onPropChange
		});
		var elementProto = Object.assign(Object.create(HTMLElement.prototype), componentProto);

		return doc.registerElement(name, { prototype: elementProto });
	}

	// TODO: Use Shadow DOM if available
	function createComponentPrototype(spec) {
		function queueRender(element) {
			var c = element._component;

			if (!c.renderPending) {
				c.renderPending = true;
				setImmediate(function () {
					return doRender(element);
				});
			}
		}

		function doRender(element) {
			var c = element._component;
			if (!c.renderPending) return;

			var render = spec.render;

			var currentRender = render(createModel(element));

			// console.log('updateChildren', c.previousRender, currentRender);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_update_element_children__["updateChildren"])(element, c.previousRender, currentRender);

			c.previousRender = currentRender;
			c.renderPending = false;
		}

		function createModel(element) {
			var c = element._component;
			var reduce = spec.reduce;


			return {
				root: element,
				props: c.props,
				state: c.state,
				update: function update(type, payload) {
					c.state = reduce(c.state, { type: type, payload: payload });
					queueRender(element);
					return c.state;
				},
				h: __WEBPACK_IMPORTED_MODULE_2_update_element_children__["h"]
			};
		}

		var proto = {
			createdCallback: function createdCallback() {
				var reduce = spec.reduce;


				this._component = {
					renderPending: false,
					previousRender: null,
					props: attributesToProps(this.attributes),
					state: reduce(undefined, { type: '_#@init_action' })
				};

				queueRender(this);
			},
			attributeChangedCallback: function attributeChangedCallback(name, previousValue, value) {
				var c = this._component;
				var onPropChange = spec.onPropChange;


				c.props = _extends({}, c.props, _defineProperty({}, name, value));

				if (onPropChange) {
					onPropChange(createModel(this), name, previousValue, value);
				}

				queueRender(this);
			}
		};

		if (spec.onMount) {
			proto.attachedCallback = function () {
				spec.onMount(createModel(this));
			};
		}

		if (spec.onUnmount) {
			proto.detachedCallback = function () {
				spec.onUnmount(createModel(this));
			};
		}

		return proto;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).setImmediate))

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Use typed arrays if we can
	 */

	var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;

	/**
	 * Bit vector
	 */

	function createBv(sizeInBits) {
	  return new FastArray(Math.ceil(sizeInBits / 32));
	}

	function setBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  v[pos] |= 1 << r;
	}

	function clearBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  v[pos] &= ~(1 << r);
	}

	function getBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  return !!(v[pos] & 1 << r);
	}

	/**
	 * Exports
	 */

	exports.createBv = createBv;
	exports.setBit = setBit;
	exports.clearBit = clearBit;
	exports.getBit = getBit;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

	var _bitVector = __webpack_require__(7);

	/**
	 * Actions
	 */

	var CREATE = 0; /**
	                 * Imports
	                 */

	var UPDATE = 1;
	var MOVE = 2;
	var REMOVE = 3;

	/**
	 * dift
	 */

	function dift(prev, next, effect, key) {
	  var pStartIdx = 0;
	  var nStartIdx = 0;
	  var pEndIdx = prev.length - 1;
	  var nEndIdx = next.length - 1;
	  var pStartItem = prev[pStartIdx];
	  var nStartItem = next[nStartIdx];

	  // List head is the same
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
	    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
	    pStartItem = prev[++pStartIdx];
	    nStartItem = next[++nStartIdx];
	  }

	  // The above case is orders of magnitude more common than the others, so fast-path it
	  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
	    return;
	  }

	  var pEndItem = prev[pEndIdx];
	  var nEndItem = next[nEndIdx];
	  var movedFromFront = 0;

	  // Reversed
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
	    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
	    pStartItem = prev[++pStartIdx];
	    nEndItem = next[--nEndIdx];
	    ++movedFromFront;
	  }

	  // Reversed the other way (in case of e.g. reverse and append)
	  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
	    effect(MOVE, pEndItem, nStartItem, nStartIdx);
	    pEndItem = prev[--pEndIdx];
	    nStartItem = next[++nStartIdx];
	    --movedFromFront;
	  }

	  // List tail is the same
	  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
	    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
	    pEndItem = prev[--pEndIdx];
	    nEndItem = next[--nEndIdx];
	  }

	  if (pStartIdx > pEndIdx) {
	    while (nStartIdx <= nEndIdx) {
	      effect(CREATE, null, nStartItem, nStartIdx);
	      nStartItem = next[++nStartIdx];
	    }

	    return;
	  }

	  if (nStartIdx > nEndIdx) {
	    while (pStartIdx <= pEndIdx) {
	      effect(REMOVE, pStartItem);
	      pStartItem = prev[++pStartIdx];
	    }

	    return;
	  }

	  var created = 0;
	  var pivotDest = null;
	  var pivotIdx = pStartIdx - movedFromFront;
	  var keepBase = pStartIdx;
	  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);

	  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);

	  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
	    var oldIdx = prevMap[key(nStartItem)];

	    if (isUndefined(oldIdx)) {
	      effect(CREATE, null, nStartItem, pivotIdx++);
	      ++created;
	    } else if (pStartIdx !== oldIdx) {
	      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
	      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
	    } else {
	      pivotDest = nStartIdx;
	    }
	  }

	  if (pivotDest !== null) {
	    (0, _bitVector.setBit)(keep, 0);
	    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
	  }

	  // If there are no creations, then you have to
	  // remove exactly max(prevLen - nextLen, 0) elements in this
	  // diff. You have to remove one more for each element
	  // that was created. This means once we have
	  // removed that many, we can stop.
	  var necessaryRemovals = prev.length - next.length + created;
	  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
	    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
	      effect(REMOVE, pStartItem);
	      ++removals;
	    }
	  }

	  function equal(a, b) {
	    return key(a) === key(b);
	  }
	}

	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	function keyMap(items, start, end, key) {
	  var map = {};

	  for (var i = start; i < end; ++i) {
	    map[key(items[i])] = i;
	  }

	  return map;
	}

	/**
	 * Exports
	 */

	exports.default = dift;
	exports.CREATE = CREATE;
	exports.UPDATE = UPDATE;
	exports.MOVE = MOVE;
	exports.REMOVE = REMOVE;

/***/ },
/* 9 */
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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	var dift_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(11);
	var h_1 = __webpack_require__(1);
	var types_1 = __webpack_require__(2);
	function updateChildren(parentNode, oldChildren, newChildren) {
	    var oldVNodes = h_1.normalizeChildren(util_1.ensureArray(oldChildren));
	    var newVNodes = h_1.normalizeChildren(util_1.ensureArray(newChildren));
	    updateChildrenInternal(parentNode, oldVNodes, newVNodes);
	}
	exports.updateChildren = updateChildren;
	function updateChildrenInternal(parentNode, oldChildren, newChildren) {
	    dift_1.default(oldChildren, newChildren, function (editType, old, next, index) {
	        repositionNode(parentNode, editType, old, next, index);
	    }, getKey);
	}
	function getKey(item) {
	    if (types_1.isVElement(item)) {
	        var key = item.props['key'];
	        if (typeof key === 'string')
	            return key;
	        return item.name + '_' + item.index.toString();
	    }
	    return '#text_' + item.index.toString();
	}
	function repositionNode(parentNode, editType, oldVNode, newVNode, index) {
	    var indexNode = parentNode.childNodes[index] || null;
	    switch (editType) {
	        case dift_1.CREATE:
	            parentNode.insertBefore(createDomNode(newVNode), indexNode);
	            break;
	        case dift_1.UPDATE:
	            updateNode(indexNode, oldVNode, newVNode);
	            break;
	        case dift_1.MOVE:
	            var oldNodeMove = parentNode.childNodes[oldVNode.index];
	            parentNode.insertBefore(updateNode(oldNodeMove, oldVNode, newVNode), indexNode);
	            break;
	        case dift_1.REMOVE:
	            var oldNodeRemove = parentNode.childNodes[oldVNode.index];
	            parentNode.removeChild(oldNodeRemove);
	            break;
	    }
	}
	function updateNode(oldNode, oldVNode, newVNode) {
	    if (oldNode instanceof Text && types_1.isVTextNode(newVNode)) {
	        return updateText(oldNode, newVNode);
	    }
	    if (oldNode instanceof HTMLElement && types_1.isVElement(oldVNode) && types_1.isVElement(newVNode)) {
	        return updateElement(oldNode, oldVNode, newVNode);
	    }
	    console.error('updateNode error', oldNode, oldVNode, newVNode);
	    throw new Error('This should never happen');
	}
	function updateText(oldNode, newVNode) {
	    oldNode.textContent = newVNode.text;
	    return oldNode;
	}
	function updateElement(oldNode, oldVNode, newVNode) {
	    updateProps(oldNode, oldVNode.props, newVNode.props);
	    updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
	    return oldNode;
	}
	function updateProps(element, oldPropsArg, newPropsArg) {
	    var oldProps = util_1.clone(oldPropsArg);
	    var newProps = util_1.clone(newPropsArg);
	    for (var name_1 in newProps) {
	        if (newProps[name_1] !== oldProps[name_1]) {
	            addProp(element, name_1, newProps[name_1]);
	        }
	        delete oldProps[name_1];
	    }
	    for (var name_2 in oldProps) {
	        removeProp(element, name_2);
	    }
	}
	exports.updateProps = updateProps;
	function addProp(element, name, value) {
	    if (name in element) {
	        element[name] = value;
	    }
	    else {
	        element.setAttribute(name, value);
	    }
	}
	function removeProp(element, name) {
	    if (name in element) {
	        if (typeof element[name] === 'string') {
	            element[name] = '';
	        }
	        else {
	            element[name] = undefined;
	        }
	    }
	    else {
	        element.removeAttribute(name);
	    }
	}
	function createDomNode(vnode, doc) {
	    if (doc === void 0) { doc = document; }
	    if (types_1.isVTextNode(vnode)) {
	        return doc.createTextNode(vnode.text);
	    }
	    var element = doc.createElement(vnode.name);
	    updateProps(element, {}, vnode.props);
	    vnode.children
	        .map(function (vnode) { return createDomNode(vnode); })
	        .forEach(function (node) { return element.appendChild(node); });
	    return element;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	function ensureArray(a) {
	    if (Array.isArray(a))
	        return a;
	    if (a)
	        return [a];
	    return [];
	}
	exports.ensureArray = ensureArray;
	function clone(a) {
	    var r = {};
	    for (var key in a) {
	        r[key] = a[key];
	    }
	    return r;
	}
	exports.clone = clone;


/***/ }
/******/ ]);