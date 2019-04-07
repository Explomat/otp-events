import Home from '../pages/home';
import { lazyLoad } from '../enhancers';

const routes = [
	{
		path: '/',
		component: Home,
		exact: true
	},
	{
		path: '/event/details/:permalink',
		component: lazyLoad(() => new Promise((resolve, reject) => {
			resolve(require('../pages/details-event').default)
		})),
		exact: true
	},
	{
		path: '/event/edit/:permalink',
		component: lazyLoad(() => new Promise((resolve, reject) => {
			resolve(require('../pages/event').default)
		})),
		exact: true
	},
	{	path: '/event/new',
		component: lazyLoad(() => new Promise((resolve, reject) => {
			resolve(require('../pages/event').default)
		})),
		exact: true
	}
];

export default routes;