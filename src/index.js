import 'core-js/features/set';
import 'core-js/features/map';


import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './ui/app';
import configureStore from './store';
import './css/material.font.css';
import './css/material.min.css';
import './css/global.css';

import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const render = () => (
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);

ReactDOM.render(render(), document.getElementById('root'));


