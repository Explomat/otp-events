import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
	getEventDetails,
	setParticipiantStatus,
	removeComment,
	addComment,
	editComment,
	respondParticipiant,
	refuseParticipiant,
	resolveEvent,
	rejectEvent
} from './eventDetailsActions';
import {
	Icon,
	Segment,
	Header,
	Item,
	Image,
	Grid,
	Card,
	List,
	Button,
	Comment,
	Form,
	Dimmer,
	Loader
} from 'semantic-ui-react';
import formatDate from '../../utils/formatDate';
import toBoolean from '../../utils/toBoolean';
import { find } from 'lodash';

import './event-details.css';

class EventDetails extends Component {

	constructor(props){
		super(props);

		this.state = {
			comment: '',
			isEditCommentNow: false
		}

		this.handleChangeNewComment = this.handleChangeNewComment.bind(this);
		this.handleSubmitNewComment = this.handleSubmitNewComment.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.handeShowEditCommentForm = this.handeShowEditCommentForm.bind(this);
		this.handleCancelEditComment = this.handleCancelEditComment.bind(this);
	}

	handleChangeNewComment(e, { name, value }) {
		this.setState({
			[name]: value
		});
	}

	handeShowEditCommentForm(commentId, message) {
		this.setState({
			[`comment_${commentId}`]: true,
			[`commentValue_${commentId}`]: message,
			isEditCommentNow: true
		});
	}

	handleCancelEditComment(e, commentId){
		e.preventDefault();
		this.setState({
			[`comment_${commentId}`]: false
		})
	}

	handleChangeComment(e, { name, value }) {
		this.setState({
			[name]: value
		});
	}

	handleSubmitComment(e, commentId) {
		const { submitComment, id } = this.props;

		e.preventDefault();
		submitComment(id, commentId, this.state[`commentValue_${commentId}`]);
		this.setState({
			[`comment_${commentId}`]: false,
			isEditCommentNow: false
		});
	}

	handleSubmitNewComment(e) {
		const { submitNewComment, id } = this.props;

		e.preventDefault();
		submitNewComment(id, this.state.comment);
		this.setState({
			comment: ''
		});
	}

	_adminButtons(){
		const { id, status_id, onResolveEvent, onRejectEvent, history, user_role } = this.props;
		const buttons = [];
		const isEventAdmin = user_role === 'event_admin';
		const isAdmin = user_role === 'admin';

		if (isAdmin || isEventAdmin){
			if (status_id === 'project' || status_id === 'plan'){
				buttons.push(
					<Button key={2}
						className='event-details__reject'
						size='small'
						secondary
						onClick={onRejectEvent}
						icon='close'
						content='Отменить'
					/>,
					<Button key={3}
						className='event-details__reject'
						size='small'
						color='red'
						onClick={() => history.push(`/event/edit/${id}`)}
						icon='pencil alternate'
						content='Редактировать'
					/>
				);

				if (isAdmin && status_id === 'project'){
					buttons.push(
						<Button key={1}
							className='event-details__resolve'
							size='mini'
							primary
							onClick={onResolveEvent}
							icon='check'
							content='Подтвердить'
						/>
					);
				}
			}
		}
		return buttons;
	}

	componentDidMount(){
		this.props.loadEvent();
	}

	render(){
		const {
			ui,
			history,
			id,
			cur_user_id,
			admins,
			status_id,
			status_name,
			title,
			long_desc,
			img,
			max_person_count,
			cur_person_count,
			start_date,
			finish_date,
			cost,
			event_admin_id,
			event_admin_fullname,
			event_admin_avatar,
			event_admin_position,
			address,
			like_count,
			collaborators,
			comments
		} = this.props;

		const {
			acceptParticipiantStatus,
			rejectParticipiantStatus,
			removeComment,
			onRespondParticipiant,
			onRefuseParticipiant
		} = this.props;
		const { comment, isEditCommentNow } = this.state;

		const styles = img ? { backgroundImage: `url(${img})` } : {};

		if (ui.isLoading){
			return (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			);
		}

		return (
			<div className='event-details'>
				<Button
					className='event-details__back'
					size='small'
					primary
					icon
					labelPosition='left'
					onClick={() => history.push('/')}
				>
					Назад
					<Icon name='arrow left' />
				</Button>
				<Button.Group className='event-details__admin-buttons' size='mini'>
					{this._adminButtons()}
				</Button.Group>
				<div
					className='mdl-layout__header mdl-layout__header--scroll otp-layout__header otp-layout__header--transparent mdl-color--grey-400 mdl-shadow--4dp'
					style={styles}
				>
					<div className='mdl-layout__title otp-layout__title'>
						<div className='event-details__status'>
							{status_name}
						</div>
						<div className='otp-layout__title-text mdl-typography--display-1'>
							<span className='event-details__title'>{title}</span>
						</div>
						<div className='otp-layout__subtitle'>
							С {formatDate(new Date(start_date))} по {formatDate(new Date(finish_date))}
						</div>
					</div>
				</div>
				<Segment basic>
					<Grid>
						<Grid.Row>
							<Grid.Column width={8}>
								<Header as='h2' dividing>Описание</Header>
								<Card fluid>
									<Card.Content>
										<Image avatar floated='left' size='massive' src={event_admin_avatar} />
										<Card.Header>{event_admin_fullname}</Card.Header>
										<Card.Meta>{event_admin_position}</Card.Meta>
										<Card.Description>
											<div dangerouslySetInnerHTML={{__html: long_desc}} />
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
									{cost ? (
											<span>
												<Icon name='ruble sign' color='grey'/>
												{cost}
											</span>
										) : (
										<span>Стоимость не указана</span>
									)}
									{status_id === 'plan' && find(collaborators, { id: cur_user_id }) ? 
										(
										 	<Button
												floated='right'
												size='tiny'
												basic
												color='red'
												onClick={onRefuseParticipiant}
											>
												Отказаться
											</Button>
										) : (
										 	<span>{collaborators.length < max_person_count && <Button
												floated='right'
												size='tiny'
												basic
												color='blue'
												onClick={onRespondParticipiant}
											>
												Откликнуться
											</Button>}</span>
										)
									}
									</Card.Content>
								</Card>
							</Grid.Column>
							<Grid.Column width={8}>
								<Header as='h2' dividing>Участники ({collaborators.length} / {max_person_count})</Header>
								<List divided verticalAlign='middle'>
									{
										collaborators.map((c, index) => (
											<List.Item key={index}>
												{event_admin_id === cur_user_id ? (
													<List.Content floated='right'>
														{!toBoolean(c.is_confirm) ? (
															<Button.Group size='mini'>
																<Button
																	icon='add'
																	color='green'
																	onClick={() => acceptParticipiantStatus(c.id)}
																/>
																<Button.Or text=' | '/>
																<Button
																	icon='minus'
																	color='red'
																	onClick={() => rejectParticipiantStatus(c.id)}
																/>
															</Button.Group>
														): (
															<Icon name='check' color='green' />
														)}
													</List.Content>
												): (
													<List.Content floated='right'>
														{toBoolean(c.is_confirm) ? (
															<Icon name='check' color='green' />
														): (
															<span>На утверждении</span>
														)}
													</List.Content>
												)}
												<Image avatar src={c.avatar} />
												<List.Content>{c.fullname}</List.Content>
											</List.Item>
										))
									}
								</List>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column with={16}>
								<Comment.Group>
									<Header as='h3' dividing>
										Комментарии
									</Header>
									{comments.map(c => (
										<div key={c.id} className='event-details__comment'>
											{!this.state[`comment_${c.id}`] ? (
												<Comment>
													<Comment.Avatar src={c.avatar} />
													<Comment.Content>
														<Comment.Author href='/test' as='a'>{c.user_fullname}</Comment.Author>
														<Comment.Metadata>
															<div>{formatDate(new Date(c.date))}</div>
														</Comment.Metadata>
														<Comment.Text>{c.message}</Comment.Text>
														{cur_user_id === c.user_id && <Comment.Actions>
															<Comment.Action onClick={() => this.handeShowEditCommentForm(c.id, c.message)}>
																<Icon name='pencil' />
																Редактировать
															</Comment.Action>
															<Comment.Action onClick={() => removeComment(id, c.id)}>
																<Icon name='remove' />
																Удалить
															</Comment.Action>
														</Comment.Actions>}
													</Comment.Content>
												</Comment>
											): (
												<Form className='event-details__form' reply onSubmit={(e) => this.handleSubmitComment(e, c.id)}>
													<Form.TextArea
														name={`commentValue_${c.id}`}
														value={this.state[`commentValue_${c.id}`]}
														onChange={this.handleChangeComment}
													/>
													<Button
														size='mini'
														content='Отменить'
														labelPosition='left'
														icon= 'remove'
														secondary
														floated='right'
														onClick={(e) => this.handleCancelEditComment(e, c.id)}
													/>
													<Button
														type='submit'
														size='mini'
														content='Cохранить'
														labelPosition='left'
														icon= 'edit'
														primary
														floated='right'
													/>
												</Form>
											)}
										</div>
										))
									}

									{!isEditCommentNow && <Form reply onSubmit={this.handleSubmitNewComment}>
										<Form.TextArea name='comment' value={comment} onChange={this.handleChangeNewComment}/>
										<Button
											size='tiny'
											disabled={comment.trim() === ''}
											content='Добавить комментарий'
											labelPosition='left'
											icon='edit'
											primary
											floated='right'
										/>
									</Form>}
									</Comment.Group>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state.eventDetails;
};

const mapDispatchProps = (dispatch, ownProps) => {
	const { match } = ownProps;
	return {
		loadEvent: () => dispatch(getEventDetails(match.params.permalink)),
		acceptParticipiantStatus: (userId) => dispatch(setParticipiantStatus(userId, true)),
		rejectParticipiantStatus: (userId) => dispatch(setParticipiantStatus(userId, false)),
		removeComment: (eventId, commentId) => dispatch(removeComment(eventId, commentId)),
		submitNewComment: (eventId, message) => dispatch(addComment(eventId, message)),
		submitComment: (eventId, commentId, message) => dispatch(editComment(eventId, commentId, message)),
		onRespondParticipiant: () => dispatch(respondParticipiant()),
		onRefuseParticipiant: () => dispatch(refuseParticipiant()),
		onResolveEvent: () => dispatch(resolveEvent()),
		onRejectEvent: () => dispatch(rejectEvent())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(EventDetails));