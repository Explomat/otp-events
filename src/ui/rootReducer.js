import { combineReducers } from 'redux';
import homeReducer from './pages/home/reducer';
import eventReducer from './pages/event/eventReducer';
import eventDetailsReducer from './pages/details-event/eventDetailsReducer';

const reducer = combineReducers({
	home: homeReducer,
	event: eventReducer,
	eventDetails: eventDetailsReducer
});

export default reducer;

