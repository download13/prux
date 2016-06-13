export interface Model {
	props: Object;
	state: any;
	update: (type: string, payload?: any) => void;
	h: Function;
}

export interface RenderModel extends Model {
	h: Function;
}

type Render = (model: RenderModel) => any;
type Reduce = (state: any, action: Action) => any;
type Notify = (model: Model) => void;
type PropChange = (model: Model, name: string, oldValue: any, newValue: any) => void;

interface Action {
	type: string;
	payload?: any;
}

export interface UnsanitizedComponentSpecObject {
	render?: Render;
	reduce?: Reduce;
	onPropChange?: PropChange;
	onMount?: Notify;
	onUnmount?: Notify;
}

export interface ComponentSpecObject {
	render: Render;
	reduce: Reduce;
	onPropChange: PropChange;
	onMount: Notify;
	onUnmount: Notify;
}

export type ComponentSpec = Render | UnsanitizedComponentSpecObject;

export interface CustomElementPrototype {
	_spec: ComponentSpecObject;
	_component: ComponentMembers;
	createdCallback: () => void;
}

export interface ComponentMembers {
	renderPending: boolean;
	previousRender: any;
	props: Object;
	state: any;
}
