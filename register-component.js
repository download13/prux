import {h, updateChildren} from 'update-element-children';


export function registerComponent(name, spec, doc = document) {
	return doc.registerElement(name, {
		prototype: Object.create(
			HTMLElement.prototype,
			createComponentPrototype(spec)
		)
	});
}

// TODO: Use Shadow DOM if available
function createComponentPrototype(spec = {}) {
	if(typeof spec === 'function') {
		spec = {render: spec};
	}
	const reduce = spec.reduce || nop;
	const render = spec.render || nop;

	function model(self) {
		const props = self._props;
		const state = self._state;

		return {
			props,
			state,
			update(type, payload) {
				self._state = reduce(state, {type, payload});
				queueRender(self);
			}
		};
	}

	function queueRender(self) {
		if(!self._renderPending) {
			self._renderPending = true;
			doLater(doRender, self);
		}
	}

	function doRender(self) {
		if(!self._renderPending) return;
		const newRender = render(model(self));

		if(self._lastRender) {
			patch(self, diff(self._lastRender, newRender));
			console.log('patch', self._lastRender, newRender)
		} else {
			self.appendChild(newRender.render());
		}

		self._lastRender = newRender;
		self._renderPending = false;
	}


	const elementPrototype = {
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
			value() {
				this._renderPending = false;
				this._lastRender = null;
				this._props = attributesToProps(this.attributes);
				this._state = reduce(undefined, {type: '_#@init_action'});
				queueRender(this);
			},
			enumerable: false
		},
		attributeChangedCallback: {
			value(name, previousValue, value) {
				this._props = {
					...this._props,
					[name]: value
				};
				if(spec.onPropsChange) {
					spec.onPropsChange(model(this));
				}
				queueRender(this);
			},
			enumerable: false
		}
	};
	if(spec.onMount) {
		elementPrototype.attachedCallback = {
			value() {
				console.log('onMount', this._props);
				spec.onMount(model(this));
			},
			enumerable: false
		};
	}
	if(spec.onUnmount) {
		elementPrototype.detachedCallback = {
			value() {
				console.log('onUnmount', this);
				spec.onUnmount(model(this));
			},
			enumerable: false
		};
	}

	return elementPrototype;
}

function attributesToProps(attributes) {
	const props = {};
	for(let attr of attributes) {
		props[attr.name] = attr.value;
	}
	return props;
}

function nop() {}

function doLater(fn, ...args) {
	if(setImmediate) setImmediate(fn, ...args);
	else setTimeout(fn, 0, ...args);
}
