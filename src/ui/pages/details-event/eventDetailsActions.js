import { url } from '../../../config';
import createRemoteActions from '../../utils/createRemoteActions';
//import mock, { setParticipiantStatusMock, removeCommentMock, setCommentMock } from './mock';

export const constants = {
	...createRemoteActions([
		'GET_EVENT_DETAILS_INITIAL_DATA',
		'SET_EVENT_DETAILS_PARTICIPANT_STATUS',
		'REMOVE_EVENT_DETAILS_COMMENT',
		'ADD_EVENT_DETAILS_COMMENT',
		'EDIT_EVENT_DETAILS_COMMENT',
		'RESPOND_EVENT_DETAILS_PARTICIPANT',
		'REFUSE_EVENT_DETAILS_PARTICIPANT'
	])
}


export function getEventDetails(id){
	return dispatch => {
		const path = url.createPath({
			server_name: 'events',
			action_name: 'EventData',
			id
		});

		fetch(path)
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.log(data.error);
			} else {
				dispatch({
					type: constants.GET_EVENT_DETAILS_INITIAL_DATA_SUCCESS,
					payload: data
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.log(e.message);
		});
		/*setTimeout(() => {
			dispatch({
				type: constants.GET_EVENT_DETAILS_INITIAL_DATA_SUCCESS,
				payload: { ...mock }
			});
		}, 300)*/
	}
}

export function respondParticipiant() {
	return (dispatch, getState) => {
		const { eventDetails } = getState();

		const path = url.createPath({
			server_name: 'events',
			action_name: 'NewParticipiant'
		});

		fetch(path, {
			method: 'POST',
			body: JSON.stringify({
				id: eventDetails.id
			})
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.log(data.error);
			} else {
				dispatch({
					type: constants.RESPOND_EVENT_DETAILS_PARTICIPANT_SUCCESS,
					payload: data
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.log(e.message);
		});
	}
}

export function refuseParticipiant() {
	return (dispatch, getState) => {
		const { eventDetails } = getState();

		const path = url.createPath({
			server_name: 'events',
			action_name: 'Refuse'
		});

		fetch(path, {
			method: 'POST',
			body: JSON.stringify({
				id: eventDetails.id
			})
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.log(data.error);
			} else {
				dispatch({
					type: constants.REFUSE_EVENT_DETAILS_PARTICIPANT_SUCCESS,
					payload: data
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.log(e.message);
		});
	}
}

export function setParticipiantStatus(userId, isConfirm){
	return (dispatch, getState) => {
		const { eventDetails } = getState();

		const path = url.createPath({
			server_name: 'events',
			action_name: 'ParticipiantStatus'
		});

		fetch(path, {
			method: 'POST',
			body: JSON.stringify({
				id: eventDetails.id,
				user_id: userId,
				accept: isConfirm
			})
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.error(data.error);
			} else {
				dispatch({
					type: constants.SET_EVENT_DETAILS_PARTICIPANT_STATUS_SUCCESS,
					payload: {
						userId,
						isConfirm
					}
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.error(e.message);
		});
		/*setTimeout(() => {
			setParticipiantStatusMock(id, userId, isConfirm);
			dispatch({
				type: constants.SET_EVENT_DETAILS_PARTICIPANT_STATUS_SUCCESS,
				payload: {
					userId,
					isConfirm
				}
			});
		}, 100)*/
	}
}

export function removeComment(eventId, commentId){
	return (dispatch) => {
		const path = url.createPath({
			server_name: 'events',
			action_name: 'RemoveComment'
		});

		fetch(path, {
			method: 'POST',
			body: JSON.stringify({
				id: eventId,
				comment_id: commentId
			})
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.error(data.error);
			} else {
				dispatch({
					type: constants.REMOVE_EVENT_DETAILS_COMMENT_SUCCESS,
					payload: {
						eventId,
						commentId
					}
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.error(e.message);
		});
		/*setTimeout(() => {
			dispatch({
				type: constants.REMOVE_EVENT_DETAILS_COMMENT_SUCCESS,
				payload: {
					eventId,
					commentId
				}
			});
			removeCommentMock(eventId, commentId);
		});*/
	}
}

export function addComment(eventId, message) {
	return (dispatch) => {
		const path = url.createPath({
			server_name: 'events',
			action_name: 'AddComment'
		});

		fetch(path, {
			method: 'POST',
			body: JSON.stringify({
				id: eventId,
				message
			})
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.error(data.error);
			} else {
				dispatch({
					type: constants.ADD_EVENT_DETAILS_COMMENT_SUCCESS,
					payload: data
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.error(e.message);
		});
		/*setTimeout(() => {
			const comment = setCommentMock(eventId, null, message);
			dispatch({
				type: constants.ADD_EVENT_DETAILS_COMMENT_SUCCESS,
				payload: comment
			});
		});*/
	}
}

export function editComment(eventId, commentId, message) {
	return (dispatch) => {
		const path = url.createPath({
			server_name: 'events',
			action_name: 'AddComment'
		});

		fetch(path, {
			method: 'POST',
			body: JSON.stringify({
					id: eventId,
					comment_id: commentId,
					message
				})
		})
		.then(resp => {
			return resp.json();
		})
		.then(data => {
			if (data.error){
				//dispatch(error(data.error));
				console.error(data.error);
			} else {
				dispatch({
					type: constants.EDIT_EVENT_DETAILS_COMMENT_SUCCESS,
					payload: {
						commentId,
						message
					}
				});
			}
		}).catch(e => {
			//dispatch(error(e.message));
			console.error(e.message);
		});
		/*setTimeout(() => {
			setCommentMock(eventId, commentId, message);
			dispatch({
				type: constants.EDIT_EVENT_DETAILS_COMMENT_SUCCESS,
				payload: {
					commentId,
					message
				}
			});
		});*/
	}
}