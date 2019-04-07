import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './search-bar.css';

class SearchBar extends Component {

	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {
			value: props.value || ''
		};
	}

	componentWillReceiveProps(nextProps){
		if (this.props.value !== nextProps.value){
			this.setState({ value: nextProps.value });
		}
	}

	handleChange(e){
		this.setState({ value: e.target.value });
		if (this.props.onChange){
			this.props.onChange(e.target.value);
		}
	}

	handleSearch(e){
		if (e.keyCode === 13 && this.props.onSearch){
			this.props.onSearch(e.target.value);
		}
	}

	render() {
		const className = this.props.className ? this.props.className : '';
		const classNameInput = this.props.classNameInput ? this.props.classNameInput : '';
		return (
			<div className={`search-box ${  className}`}>
				<input
					onChange={this.handleChange}
					onKeyDown={this.handleSearch}
					className={`search-box__search-input ${  classNameInput}`}
					type='text'
					value={this.state.value}
					placeholder='Поиск...'
				/>
				<i className='search-box__search-icon material-icons'>search</i>
				{this.props.children}
			</div>
		);
	}
}

SearchBar.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string,
	classNameInput: PropTypes.string,
	onSearch: PropTypes.func,
	onChange: PropTypes.func
};

export default SearchBar;