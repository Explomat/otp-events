import { constants } from './eventDetailsActions';
import { combineReducers } from 'redux';

function commentsReducer(state=[], action){
	switch(action.type){
		case constants.REMOVE_EVENT_DETAILS_COMMENT_SUCCESS: {
			return state.filter(c => c.id !== action.payload.commentId);
		}

		case constants.ADD_EVENT_DETAILS_COMMENT_SUCCESS: {
			return state.concat([ {
				...action.payload
			} ])
		}

		case constants.EDIT_EVENT_DETAILS_COMMENT_SUCCESS: {
			return state.map(c => {
					if (c.id === action.payload.commentId){
						return {
							...c,
							message: action.payload.message
						}
					}
					return c;
				});
		}

		default: return state;
	}
}

function collaboratorsReducer(state=[], action) {
	switch (action.type) {
		case constants.SET_EVENT_DETAILS_PARTICIPANT_STATUS_SUCCESS: {
			if (action.payload.isConfirm){
				return state.map(c => {
					return {
						...c,
						is_confirm: c.id == action.payload.userId ? true : c.is_confirm
					}
				});
			} else {
				return state.filter(c => {
					return c.id != action.payload.userId
				});
			}
		}

		case constants.RESPOND_EVENT_DETAILS_PARTICIPANT_SUCCESS: {
			return state.concat([action.payload]);
		}

		case constants.REFUSE_EVENT_DETAILS_PARTICIPANT_SUCCESS: {
			return state.filter(c => c.id !== action.payload.id);
		}
		
		default: return state;
	}
}

function uiReducer(state = {
	isLoading: false
}, action){
	switch(action.type) {

		case constants.EVENT_DETAILS_LOADING: {
			return {
				...state,
				isLoading: action.payload
			}
		}

		default: return state;
	}
}

export default function eventDetailsReducer(state={
	collaborators: [],
	comments: [],
	admins: [],
	ui: {
		isLoading: false
	}
}, action){
	switch(action.type) {

		case constants.GET_EVENT_DETAILS_INITIAL_DATA_SUCCESS: {
			return {
				...state,
				...action.payload
			}
		}

		case constants.EVENT_DETAILS_SET_STATUS: {
			return {
				...state,
				status_id: action.payload.status_id,
				status_name: action.payload.status_name
			}
		}

		case constants.REFUSE_EVENT_DETAILS_PARTICIPANT_SUCCESS:
		case constants.RESPOND_EVENT_DETAILS_PARTICIPANT_SUCCESS:
		case constants.SET_EVENT_DETAILS_PARTICIPANT_STATUS_SUCCESS: {

			const newState = {
				...state,
				collaborators: collaboratorsReducer(state.collaborators, action)
			}

			return newState;
		}

		case constants.REMOVE_EVENT_DETAILS_COMMENT_SUCCESS:
		case constants.ADD_EVENT_DETAILS_COMMENT_SUCCESS:
		case constants.EDIT_EVENT_DETAILS_COMMENT_SUCCESS: {
			return {
				...state,
				comments: commentsReducer(state.comments, action) 
			}
		}

		case constants.EVENT_DETAILS_LOADING: {
			return {
				...state,
				ui: uiReducer(state.ui, action)
			}
		}
		default: return state;
	}
}