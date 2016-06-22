/** @jsx h */
import 'document-register-element';
import {registerComponent} from '../src';


registerComponent('my-simple', {
	props: {test: ''},
	render({props, h}) {
		return <div g="f">Simple Attr: {props.test}</div>;
	}
});

registerComponent('my-counter', {
	render({h, state, update}) {
		return <div>
			<span>Counter: {state} </span>
			<button onclick={() => update('INCREMENT')}>Increment</button>
		</div>;
	},
	reduce(state = 0, {type, payload}) {
		if(type === 'INCREMENT') return state + 1;
		return state;
	}
});

registerComponent('my-clock', {
	onMount({update}) {
		const refreshTime = () => update('SET_TIME', Date.now());
		update('SET_INTERVAL', setInterval(refreshTime, 1000));
		refreshTime();
	},
	render({h, state}) {
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
		clearInterval(state.interval);
	}
});
