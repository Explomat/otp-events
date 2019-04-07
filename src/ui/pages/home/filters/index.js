import React, { Component } from 'react';
import SearchBar from '../../../components/search-bar';
import { Grid, Search, Dropdown, Button, Icon } from 'semantic-ui-react';
//import { ButtonSuccess, ButtonWarning, ButtonInfo, ButtonDanger } from '../../../components/button';
import { changeStatus, changeSearch, changeSubject, changeCity, search, statuses } from './filtersActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './filters.css';

const Filters = ({
	onChangeStatus,
	onChangeSearch,
	onChangeSubject,
	onChangeCity,
	filter,
	search,
	status,
	subject,
	city,
	cities,
	subjects,
	statuses,
	history 
}) => {
	//const { ALL, SELF, PLAN } = visibilityFilters;
	return (
		<div className='filters'>
			<Grid columns='equal'>
				<Grid.Column width={4}>
					<SearchBar
						className='filters__search-bar'
						onChange={ onChangeSearch }
						onSearch={ filter }
						value={search}
					/>
				</Grid.Column>
				<Grid.Column width={9}>
					<Dropdown
						className='filters__dropdown'
						placeholder='Выберите город'
						search
						selection
						options={cities}
						onChange={onChangeCity}
						value={city}
					/>

					<Dropdown
						className='filters__dropdown'
						placeholder='Выберите тематику'
						selection
						options={subjects}
						onChange={onChangeSubject}
						value={subject}
					/>

					<Dropdown
						className='filters__dropdown'
						placeholder='Выберите статус'
						selection
						options={statuses}
						onChange={onChangeStatus}
						value={status}
					/>

					{/*<Button
						color='green'
						active={status === ALL}
						onClick={() => onChangeStatus(ALL)}

					>Все</Button>
					<Button
						color='yellow'
						active={status === SELF}
						onClick={() => onChangeStatus(SELF)}
					>Мои</Button>
					<Button
						color='blue'
						active={status === PLAN}
						onClick={() => onChangeStatus(PLAN)}
					>Планируются</Button>*/}
				</Grid.Column>
				<Grid.Column floated='right'>
					<Button
						size='tiny'
						className='filters__button filters__create-event'
						color='red'
						icon
						labelPosition='left'
						onClick={() => history.push('/event/new')}
					>
						Создать
						<Icon name='pencil alternate' />
					</Button>
				</Grid.Column>
			</Grid>
		</div>
	);
}


const mapStateToProps = (state) => {
	const { user, statuses, cities, subjects } = state.home;

	const _statuses = statuses.filter(s => {
		return s.roles.indexOf(user.user_role) !== -1;
	});

	return {
		cities,
		subjects,
		statuses: _statuses,
		...state.home.ui.filters
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeStatus: (event, data) => {
			dispatch(changeStatus(data.value));
			dispatch(search());
		},
		onChangeSearch: (value) => {
			dispatch(changeSearch(value));
		},
		onChangeSubject: (event, data) => {
			dispatch(changeSubject(data.value));
			dispatch(search());
		},
		onChangeCity: (event, data) => {
			dispatch(changeCity(data.value));
			dispatch(search());
		},
		filter: () => {
			dispatch(search());
		}
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters));