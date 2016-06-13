import {h, updateChildren} from 'update-element-children';
import * as assign from 'object-assign';
import {
	ComponentSpec,
	ComponentSpecObject,
	CustomElementPrototype,
	ComponentMembers,
	Model,
	RenderModel
} from './types';


export function registerComponent(name: string, spec: ComponentSpec = {}, doc = document): Function {
	if(typeof spec === 'function') {
		spec = {render: spec};
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

// TODO: Use Shadow DOM if available
function createComponentPrototype(spec: ComponentSpecObject): CustomElementPrototype {
	const proto = <CustomElementPrototype> assign({}, HTMLComponent.prototype);
	proto._spec = spec;
	return proto;
}

class HTMLComponent extends HTMLElement implements CustomElementPrototype {
	_spec: ComponentSpecObject;
	_component:  ComponentMembers;

	createdCallback() {window.d=this;
		const {reduce} = this._spec;

		this._doRender = this._doRender.bind(this);

		this._component = {
			renderPending: false,
			previousRender: null,
			props: attributesToProps(this.attributes),
			state: reduce(undefined, {type: '_#@init_action'})
		};

		this._queueRender();
	}

	attributeChangedCallback(name, previousValue, value) {
		const c = this._component;
		const {onPropChange} = this._spec;

		c.props = assign({}, c.props, {[name]: value});
		onPropChange(this._createModel(), name, previousValue, value);
		this._queueRender();
	}

	attachedCallback() {
		const c = this._component;
		const {onMount} = this._spec;

		onMount(this._createModel());
	}

	detachedCallback() {
		const c = this._component;
		const {onUnmount} = this._spec;

		onUnmount(this._createModel());
	}

	_queueRender(): void {
		const c = this._component;
		if(!c.renderPending) {
			c.renderPending = true;
			doLater(this._doRender);
		}
	}

	_doRender(): void {
		const c = this._component;
		if(!c.renderPending) return;

		const {render} = this._spec;
		const currentRender = render(this._createRenderModel());

		console.log('updateChildren', c.previousRender, currentRender);
		updateChildren(this, c.previousRender, currentRender);

		c.previousRender = currentRender;
		c.renderPending = false;
	}

	_createModel(): Model {
		const c = this._component;
		const {reduce} = this._spec;

		return {
			props: c.props,
			state: c.state,
			update: (type, payload) => {
				c.state = reduce(c.state, {type, payload});
				this._queueRender();
				return c.state;
			},
			h
		};
	}

	_createRenderModel(): RenderModel {
		const model = this._createModel();
		model.h = h;
		return model;
	}
}

function attributesToProps(attributes: NamedNodeMap): Object {
	const props = {};
	for(let attr of attributes) {
		props[attr.name] = attr.value;
	}
	return props;
}

function nop(): void {}

function doLater(fn, ...args) {
	if(setImmediate) setImmediate(fn, ...args);
	else setTimeout(fn, 0, ...args);
}
