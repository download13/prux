const {h, createComponent} = require('./component');


const CountBtn = {
	render({h, update, state}) {
		return <button onClick={() => update({type: 'INCREMENT'})}>
			I've been clicked {state.count} times. Also: {children}
		</button>;
	},
	reduce(state = {count: 0}, {type, payload}) {
		if(type === 'INCREMENT') return {...state, count: state.count + 1};
		return state;
	}
};

const App = {
	render({h, props, children}) {
		const g = <div data-test="val">
			<p>First and Second</p>
			<p>Third is props.a: {props.a}</p>
			<p>Fourth is children: {children}</p>
			<CountBtn/>
		</div>;
		console.log('App.render', g);
		return g;
	},
	reduce(state = {init: 1, changes: 0}, {type, payload}) {
		if(type === 'CMD') return {...state, changes: payload};
		return state;
	}
};


function main() {
	const root = document.getElementById('root');
	const rootComp = createComponent(App);
	rootComp.mount(root);
	rootComp.setProps({a: 1});
	rootComp.setChildren([
		<span>Child Text</span>,
		<span>Child Text 2</span>
	]);
}

main();
