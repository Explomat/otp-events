import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function withAdmin(WrappedComponent) {
	const WithAdmin = ( props ) => {
		if ( !props.isAdmin ) {
			return null;
		}

		return ( <WrappedComponent { ...props } /> );
	};

	WithAdmin.propTypes = {
		isAdmin: PropTypes.bool.isRequired,
	};

	const mapStateToProps = (state) => ({
		isAdmin: state.session.isAdmin
	});

	return connect(mapStateToProps)(WithAdmin);
}