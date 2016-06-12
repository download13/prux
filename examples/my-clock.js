import 'document-register-element';
import {registerComponent, h} from '../register-component';


registerComponent('my-simple', ({props}) =><div>H: {props.test}</div>);

registerComponent('my-clock', {
	onMount({update}) {
		const refreshTime = () => update('SET_TIME', Date.now());
		update('SET_INTERVAL', setInterval(refreshTime, 1000));
		refreshTime();
	},
	render({state}) {
		const timeStr = new Date(state.time).toLocaleTimeString();
		return <div>
			<div>Header</div>
			<div>{timeStr}</div>
		</div>;
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

registerComponent('my-counter', {
	render({state, update}) {
		return <div>
			<span>Counter: {state.count}</span>{' '}
			<button onClick={() => update('INCREMENT')}>Increment</button>
		</div>;
	},
	reduce(state = {
		count: 0
	}, {type, payload}) {
		if(type === 'INCREMENT') return {
			...state,
			count: state.count + 1
		};
		return state;
	}
});
