const createAction = action => {
	return {
		[action]: action,
		[`${action}_SUCCESS`]: `${action}_SUCCESS`,
		[`${action}_FAILURE`]: `${action}_FAILURE`
	}
}

export default function createRemoteActions(actions){
	if (Object.prototype.toString.call(actions) === '[object String]') {
		actions = [actions];
	}

	if (!Array.isArray(actions)){
		throw new Error('Unknown input arguments!');
	}

	return actions.reduce((f,s) => {
		const reducedAction = createAction(s);
		return Object.assign(f, reducedAction);
	}, {});
}