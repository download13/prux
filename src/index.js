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
		Object.create(window.HTMLElement.prototype),
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

		const vdom = render(createModel(element));
		// console.log('updateChildren', c.previousRender, vdom);
		c.previousRender = updateChildren(element, c.previousRender, vdom);
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
				props: {...initialProps},
				state: reduce(undefined, {type: '_#@init_action'})
			};

			// TODO: Add tests to ensure that these prop setters work
			// set when correct type
			// don't set when not
			// take initial values
			Object.defineProperties(this, objectMap(spec.props, (_, name) => {
				return {
					get() {
						return this._component.props[name];
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

			eachAttributes(this.attributes, (newValue, name) => {
				const previousValue = c.props[name];
				this.attributeChangedCallback(name, previousValue, newValue);
			});

			queueRender(this);
		},
		attributeChangedCallback(name, previousValue, newValue) {
			//console.log('attributeChangedCallback', name, previousValue, newValue)
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
	eachAttributes(attributes, (value, name) => {
		props[name] = value;
	});
	return props;
}

function eachAttributes(attributes, fn) {
	const r = [];
	//console.log('attributes', attributes.length)
	for(let i = 0; i < attributes.length; i++) {
		const attr = attributes.item(i);
		//console.log('attr', attr)
		r.push(fn(attr.value, attr.name, attributes));
	}
	return r;
}
