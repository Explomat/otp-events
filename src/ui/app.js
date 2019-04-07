import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';

const App = () => (
	<div>
		{ routes.map(route => (
			<Route key={ route.path } { ...route } />
		)) }
	</div>
);

export default App;