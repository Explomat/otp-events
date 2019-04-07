import { constants } from './homeActions';
import { combineReducers } from 'redux';
import filtersReducer from './filters/reducer';

function statusReducer(state=[], action){
	switch(action.type) {

		case constants.GET_INITIAL_DATA_SUCCESS: {
			let { status_list } = action.payload;

			status_list = status_list.map(s => ({
				text: s.title,
				value: s.id,
				...s
			}));
			return [{
					value: 'all',
					text: 'Выберите статус',
					roles: ['admin', 'event_admin', 'user']
				}, 
				...status_list
			]
		}
		default: return state;
	}
}

function citiesReducer(state=[], action){
	switch(action.type) {

		case constants.GET_INITIAL_DATA_SUCCESS: {
			let { cities } = action.payload;

			cities = cities.map(c => ({
				text: c.name,
				value: c.id
			}));
			return [{
					value: 'all',
					text: 'Выберите город'
				}, 
				...cities
			]
		}
		default: return state;
	}
}

function subjectsReducer(state=[], action){
	switch(action.type) {

		case constants.GET_INITIAL_DATA_SUCCESS: {
			let { subjects } = action.payload;

			subjects = subjects.map(s => ({
				text: s,
				value: s
			}));
			return [{
					value: 'all',
					text: 'Выберите тематику'
				}, 
				...subjects
			]
		}
		default: return state;
	}
}

function userReducer(state={}, action){
	switch(action.type) {
		case constants.GET_INITIAL_DATA_SUCCESS: {
			const { cur_user_id, user_role } = action.payload;
			return {
				cur_user_id,
				user_role
			}
		}

		default: return state;
	}
}

function eventsReducer(state=[], action){
	switch(action.type) {

		case constants.GET_INITIAL_DATA_SUCCESS: {
			return action.payload.events;
		}

		default: return state;
	}
}

const reducer = combineReducers({
	user: userReducer,
	cities: citiesReducer,
	subjects: subjectsReducer,
	statuses: statusReducer,
	events: eventsReducer,
	ui: combineReducers({
		filters: filtersReducer
	})
});

export default reducer;