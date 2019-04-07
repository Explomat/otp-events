import { constants } from './eventActions';

export default function eventNewReducer(state = {
	title: '',
	long_desc: '',
	short_desc: '',
	start_date: new Date(),
	finish_date: new Date(),
	city: '',
	city_id: '',
	address: '',
	subject_id: '',
	max_person_count: 0,
	cost: 0,
	cities: [],
	subjects: []
}, action){
	switch(action.type) {

		case constants.GET_EVENT_CREATE_SUCCESS: {
			let { cities, subjects } = action.payload;
			cities = cities.map(c => ({
				text: c.name,
				value: c.id
			}));

			subjects = subjects.map(s => ({
				text: s,
				value: s
			}));
			return {
				...state,
				...action.payload,
				start_date: action.payload.start_date ? new Date(action.payload.start_date): new Date(),
				finish_date: action.payload.finish_date ? new Date(action.payload.finish_date): new Date(),
				cities,
				subjects
			}
		}

		case constants.NEW_EVENT_CHANGE_TITLE: {
			return {
				...state,
				title: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_DESCRIPTION: {
			return {
				...state,
				long_desc: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_SHORT_DESCRIPTION: {
			return {
				...state,
				short_desc: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_START_DATE: {
			return {
				...state,
				start_date: action.payload
			}	
		}

		case constants.NEW_EVENT_CHANGE_FINISH_DATE: {
			return {
				...state,
				finish_date: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_CITY: {
			return {
				...state,
				city_id: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_SUBJECT: {
			return {
				...state,
				subject_id: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_MAX_PERSONS: {
			return {
				...state,
				max_person_count: action.payload
			}
		}

		case constants.NEW_EVENT_CHANGE_COST: {
			return {
				...state,
				cost: action.payload
			}
		}

		default: return state;
	}
}