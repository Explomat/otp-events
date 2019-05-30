import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popup, Icon } from 'semantic-ui-react'
import cs from 'classnames';
import PropTypes from 'prop-types';
import { url } from '../../../../config';
import toBoolean from '../../../utils/toBoolean';

import './eventOfList.css';

class Event extends Component {

	constructor(props){
		super(props);

		this.state = {
			like_count: props.like_count,
			is_liked: toBoolean(props.is_liked)
		}
		this.handleLike = this.handleLike.bind(this);
	}

	handleLike(e) {
		e.preventDefault();
		const self = this;

		const path = url.createPath({
			server_name: 'events',
			action_name: 'Like'
		});

		axios({
			method: 'post',
			url: path,
			data: JSON.stringify({
				id: this.props.id
			})
		})
		.then(resp => {
			return resp.data;
		}).then(data => {
			self.setState({
				like_count: data.count,
				is_liked: !self.state.is_liked
			})
		}).catch(e => {
			console.error(e.message);
		});
	}

	render(){
		const {
			id,
			title,
			short_desc,
			subject_id,
			city,
			img,
			max_person_count,
			cur_person_count,
			start_date,
			cost,
			event_admin_fullname,
			event_admin_avatar,
			address,
			comments_count
		} = this.props;

		const { like_count, is_liked } = this.state;

		const isLikedClass = cs({
			'mdl-button--colored': is_liked
		});
		return (
			<Link className='event-of-list' to={`/event/details/${id}`}
				className='mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp otp-news otp-news__link'
			>
				<div className='mdl-card__title'>
					<div className='mdl-card__subtitle-text otp-event__type'>{subject_id}</div>
				</div>
				<div
					className='mdl-card__media mdl-card__media--h-140 mdl-color--grey-500'
					style={{
						background: `url(${img}) center/cover no-repeat`
					}}
				>
					<span
						style={{marginBottom: 0}}
						className='mdl-color--light-blue-900 mdl-color-text--white otp-card__media-label otp-event__date'>
						{city}
					</span>
					<span className='mdl-color--primary mdl-color-text--white otp-card__media-label otp-event__date'>
						{new Date(start_date).toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}
					</span>
					<div className='event-of-list__lectors'>
						<Popup inverted size='mini' trigger={
							<div className='event-of-list__lector' style={{
								backgroundImage: `url(${event_admin_avatar})`
							}} />
						}>
							{event_admin_fullname}
						</Popup>
					</div>
				</div>
				<div className='mdl-card__title' style={{ paddingRight: '60px' }}>
					<div className='mdl-card__subtitle-text otp-event__place'>{address}</div>
					<div className='mdl-card__title-text otp-event__name'>{title}&nbsp;</div>
				</div>
				<div className='mdl-card__supporting-text mdl-card--expand otp-event__comment'>
					<div>
						<i>{short_desc}</i>
					</div>
				</div>
				<div className='mdl-card__actions mdl-card--border'>
					<div className='otp-action__item'>
						<button onClick={this.handleLike} className={`mdl-button mdl-button--icon otp-news__like-button ${isLikedClass}`}>
							<i className='material-icons mdl-18 otp-action__icon'>thumb_up</i>
						</button>
						<span className='otp-action__label otp-news__like'>{like_count}</span>
					</div>
					<div className='otp-action__item'>
						<i className='material-icons mdl-18 otp-action__icon'>forum</i>
						<span className='otp-action__label otp-news__comment-count'>{comments_count}</span>
					</div>
					<div className='otp-action__item' style={{
						position: 'absolute',
						right: 0
					}}>
						{cost == 0 ?
							<span className='otp-color--black-hint'>Бесплатное</span> :
							<span>
								<Icon name='ruble sign' color='grey'/>
								<span
									className='otp-action__label otp-news__comment-count otp-color--black-hint'
								>
									{cost}
								</span>
							</span>
						}
					</div>
				</div>
				{/*<div className='mdl-card__actions'>
					<Link to={`/event/details/${id}`} className='mdl-button mdl-button--colored otp-event__link'>Подробнее</Link>
					<div className='mdl-layout-spacer'></div>
				</div>*/}
				<div className='mdl-card__menu'>
					<span
						className='otp-color--black-hint'
						style={{
							display: 'flex',
							alignItems: 'center'}}
						title='Количество участников'
					>
						{max_person_count == 0 ?
							<span>
								Без ограничений
							</span> :
							<span style={{
								display: 'flex',
								alignItems: 'center'}}
							>
								<i className='material-icons' style={{marginRight: '4px'}}>group</i>
								<b className='otp-event__count'>{cur_person_count} / {max_person_count}</b>
							</span>
						}
					</span>
				</div>
			</Link>
		);
	}
}


export default Event;