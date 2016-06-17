import 'setimmediate-min';
import nop from 'nop';
import {h, updateChildren} from 'update-element-children';


export function registerComponent(name, spec = {}, doc = document) {
	if(typeof spec === 'function') {
		spec = {render: spec};
	}

	const componentProto = createComponentPrototype({
		render: spec.render || nop,
		reduce: spec.reduce || nop,
		onMount: spec.onMount,
		onUnmount: spec.onUnmount,
		onPropChange: spec.onPropChange
	});
	const elementProto = Object.assign(
		Object.create(HTMLElement.prototype),
		componentProto
	);

	return doc.registerElement(name, {prototype: elementProto});
}

// TODO: Use Shadow DOM if available
function createComponentPrototype(spec) {
	function queueRender(element) {
		const c = element._component;

		if(!c.renderPending) {
			c.renderPending = true;
			setImmediate(() => doRender(element));
		}
	}

	function doRender(element) {
		const c = element._component;
		if(!c.renderPending) return;

		const {render} = spec;
		const currentRender = render(createModel(element));

		// console.log('updateChildren', c.previousRender, currentRender);
		updateChildren(element, c.previousRender, currentRender);

		c.previousRender = currentRender;
		c.renderPending = false;
	}

	function createModel(element) {
		const c = element._component;
		const {reduce} = spec;

		return {
			root: element,
			props: c.props,
			state: c.state,
			update: (type, payload) => {
				c.state = reduce(c.state, {type, payload});
				queueRender(element);
				return c.state;
			},
			h
		};
	}

	const proto = {
		createdCallback() {
			const {reduce} = spec;

			this._component = {
				renderPending: false,
				previousRender: null,
				props: attributesToProps(this.attributes),
				state: reduce(undefined, {type: '_#@init_action'})
			};

			queueRender(this);
		},
		attributeChangedCallback(name, previousValue, value) {
			const c = this._component;
			const {onPropChange} = spec;

			c.props = {
				...c.props,
				[name]: value
			};

			if(onPropChange) {
				onPropChange(createModel(this), name, previousValue, value);
			}

			queueRender(this);
		}
	};

	if(spec.onMount) {
		proto.attachedCallback = function() {
			spec.onMount(createModel(this));
		};
	}

	if(spec.onUnmount) {
		proto.detachedCallback = function() {
			spec.onUnmount(createModel(this));
		};
	}

	return proto;
}


function attributesToProps(attributes) {
	const props = {};
	for(let attr of attributes) {
		props[attr.name] = attr.value;
	}
	return props;
}
