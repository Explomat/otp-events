import { url } from '../../../../config';
import { constants as homeConstants } from '../homeActions';

export const constants = {
	'CHANGE_SEARCH': 'CHANGE_SEARCH',
	'CHANGE_PAGE': 'CHANGE_PAGE',
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

export function changePage(value){
	return {
		type: constants.CHANGE_PAGE,
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


function loading(isLoading){
	return {
		type: homeConstants.INITIAL_LOADING,
		payload: isLoading
	}
}

export function search(){
	return (dispatch, getState) => {
		const { home } = getState();
		const filters = home.ui.filters;

		const path = url.createPath({
			server_name: 'events',
			action_name: 'Data',
			status: filters.status,
			search: filters.search,
			page: filters.page,
			city: filters.city,
			subject: filters.subject

		});

		dispatch(loading(true));
		fetch(path)
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.error(data.error);
			} else {
				dispatch(loading(false));
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