import { constants } from './filtersActions';
import { constants as homeConstatns } from '../homeActions';

const initialState = {
	search: '',
	page: 1,
	pagesCount: 1,
	status: 'all',
	subject: 'all',
	city: 'all',
	ui: {
		isLoading: false
	}
}

export default function reducer(state = initialState, action) {
	switch(action.type) {

		case homeConstatns.GET_INITIAL_DATA_SUCCESS: {
			return {
				...state,
				pagesCount: action.payload.pagesCount
			}
		}

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

		case constants.CHANGE_PAGE: {
			return {
				...state,
				page: action.payload
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