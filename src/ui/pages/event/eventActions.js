import { url } from '../../../config';
import createRemoteActions from '../../utils/createRemoteActions';
import { omit } from 'lodash';
require('formdata-polyfill');

export const constants = {
	'NEW_EVENT_CHANGE_TITLE': 'NEW_EVENT_CHANGE_TITLE',
	'NEW_EVENT_CHANGE_DESCRIPTION': 'NEW_EVENT_CHANGE_DESCRIPTION',
	'NEW_EVENT_CHANGE_SHORT_DESCRIPTION': 'NEW_EVENT_CHANGE_SHORT_DESCRIPTION',
	'NEW_EVENT_CHANGE_START_DATE': 'NEW_EVENT_CHANGE_START_DATE',
	'NEW_EVENT_CHANGE_FINISH_DATE': 'NEW_EVENT_CHANGE_FINISH_DATE',
	'NEW_EVENT_CHANGE_CITY': 'NEW_EVENT_CHANGE_CITY',
	'NEW_EVENT_CHANGE_SUBJECT': 'NEW_EVENT_CHANGE_SUBJECT',
	'NEW_EVENT_CHANGE_MAX_PERSONS': 'NEW_EVENT_CHANGE_MAX_PERSONS',
	'NEW_EVENT_CHANGE_COST': 'NEW_EVENT_CHANGE_COST',
	'NEW_EVENT_CHANGE_ADDRESS': 'NEW_EVENT_CHANGE_ADDRESS',
	'NEW_EVENT_LOADING': 'NEW_EVENT_LOADING',
	...createRemoteActions('GET_EVENT_CREATE')
}

function loading(isLoading){
	return {
		type: constants.NEW_EVENT_LOADING,
		payload: isLoading
	}
}

export function onChangeTitle(event, data){
	return {
		type: constants.NEW_EVENT_CHANGE_TITLE,
		payload: data.value
	}
}

export function onChangeDescription(event, data){
	return {
		type: constants.NEW_EVENT_CHANGE_DESCRIPTION,
		payload: data.value
	}
}

export function onChangeShortDescription(event, data){
	return {
		type: constants.NEW_EVENT_CHANGE_SHORT_DESCRIPTION,
		payload: data.value
	}
}

export function onChangeStartDate(date){
	return {
		type: constants.NEW_EVENT_CHANGE_START_DATE,
		payload: date
	}
}

export function onChangeFinishDate(date){
	return {
		type: constants.NEW_EVENT_CHANGE_FINISH_DATE,
		payload: date
	}
}

export function onChangeCity(event, data){
	return {
		type: constants.NEW_EVENT_CHANGE_CITY,
		payload: data.value
	}
}

export function onChangeAddress(event, data){
	return {
		type: constants.NEW_EVENT_CHANGE_ADDRESS,
		payload: data.value
	}
}

export function onChangeSubject(event, data){
	return {
		type: constants.NEW_EVENT_CHANGE_SUBJECT,
		payload: data.value
	}
}

export function onChangeMaxPersons(event, data){
	let payload = parseInt(data.value);

	if (isNaN(payload) || data.value < 0 || data.value === '') {
		payload = '';
	}

	return {
		type: constants.NEW_EVENT_CHANGE_MAX_PERSONS,
		payload
	}
}

export function onChangeCost(event, data){
	let payload = parseInt(data.value);

	if (isNaN(payload) || data.value < 0 || data.value === '') {
		payload = '';
	}
	
	return {
		type: constants.NEW_EVENT_CHANGE_COST,
		payload
	}
}

export function saveEvent(form, history){
	return (dispatch, getState) => {
		//const { event } = getState();

		//const data = omit(event, [ 'cities', 'subjects' ]);

		const path = url.createPath({
			server_name: 'events',
			action_name: 'SaveEvent'
		});

		const data = new FormData(form);

		dispatch(loading(true));
		fetch(path, {
			method: 'POST',
			/*headers: {  
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'  
			},*/
			body: data
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.log(data.error);
			} else {
				dispatch(loading(false));
				history.push(`/event/details/${data.id}`);
			}
		})
		.catch(e => {
			//dispatch(error(e.message));
			console.log(e.message);
		});
	}
}

export function getData(eventId){
	return dispatch => {
		if (eventId){
			const path = url.createPath({
				server_name: 'events',
				action_name: 'EventData',
				id: eventId
			});

			dispatch(loading(true));
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
						type: constants.GET_EVENT_CREATE_SUCCESS,
						payload: {
							id: eventId,
							...data
						}
					});
				}
			})
			.catch(e => {
				//dispatch(error(e.message));
				console.log(e.message);
			});
		} else {
			const path = url.createPath({
				server_name: 'events',
				action_name: 'DataForCreate'
			});

			dispatch(loading(true));
			fetch(path, { method: 'POST' })
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
						type: constants.GET_EVENT_CREATE_SUCCESS,
						payload: data
					});
				}
			})
			.catch(e => {
				//dispatch(error(e.message));
				console.log(e.message);
			});
		}

		/*dispatch(loading(true));
		setTimeout(() => {
			dispatch(loading(false));
			dispatch({
				type: constants.GET_EVENT_CREATE_SUCCESS,
				payload: {
					title: 'test',
					long_desc: 'long descr',
					short_desc: 'short descr',
					start_date: 'Wed, 10 Apr 2019 09:00:00 +0300',
					finish_date: 'Wed, 10 Apr 2019 09:00:00 +0300',
					city: 'Абакан',
					city_id: '5667697629116916643',
					address: 'test',
					subject_id: 'Спорт',
					max_person_count: 10,
					cost: 100,
					cities: [
						{
							"id": "5667697629116916643",
							"name": "Абакан"
						},
						{
							"id": "5667697629116916644",
							"name": "Аксай"
						},
						{
							"id": "5667697629116916645",
							"name": "Актау"
						},
						{
							"id": "5667697629116916646",
							"name": "Актобе"
						},
						{
							"id": "5667697629116916647",
							"name": "Алматы"
						}
	    			],
					subjects: [
						"Образование",
						"Спорт",
						"Здоровье",
						"Путешествия, туризм",
						"Культура",
						"Развлечение"
					]
				}
			});
		}, 1000);*/
	};
}