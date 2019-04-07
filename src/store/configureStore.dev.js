import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../ui/rootReducer';

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(){
	const enhancer = composeEnhancers(
		applyMiddleware(
			thunkMiddleware,
			createLogger()
		)
	);

	const store = createStore(reducers, enhancer);

	if (module.hot) {
		module.hot.accept('../ui/rootReducer', () =>
			store.replaceReducer(require('../ui/rootReducer').default)
		);
	}

	return store;
}