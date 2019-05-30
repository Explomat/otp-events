import axios from 'axios';
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
	'NEW_EVENT_CHANGE_FILE_NAME': 'NEW_EVENT_CHANGE_FILE_NAME',
	...createRemoteActions('GET_EVENT_CREATE')
}

function loading(isLoading){
	return {
		type: constants.NEW_EVENT_LOADING,
		payload: isLoading
	}
}

export function onChangeFileName(fname){
	return {
		type: constants.NEW_EVENT_CHANGE_FILE_NAME,
		payload: fname
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
		axios({
			method: 'post',
			url: path,
			data: data
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
			axios.get(path)
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
			axios({
				method: 'post',
				url: path
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
				  "id": "6675349716799068736",
				  "cur_user_id": "6148914691236517121",
				  "user_role": "admin",
				  "title": "Мой тест",
				  "status_id": "plan",
				  "status_name": "Активные",
				  "long_desc": "Полное",
				  "img": "/download_file.html?file_id=6674662346535409549",
				  "img_name": "test.png",
				  "max_person_count": "7",
				  "start_date": "Tue, 02 Apr 2019 17:25:36 +0300",
				  "finish_date": "Tue, 02 Apr 2019 18:50:00 +0300",
				  "cost": "8000",
				  "city_id": "5667697629116916647",
				  "city": "Алматы",
				  "subject_id": "Здоровье",
				  "address": "",
				  "phone_number": "84993674214",
				  "email": "user_006@gmail.com",
				  "event_admin_id": "6671539145020354632",
				  "event_admin_fullname": "Бахирев Рустам Маратович",
				  "event_admin_position": "Главный бухгалтер",
				  "event_admin_avatar": "/download_file.html?file_id=6671539891956233514",
				  "like_count": "0",
				  "collaborators": [],
				  "comments": [],
				  "cities": [
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
				    },
				    {
				      "id": "5667697629116916648",
				      "name": "Архангельск"
				    },
				    {
				      "id": "5667697629116916649",
				      "name": "Астана"
				    },
				    {
				      "id": "5667697629116916650",
				      "name": "Астрахань"
				    },
				    {
				      "id": "5667697629116916651",
				      "name": "Атырау"
				    },
				    {
				      "id": "5667697629116916652",
				      "name": "Барнаул"
				    },
				    {
				      "id": "5667697629116916653",
				      "name": "Белгород"
				    },
				    {
				      "id": "5667697629116916654",
				      "name": "Бобруйск"
				    },
				    {
				      "id": "5667697629116916655",
				      "name": "Брест"
				    },
				    {
				      "id": "5667697629116916656",
				      "name": "Брянск"
				    },
				    {
				      "id": "5667697629116916657",
				      "name": "Винница"
				    }
				  ],
				  "subjects": [
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