declare module 'object-assign' {
	function assign(target: Object, ...source: Object[]): Object;
	namespace assign {}
	export = assign;
}

interface Document extends Document {
	registerElement: (string, {prototype: Object}) => Function;
}
