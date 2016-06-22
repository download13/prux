import 'setimmediate-min';
import nop from 'nop';
import {h, updateChildren} from 'update-element-children';
import objectMap from 'object-map';


export {h};

export function registerComponent(name, spec = {}, doc = document) {
	if(typeof spec === 'function') {
		spec = {render: spec};
	}

	const componentProto = createComponentPrototype({
		props: spec.props || {},
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
// Children don't make sense until the shadow dom is in place
function createComponentPrototype(spec) {
	const {
		render,
		reduce,
		onPropChange
	} = spec;

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

		const currentRender = render(createModel(element));

		// console.log('updateChildren', c.previousRender, currentRender);
		updateChildren(element, c.previousRender, currentRender);

		c.previousRender = currentRender;
		c.renderPending = false;
	}

	function createModel(componentElement) {
		const c = componentElement._component;

		return {
			root: componentElement,
			props: c.props,
			state: c.state,
			update: (type, payload) => {
				c.state = reduce(c.state, {type, payload});
				queueRender(componentElement);
				return c.state;
			},
			h
		};
	}

	// TODO: take spec.props and create a setter for each one that changes our props
	// A setter only sets if the type is the same as the existing property
	const proto = {
		createdCallback() {
			const {
				props: initialProps
			} = spec;

			const c = this._component = {
				renderPending: false,
				previousRender: null,
				initialProps,
				props: initialProps,
				state: reduce(undefined, {type: '_#@init_action'})
			};

			for(let attr of this.attributes) {
				const name = attr.name;
				const previousValue = c.props[name];
				const newValue = attr.value;
				this.attributeChangedCallback(name, previousValue, newValue);
			}

			queueRender(this);
		},
		attributeChangedCallback(name, previousValue, newValue) {
			// TODO: Test for this new behavior
			const c = this._component;
			const typeOfPreviousProp = typeof c.props[name];
			if(typeOfPreviousProp === 'string') {
				c.props = {
					...c.props,
					[name]: newValue
				};
			} else if(typeOfPreviousProp === 'number') {
				const numericalValue = parseFloat(newValue);
				if(!isNaN(numericalValue)) {
					c.props = {
						...c.props,
						[name]: numericalValue
					};
				}
			}

			if(onPropChange) {
				onPropChange(createModel(this), name, previousValue, newValue);
			}

			queueRender(this);
		}
	};
	// TODO: Add tests to ensure that these prop setters work
	// set when correct type
	// don't set when not
	// take initial values
	Object.defineProperties(proto, objectMap(spec.props, (_, name) => {
		return {
			get() {
				this._component.props[name];
			},
			set(newValue) {
				const c = this._component;
				const oldValue = c.props[name];
				if(typeof oldValue === typeof newValue && newValue !== oldValue) {
					c.props[name] = newValue;
					if(onPropChange) {
						onPropChange(createModel(this), name, previousValue, newValue);
					}
					queueRender(this);
				}
			}
		};
	}));

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
