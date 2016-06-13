"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var update_element_children_1 = require('update-element-children');
var assign = require('object-assign');
function registerComponent(name, spec, doc) {
    if (spec === void 0) { spec = {}; }
    if (doc === void 0) { doc = document; }
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
var HTMLComponent = (function (_super) {
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
        if (!c.renderPending)
            return;
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
            update: function (type, payload) {
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
}(HTMLElement));
function attributesToProps(attributes) {
    var props = {};
    for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
        var attr = attributes_1[_i];
        props[attr.name] = attr.value;
    }
    return props;
}
function nop() { }
function doLater(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (setImmediate)
        setImmediate.apply(void 0, [fn].concat(args));
    else
        setTimeout.apply(void 0, [fn, 0].concat(args));
}
