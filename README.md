# prux

Create [Web Components](https://customelements.io/) with reducible state (similar to [Redux](https://github.com/reactjs/redux)) and functional views (much like [React](https://facebook.github.io/react/) or [deku](https://github.com/anthonyshort/deku)).

## Install

```
npm install prux
```

## Examples

TODO


## API

### registerComponent(name, spec);

* name - string; Tag name to be registered. Must contain a dash (-).
* spec - function | object; If function, it will be treated as {render: function}.

### spec

* onMount(model) - function; Called when the component is mounted.
* onUnmount(model) - function; Called when the component is unmounted.
* onPropChange(model, name, oldValue, value) - function; Called when a prop is changed on the component.
* render(model) - function; Returns a vnode structure to be replicated on the DOM.
* reduce(state, {type, payload}) - function; Takes a state and action, returns a new state.

### model

* root - HTMLElement; The root element of this component instance.
* h(name, props, ...children) - function; Take as an argument in any function where you use JSX.
* state - any; The current state of the component.
* props - object; The props given to this component.
* update(type[, payload]) - function; Call this to dispatch an action to the reducer and update the component state.
