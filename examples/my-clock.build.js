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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/***/ function(module, exports) {

	"use strict";
	"use strict";
	function h(name, props) {
	    var children = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        children[_i - 2] = arguments[_i];
	    }
	    return {
	        type: 'element',
	        name: name,
	        props: props || {},
	        children: children
	            .filter(truthy)
	            .map(childToVNode)
	    };
	}
	exports.h = h;
	function sanitizeChildren(children) {
	    return children
	        .filter(truthy)
	        .map(childToVNode);
	}
	exports.sanitizeChildren = sanitizeChildren;
	function childToVNode(child, i) {
	    if (typeof child === 'string') {
	        return {
	            type: 'text',
	            text: child,
	            index: i
	        };
	    }
	    child.index = i;
	    return child;
	}
	function truthy(a) {
	    return !!a;
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(setImmediate) {"use strict";

	var __extends = this && this.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var update_element_children_1 = __webpack_require__(10);
	var assign = __webpack_require__(8);
	function registerComponent(name, spec, doc) {
	    if (spec === void 0) {
	        spec = {};
	    }
	    if (doc === void 0) {
	        doc = document;
	    }
	    if (typeof spec === 'function') {
	        spec = { render: spec };
	    }
	    return doc.registerElement(name, {
	        prototype: createComponentPrototype({
	            render: spec.render || nop,
	            reduce: spec.reduce || nop,
	            onMount: spec.onMount || nop,
	            onUnmount: spec.onUnmount || nop,
	            onPropChange: spec.onPropChange || nop
	        })
	    });
	}
	exports.registerComponent = registerComponent;
	function createComponentPrototype(spec) {
	    var proto = assign({}, HTMLComponent.prototype);
	    proto._spec = spec;
	    return proto;
	}
	var HTMLComponent = function (_super) {
	    __extends(HTMLComponent, _super);
	    function HTMLComponent() {
	        _super.apply(this, arguments);
	    }
	    HTMLComponent.prototype.createdCallback = function () {
	        window.d = this;
	        var reduce = this._spec.reduce;
	        this._doRender = this._doRender.bind(this);
	        this._component = {
	            renderPending: false,
	            previousRender: null,
	            props: attributesToProps(this.attributes),
	            state: reduce(undefined, { type: '_#@init_action' })
	        };
	        this._queueRender();
	    };
	    HTMLComponent.prototype.attributeChangedCallback = function (name, previousValue, value) {
	        var c = this._component;
	        var onPropChange = this._spec.onPropChange;
	        c.props = assign({}, c.props, (_a = {}, _a[name] = value, _a));
	        onPropChange(this._createModel(), name, previousValue, value);
	        this._queueRender();
	        var _a;
	    };
	    HTMLComponent.prototype.attachedCallback = function () {
	        var c = this._component;
	        var onMount = this._spec.onMount;
	        onMount(this._createModel());
	    };
	    HTMLComponent.prototype.detachedCallback = function () {
	        var c = this._component;
	        var onUnmount = this._spec.onUnmount;
	        onUnmount(this._createModel());
	    };
	    HTMLComponent.prototype._queueRender = function () {
	        var c = this._component;
	        if (!c.renderPending) {
	            c.renderPending = true;
	            doLater(this._doRender);
	        }
	    };
	    HTMLComponent.prototype._doRender = function () {
	        var c = this._component;
	        if (!c.renderPending) return;
	        var render = this._spec.render;
	        var currentRender = render(this._createRenderModel());
	        console.log('updateChildren', c.previousRender, currentRender);
	        update_element_children_1.updateChildren(this, c.previousRender, currentRender);
	        c.previousRender = currentRender;
	        c.renderPending = false;
	    };
	    HTMLComponent.prototype._createModel = function () {
	        var _this = this;
	        var c = this._component;
	        var reduce = this._spec.reduce;
	        return {
	            props: c.props,
	            state: c.state,
	            update: function update(type, payload) {
	                c.state = reduce(c.state, { type: type, payload: payload });
	                _this._queueRender();
	                return c.state;
	            },
	            h: update_element_children_1.h
	        };
	    };
	    HTMLComponent.prototype._createRenderModel = function () {
	        var model = this._createModel();
	        model.h = update_element_children_1.h;
	        return model;
	    };
	    return HTMLComponent;
	}(HTMLElement);
	function attributesToProps(attributes) {
	    var props = {};
	    for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
	        var attr = attributes_1[_i];
	        props[attr.name] = attr.value;
	    }
	    return props;
	}
	function nop() {}
	function doLater(fn) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (setImmediate) setImmediate.apply(void 0, [fn].concat(args));else setTimeout.apply(void 0, [fn, 0].concat(args));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*! (C) WebReflection Mit Style License */
	(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)vt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(vt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&e.prevValue!==e.newValue&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(n--,F.splice(t--,1),vt(e,o))}function dt(e){throw new Error("A "+e+" type is already registered")}function vt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function mt(e){return e?(mt.prototype=e,new mt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){c=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&(o=s.getAttribute(i.attributeName),o!==i.oldValue&&s.attributeChangedCallback(i.attributeName,i.oldValue,o)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t}),-2<S.call(y,v+c)+S.call(y,d+c)&&dt(n);if(!m.test(c)||-1<S.call(g,c))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,c):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():c,c,p;return f&&-1<S.call(y,d+l)&&dt(l),p=y.push((f?v:d)+c)-1,w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[p]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_document_register_element__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_document_register_element___default = __WEBPACK_IMPORTED_MODULE_0_document_register_element__ && __WEBPACK_IMPORTED_MODULE_0_document_register_element__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_document_register_element__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_document_register_element__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_document_register_element___default, 'a', __WEBPACK_IMPORTED_MODULE_0_document_register_element___default);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_src_register_component__ = __webpack_require__(3);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_src_register_component___default = __WEBPACK_IMPORTED_MODULE_1__build_src_register_component__ && __WEBPACK_IMPORTED_MODULE_1__build_src_register_component__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__build_src_register_component__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__build_src_register_component__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__build_src_register_component___default, 'a', __WEBPACK_IMPORTED_MODULE_1__build_src_register_component___default);
	/** @jsx h */



	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__build_src_register_component__["registerComponent"])('my-simple', function (_ref) {
		var props = _ref.props;
		var h = _ref.h;
		return h(
			'div',
			{ g: 'f' },
			'H: ',
			props.test
		);
	});

	/*
	registerComponent('my-clock', {
		onMount({update}) {
			const refreshTime = () => update('SET_TIME', Date.now());
			update('SET_INTERVAL', setInterval(refreshTime, 1000));
			refreshTime();
		},
		render({state}) {
			const timeStr = new Date(state.time).toLocaleTimeString();
			return <div>
				<div>Header</div>
				<div>{timeStr}</div>
			</div>;
		},
		reduce(state = {
			time: 0,
			interval: null
		}, {type, payload}) {
			if(type === 'SET_TIME') return {...state, time: payload};
			if(type === 'SET_INTERVAL') return {...state, interval: payload};
			return state;
		},
		onUnmount({state}) {
			clearInterval(state.interval);
		}
	});

	registerComponent('my-counter', {
		render({state, update}) {
			return <div>
				<span>Counter: {state.count}</span>{' '}
				<button onClick={() => update('INCREMENT')}>Increment</button>
			</div>;
		},
		reduce(state = {
			count: 0
		}, {type, payload}) {
			if(type === 'INCREMENT') return {
				...state,
				count: state.count + 1
			};
			return state;
		}
	});
	*/

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

	var _bitVector = __webpack_require__(6);

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
/* 8 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


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
	var update_dom_1 = __webpack_require__(12);
	exports.updateChildren = update_dom_1.updateChildren;
	var h_1 = __webpack_require__(1);
	exports.h = h_1.h;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	var types_1 = __webpack_require__(2);
	function createRealDomNode(vnode, doc) {
	    if (doc === void 0) { doc = document; }
	    if (types_1.isVTextNode(vnode)) {
	        return doc.createTextNode(vnode.text);
	    }
	    var element = doc.createElement(vnode.name);
	    populateAttributes(element, vnode.props);
	    vnode.children
	        .map(function (vnode) { return createRealDomNode(vnode); })
	        .forEach(element.appendChild.bind(element));
	    return element;
	}
	exports.createRealDomNode = createRealDomNode;
	function populateAttributes(element, props) {
	    for (var key in props) {
	        element[name] = props[name];
	    }
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	var dift_1 = __webpack_require__(7);
	var to_dom_1 = __webpack_require__(11);
	var util_1 = __webpack_require__(13);
	var h_1 = __webpack_require__(1);
	var types_1 = __webpack_require__(2);
	function updateChildren(parentNode, oldChildren, newChildren) {
	    var oldVNodes = h_1.sanitizeChildren(util_1.ensureArray(oldChildren));
	    var newVNodes = h_1.sanitizeChildren(util_1.ensureArray(newChildren));
	    updateChildrenInternal(parentNode, oldVNodes, newVNodes);
	}
	exports.updateChildren = updateChildren;
	function updateChildrenInternal(parentNode, oldVNodes, newVNodes) {
	    dift_1.default(oldVNodes, newVNodes, function (editType, old, next, index) {
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
	            parentNode.insertBefore(to_dom_1.createRealDomNode(newVNode), indexNode);
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
	    updateProps(oldNode, oldVNode, newVNode);
	    updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
	    return oldNode;
	}
	function updateProps(element, oldVNode, newVNode) {
	    var oldProps = util_1.clone(oldVNode.props);
	    var newProps = util_1.clone(newVNode.props);
	    for (var name_1 in newProps) {
	        if (newProps[name_1] !== oldProps[name_1]) {
	            element[normalizeProp(name_1)] = newProps[name_1];
	        }
	        delete oldProps[name_1];
	    }
	    for (var name_2 in oldProps) {
	        delete element[normalizeProp(name_2)];
	    }
	}
	function normalizeProp(name) {
	    switch (name) {
	        case 'class':
	            return 'className';
	        default:
	            return name;
	    }
	}


/***/ },
/* 13 */
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