const g = this;


let doAsync;
if(g.requestIdleCallback) {
	doAsync = fn => requestIdleCallback(fn);
} else if(g.setImmediate) {
	doAsync = fn => setImmediate(fn);
} else {
	doAsync = fn => setTimeout(fn, 0);
}


function flattenArray(arr) {
	return [].concat(...arr);
}


function nop() {}


function shallowEqual(a, b) {
	if(a === b) return true;
	const bLength = Object.keys(b).length;
	let aLength = 0;
	for(let key in a) {
		aLength++;
		if(a[key] !== b[key]) return false;
	}
	if(aLength !== bLength) return false;
	return true;
}


module.exports = {
	doAsync,
	flattenArray,
	nop,
	shallowEqual
};
