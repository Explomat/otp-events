import { constants } from './filtersActions';

const initialState = {
	search: '',
	status: 'all',
	subject: 'all',
	city: 'all'
}

export default function reducer(state = initialState, action) {
	switch(action.type) {

		case constants.CLEAR_FIELDS: {
			return {
				...initialState
			}
		}

		case constants.CHANGE_SEARCH: {
			return {
				...state,
				search: action.payload
			}
		}

		case constants.CHANGE_STATUS: {
			return {
				...state,
				status: action.payload
			}
		}

		case constants.CHANGE_SUBJECT: {
			return {
				...state,
				subject: action.payload
			}
		}

		case constants.CHANGE_CITY: {
			return {
				...state,
				city: action.payload
			}
		}

		default: return state;
	}
}