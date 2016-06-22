# prux

Create [Web Components](https://customelements.io/) with reducible state (similar to [Redux](https://github.com/reactjs/redux)) and functional views (much like [React](https://facebook.github.io/react/) or [deku](https://github.com/anthonyshort/deku)).


## Install

```
npm install prux
```


## Examples

### Stateless functional component

```javascript
/** @jsx h */
import {registerComponent} from 'prux';

registerComponent('my-simple', {
	props: {test: ''},
	render({h, props}) { // h is the JSX helper
		return <div>Props test value: {props.test}</div>;
	}
});
// The above is equivalent to:
registerComponent('my-simple', {
	props: {test: ''},
	render({h, props}) {
		return h('div', {}, 'Props test value: ', props.test);
	}
});
```

### Use the component

```html
<!doctype html>
<body>
	<my-simple test="testvalue"></my-simple>
</body>
```

### Stateful component

```javascript
registerComponent('my-counter', {
	render({h, state, update}) {
		return <div>
			<span>Counter: {state} </span>
			<button onClick={() => update('INCREMENT')}>Increment</button>
		</div>;
	},
	reduce(state = 0, {type, payload}) {
		if(type === 'INCREMENT') return state + 1;
		return state;
	}
});
```

### Lifecycle component

```javascript
registerComponent('my-clock', {
	onMount({update}) {
		const refreshTime = () => update('SET_TIME', Date.now());
		update('SET_INTERVAL', setInterval(refreshTime, 1000));
		refreshTime();
	},
	render({h, state}) {
		// Returns a string, which counts as a child
		return new Date(state.time).toLocaleTimeString();
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
		// Cleanup
		clearInterval(state.interval);
	}
});
```

## API

### registerComponent(name, spec);

* name - string; Tag name to be registered. Must contain a dash (-).
* spec - function | object; If function, it will be treated as {render: spec}.

### spec - {...}

* props - object; Map of prop names to their default values.
* onMount(model) - function; Called when the component is mounted.
* onUnmount(model) - function; Called when the component is unmounted.
* onPropChange(model, name, oldValue, value) - function; Called when a prop is changed on the component.
* render(model) - function; Returns one or more vnodes to be used as children of the root element.
* reduce(state, {type, payload}) - function; Takes a state and action, returns a new state.

### model - {...}

* root - HTMLElement; The root element of this component instance.
* h(name, props, ...children) - function; Take as an argument in any function where you use JSX.
* state - any; The current state of the component.
* props - object; The props given to this component.
* update(type[, payload]) - function; Call this to dispatch an action to the reducer and update the component state.

## Notes

* When attributes are set on the element, if a prop of the same name exists it will be set to the string or number value of the attribute.
