const {el: element, diff, patch} = require('simple-virtual-dom');
const {
	doAsync,
	flattenArray,
	nop,
	shallowEqual
} = require('./util');


function h(tagName, attributes, ...children) {
	if(typeof tagName === 'object') {
		// TODO: Create component
	}

	return element(tagName, attributes, flattenArray(children));
}


const initializationCommand = {type: '_*INIT_CMD'};
function createComponent(spec) {
	const {render} = spec;
	if(!render) throw new Error('createComponent requires you to specify a `render` method');
	const reduce = spec.reduce || nop;
	const onMount = spec.onMount || nop;
	const onPropsChange = spec.onPropsChange || nop;
	const onUnmount = spec.onUnmount || nop;

	let renderNode = null;
	let renderPending = false;
	let lastRender = null;
	let model = {
		props: {},
		children: [],
		state: undefined,
		update,
		h
	};

	update(initializationCommand);

	function mount(node) {
		renderNode = node;
		// Render first time
		onMount(model);
		queueRender();
	}

	// Takes an action and updates the component state
	function update(command) {
		const newState = reduce(model.state, command);
		if(!shallowEqual(model.state, newState)) {
			model = {...model, state: newState};
			queueRender();
		}
		return newState;
	}

	function setProps(newProps) {
		// TODO: Do shallow comparison of props
		if(!shallowEqual(model.props, newProps)) {
			model = {...model, props: newProps};
			queueRender();
			onPropsChange(model);
		}
	}

	function setChildren(newChildren) {
		if(!shallowEqual(model.children, newChildren)) {
			model = {...model, children: newChildren};
			queueRender();
		}
	}

	function queueRender() {
		if(!renderPending && renderNode !== null) {
			renderPending = true;
			doAsync(doRender);
		}
	}

	function doRender() {
		if(!renderPending) return;
		if(!lastRender) {
			lastRender = render(model);
			renderNode.appendChild(lastRender.render());
		} else {
			patch(renderNode, diff(lastRender, render(model)));
		}
		renderPending = false;
	}

	function unmount() {
		onUnmount(model);
	}

	return {
		mount,
		setProps,
		setChildren,
		unmount,
		spec
	};
}


module.exports = {
	createComponent,
	h
};
