import { url } from '../../../../config';
import { constants as homeConstants } from '../homeActions';

export const constants = {
	'CHANGE_SEARCH': 'CHANGE_SEARCH',
	'CHANGE_STATUS': 'CHANGE_STATUS',
	'CHANGE_SUBJECT': 'CHANGE_SUBJECT',
	'CHANGE_CITY': 'CHANGE_CITY',
	'CLEAR_FIELDS': 'CLEAR_FIELDS'
}

export const statuses = {
	all: 'Выберите статус',
	active: 'Активные',
	plan: 'Планируются',
	completed: 'Завершены'
}


export function changeStatus(value){
	return {
		type: constants.CHANGE_STATUS,
		payload: value
	}
}

export function changeSearch(value){
	return {
		type: constants.CHANGE_SEARCH,
		payload: value
	}
}

export function changeSubject(value){
	return {
		type: constants.CHANGE_SUBJECT,
		payload: value
	}
}

export function changeCity(value){
	return {
		type: constants.CHANGE_CITY,
		payload: value
	}
}

export function clearFields(){
	return {
		type: constants.CLEAR_FIELDS
	}
}


export function search(){
	return (dispatch, getState) => {
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
				console.error(data.error);
			} else {
				dispatch({
					type: homeConstants.GET_INITIAL_DATA_SUCCESS,
					payload: data
				});
			}
		})
		.catch(e => {
			//dispatch(error(e.message));
			console.error(e.message);
		});

		/*setTimeout((search, status) => {
			dispatch({
				type: constants.FILTER_EVENTS_SUCCESS,
				payload: []
			})
		}, 1000);*/
	};
}