import { url } from '../../../config';
import createRemoteActions from '../../utils/createRemoteActions';
//import initialData from '../../mock/static.json';

export const constants = createRemoteActions('GET_INITIAL_DATA');

export function getInitialData(){
	return (dispatch, getState) => {

		/*setTimeout((search, status) => {
			dispatch({
				type: constants.GET_INITIAL_DATA_SUCCESS,
				payload: initialData
			})
		}, 1000);*/

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

