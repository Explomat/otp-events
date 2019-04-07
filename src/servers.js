import uuid from './utils/uuid';

const servers = [];

/*
	srv: {id: 1, name: 'test'}
*/
function Server(srv){
	const id  = srv.id || uuid();
	const name = srv.name || `name_${srv.id}`;
	let actions = [];

	this.addActions = _actions => {
		actions = actions.concat((_actions || []));
		return this;
	};

	this.getId = () => {
		return id;
	};

	this.getName = () => {
		return name;
	};

	this.getActions = () => {
		return actions;
	};
}

export function addServer(srv){
	if (typeof srv !== 'object'){
		throw TypeError('Argument must be an object like this \r\n "{id: 1, name: \'Test\'}"');
	}
	const server = new Server(srv);
	servers.push(server);
	return server;
}

export function getAll(){
	return servers;
}

