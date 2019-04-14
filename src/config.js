import { addServer, getAll } from  './servers';

const isProduction = process.env.NODE_ENV === 'production';

const wtBaseUrl = 'http://79.111.15.126';
const wtRouterId = '6385385939497347608';
const wtCustomBaseUrl = isProduction ? '/custom_web_template.html' : wtBaseUrl + '/custom_web_template.html';

addServer({ id: '6668987061819174354', name: 'events' })
.addActions(
	[
		'Data',
		'DataForCreate',
		'EventData',
		'AddComment',
		'RemoveComment',
		'NewEventStatus',
		'NewParticipiant',
		'ParticipiantStatus',
		'NewParticipiant',
		'Like',
		'SaveEvent',
		'Refuse',
		'ResolveEvent',
		'RejectEvent'
	]
);

const url = {
	getServerId(serverName, actionName) {
		const _servers = getAll().filter(s => {
			const actions = s.getActions().filter(action => {
				return action === actionName;
			});
			
			return (s.getName() === serverName && actions.length > 0);
		}).map(s => s.getId());
		return _servers.length > 0 ? _servers[0] : '';
	},

	createPath(inputObj){
		if (!('server_name' in inputObj)) return '/';
		if (!('action_name' in inputObj)) inputObj.action_name = '';
		const serverId = this.getServerId(inputObj.server_name, inputObj.action_name);
		const basePath = wtCustomBaseUrl.concat('?object_id=').concat(wtRouterId).concat('&server_id='.concat(serverId));

		return basePath.concat(Object.keys(inputObj).map(k => {
			return '&'.concat(k).concat('=').concat(inputObj[k]);
		}).join(''));
	}
};
export { url };
