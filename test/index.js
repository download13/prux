const expect = require('expect.js');
const {registerComponent} = require('../dist');
const {jsdom} = require('jsdom');
global.document = jsdom('');
global.window = document.defaultView;
global.Text = window.Text;
global.HTMLElement = window.HTMLElement;
require('document-register-element');


describe('Component', () => {
	it('renders a child string', done => {
		registerComponent('test-string', () => 'TestString');
		var el = document.createElement('test-string');

		wait(20)().then(() => {
			expect(el.localName).to.be.equal('test-string');
			expect(el.childNodes.length).to.be.equal(1);
			expect(el.childNodes[0].textContent).to.be.equal('TestString');
			done();
		}).catch(done);
	});

	it('renders more than one child string', done => {
		registerComponent('test-strings', () => ['TestString', 'Another']);
		var el = document.createElement('test-strings');

		wait(20)().then(() => {
			expect(el.localName).to.be.equal('test-strings');
			expect(el.childNodes.length).to.be.equal(2);
			expect(el.childNodes[0].textContent).to.be.equal('TestString');
			expect(el.childNodes[1].textContent).to.be.equal('Another');
			done();
		}).catch(done);
	});

	it('renders a child element', done => {
		registerComponent('test-element', ({h}) => h('div', {}));
		var el = document.createElement('test-element');

		wait(20)().then(() => {
			expect(el.localName).to.be.equal('test-element');
			expect(el.childNodes.length).to.be.equal(1);
			expect(el.childNodes[0].localName).to.be.equal('div');
			done();
		}).catch(done);
	});

	it('renders more than one child element', done => {
		registerComponent('test-elements', ({h}) => [
			h('div', {}),
			h('span', {})
		]);
		var el = document.createElement('test-elements');

		wait(20)().then(() => {
			expect(el.localName).to.be.equal('test-elements');
			expect(el.childNodes.length).to.be.equal(2);
			expect(el.childNodes[0].localName).to.be.equal('div');
			expect(el.childNodes[1].localName).to.be.equal('span');
			done();
		}).catch(done);
	});

	it('can respond to state changes', done => {
		registerComponent('test-state', {
			reduce(state = 0, {type, payload}) {
				if(type === 'INCR') return state + 1;
				return state;
			},
			render({h, state, update}) {
				return h('div', {onClick: () => update('INCR')}, state);
			}
		});
		var el = document.createElement('test-state');

		wait(20)()
			.then(() => {
				el.childNodes[0].onclick();
			})
			.then(wait(20))
			.then(() => {
				expect(el.localName).to.be.equal('test-state');
				expect(el.childNodes.length).to.be.equal(1);
				expect(el.childNodes[0].childNodes[0].textContent).to.be.equal('1');
				done();
			})
			.catch(done);
	});

	// TODO: This doesn't seem to work during testing, but it works in a browser
	xit('can respond to lifecycle notifications', done => {
		let state = 0;

		registerComponent('test-lifecycle', {
			onMount() {
				console.log('onMount')
				expect(state).to.be.lessThan(2);
				state++;
			},
			render() {
				console.log('render')
				expect(state).to.be.lessThan(2);
				state++;
				return '';
			},
			onUnmount() {
				console.log('onUnmount')
				expect(state).to.be(2);
				state++;
			}
		});

		var el = document.createElement('test-lifecycle');
		document.body.appendChild(el);

		wait(20)()
			.then(() => {
				console.log(0)
				expect(state).to.be(2);
				console.log(1)
				document.body.removeChild(el);
			})
			.then(wait(20))
			.then(() => {
				expect(state).to.be(3);
				done();
			})
			.catch(done);
	});

	it('takes initial props', done => {
		registerComponent('test-props', {
			props: {s: 'str', n: 1, b: true},
			render({h, props}) {
				return [
					props.s,
					props.n,
					props.b
				];
			}
		});

		var el = document.createElement('test-props');

		wait(20)()
			.then(() => {
				expect(el.childNodes.length).to.be(3);
				expect(el.childNodes[0].textContent).to.be('str');
				expect(el.childNodes[1].textContent).to.be('1');
				expect(el.childNodes[2].textContent).to.be('true');
				done();
			})
			.catch(done);
	});

	it('can respond to prop changes', done => {
		registerComponent('test-propchange', {
			props: {s: 'str', n: 1, b: true},
			render({h, props}) {
				return [
					props.s,
					props.n,
					props.b
				];
			}
		});

		var el = document.createElement('test-propchange');
		el.s = 'test2';
		el.b = false;

		wait(20)()
			.then(() => {
				expect(el.childNodes.length).to.be(3);
				expect(el.childNodes[0].textContent).to.be('test2');
				expect(el.childNodes[1].textContent).to.be('1');
				expect(el.childNodes[2].textContent).to.be('false');
				done();
			})
			.catch(done);
	});

	it('can respond to attribute changes', done => {
		registerComponent('test-attrchange', {
			props: {s: 'str', n: 1, b: true},
			render({h, props}) {
				return [
					props.s,
					props.n,
					props.b
				];
			}
		});

		var el = document.createElement('test-attrchange');
		el.setAttribute('s', 'testattr');
		el.setAttribute('n', '4');
		el.setAttribute('b', 'fg');

		wait(20)()
			.then(() => {
				expect(el.childNodes.length).to.be(3);
				expect(el.childNodes[0].textContent).to.be('testattr');
				expect(el.childNodes[1].textContent).to.be('4');
				expect(el.childNodes[2].textContent).to.be('true');
				done();
			})
			.catch(done);
	});
});


function wait(ms) {
	return param => new Promise((resolve) => {
		setTimeout(() => resolve(param), ms);
	});
}
