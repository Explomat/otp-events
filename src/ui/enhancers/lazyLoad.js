import React, { Component } from 'react';
import { object } from 'prop-types';

class LazyLoad extends Component {
	
	componentWillMount() {
		const self = this;
		this.props.load.then(comp => {
			self.comp = comp;
			self.forceUpdate();
		});
	}
	render() {
		const Component = this.comp;
		return Component ? <Component /> : null;
	}
}

LazyLoad.propTypes = {
	load: object
};

export default (dynamicImport) => () => (
	<LazyLoad load={ dynamicImport() } />
);