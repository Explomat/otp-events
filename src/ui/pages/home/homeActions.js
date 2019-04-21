import { url } from '../../../config';
import createRemoteActions from '../../utils/createRemoteActions';
import initialData from '../../mock/static.json';

export const constants = {
	...createRemoteActions('GET_INITIAL_DATA'),
	'INITIAL_LOADING': 'INITIAL_LOADING'
}

function loading(isLoading){
	return {
		type: constants.INITIAL_LOADING,
		payload: isLoading
	}
}

export function getInitialData(){
	return (dispatch, getState) => {

		/*dispatch(loading(true));
		setTimeout((search, status) => {
			dispatch({
				type: constants.GET_INITIAL_DATA_SUCCESS,
				payload: initialData
			});
			dispatch(loading(false));
		}, 1000);*/

		
		dispatch(loading(true));
		const { home } = getState();

		const path = url.createPath({
			server_name: 'events',
			action_name: 'Data',
			status: home.ui.filters.status,
			search: home.ui.filters.search,
			city: home.ui.filters.city,
			subject: home.ui.filters.subject
		});

		fetch(path)
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.log(data.error);
			} else {
				dispatch(loading(false));
				dispatch({
					type: constants.GET_INITIAL_DATA_SUCCESS,
					payload: data
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.log(e.message);
		});
	};
}

