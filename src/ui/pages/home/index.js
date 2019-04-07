import React, { Component } from 'react';
import Event from './event';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import Filters from './filters';
import { connect } from 'react-redux';
import { getInitialData } from './homeActions';
import { clearFields } from './filters/filtersActions';

import './home.css';

class Home extends Component {

	componentDidMount(){
		this.props.loadData();
	}

	render(){
		const { events } = this.props;
		const len = events.length;

		return (
			<div className='home'>
				<Filters />
				<div className='clearfix' />
				<div className='mdl-grid mdl-grid--no-spacing'>
					<div className='mdl-cell mdl-cell--12-col-desktop'>
						<div className='mdl-grid'>
							{len > 0 ?
								events.map(e => <Event key={e.id} {...e}/>)
								:
								<Segment className='home__not-found' placeholder>
									<Header icon>
										<Icon name='search' />
										Мы не нашли ничего по вашему запросу {"    "} :(
									</Header>
									<Segment.Inline>
										<Button
											size='tiny'
											positive
											onClick={this.props.clear}
										>Очистить фильтры</Button>
									</Segment.Inline>
								</Segment>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ( state ) => {
	return { ...state.home };
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadData: () => {
			dispatch(getInitialData());
		},
		clear: () => {
			dispatch(clearFields());
			dispatch(getInitialData());
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);