import axios from 'axios';
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

function isFirstVisit(){
	const _storage = window.localStorage;
	if (!_storage) {
		throw new Error('Local storage not supported in your browser!');
	}

	const key = 'isFirstVisit';
	const d = _storage.getItem(key);
	if (d === null){
		_storage.setItem(key, false);
		return true;
	}

	return false;
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

		axios.get(path)
		.then(resp => {
			return resp.data;
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.log(data.error);
			} else {
				const isFV = isFirstVisit();
				if (isFV) {
					axios.get(url.createPath({
						server_name: 'events',
						action_name: 'Instruction'
					}))
					.then(resp => {
						return resp.data;
					})
					.then(dataInstr => {
						 if (dataInstr.error){
							console.log(dataInstr.error);
						} else {
							dispatch(loading(false));
							dispatch({
								type: constants.GET_INITIAL_DATA_SUCCESS,
								payload: {
									isFirstVisit: isFV,
									instruction: dataInstr.instruction,
									...data
								}
							});
						}
					});
				} else {
					dispatch(loading(false));
					dispatch({
						type: constants.GET_INITIAL_DATA_SUCCESS,
						payload: {
							isFirstVisit: isFV,
							...data
						}
					});
				}
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.log(e.message);
		});
	};
}

