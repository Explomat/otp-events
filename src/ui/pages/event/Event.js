import React, { Component } from 'react';
import { Form, Label, Icon, Dropdown, Input, Button, TextArea, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { bindActionCreators } from 'redux';
import * as actions from './eventActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './event.css';
import 'react-datepicker/dist/react-datepicker.css';

setDefaultLocale('ru');

class Event extends Component {

	constructor(props){
		super(props);

		this.state = {
			isShowWarning: false
		}

		this.handleSave = this.handleSave.bind(this);
	}

	_isFormFilled(){
		const {
			title,
			long_desc,
			short_desc,
			address,
			city_id,
			subject_id,
			max_person_count,
			cost,
			start_date,
			finish_date
		} = this.props;
		return (
			title.trim() !== '' &&
			long_desc.trim() !== '' &&
			short_desc.trim() !== '' &&
			address.trim() !== '' &&
			city_id.trim() !== '' &&
			max_person_count.trim() !== '' &&
			cost.trim() !== '' &&
			start_date !== null &&
			finish_date !== null
		);
	}

	componentDidMount(){
		const { match } = this.props;
		this.props.getData(match.params.permalink);
	}

	handleSave(){
		if (this._isFormFilled()){
			this.props.onSaveEvent();
		} else {
			this.setState({
				isShowWarning: true
			});
		}
	}

	render(){
		const {
			history,
			onChangeTitle,
			onChangeDescription,
			onChangeShortDescription,
			onChangeStartDate,
			onChangeFinishDate,
			onChangeCity,
			onChangeSubject,
			onChangeMaxPersons,
			onChangeCost,
			onSaveEvent,
			title,
			long_desc,
			short_desc,
			address,
			city_id,
			subject_id,
			max_person_count,
			cost,
			start_date,
			finish_date,
			cities,
			subjects
		} = this.props;

		const { isShowWarning } = this.state;
		return (
			<div className='event-new'>
				<Button
					className='event-new__back'
					size='tiny'
					primary
					icon
					labelPosition='left'
					onClick={() => history.goBack()}
				>
					Назад
					<Icon name='arrow left' />
				</Button>
				<Message
					attached
					header='Создание мероприятия'
					content='Заполните форму по вашим критериям'
				/>
				<Form className='attached fluid segment'>
					<Form.Field required>
						<Label>Название *</Label>
						<Input
							placeholder='Введите название мероприятия'
							value={title}
							onChange={onChangeTitle}
						/>
					</Form.Field>
					<Form.Field required>
						<Label>Полное описание *</Label>
						 <TextArea
						 	placeholder='Опишите подробнее мероприятие'
						 	value={long_desc}
						 	style={{ minHeight: 100 }}
						 	onChange={onChangeDescription}
						 />
					</Form.Field>
					<Form.Field>
						<Label>Краткое описание *</Label>
						 <TextArea
						 	placeholder='Опишите коротко мероприятие'
						 	value={short_desc}
						 	style={{ minHeight: 100 }}
						 	onChange={onChangeShortDescription}
						 />
					</Form.Field>
					<Form.Group inline>
						<Form.Field>
								<label className='event-new__calendar-label'> C *</label>
								<Icon
									className='event-new__calendar-icon'
									name='calendar'
									size='large'
								/>
								<DatePicker
									locale={ru}
									selected={start_date}
									showTimeSelect
									timeIntervals={10}
			    					timeFormat='HH:mm'
			    					dateFormat='d MMMM, HH:mm'
			    					timeCaption='время'
			    					placeholderText='Дата начала'
			    					onChange={onChangeStartDate}
								/>
						</Form.Field>
						<Form.Field>
								<label className='event-new__calendar-label'> По *</label>
								<Icon
									className='event-new__calendar-icon'
									name='calendar'
									size='large'
								/>
								<DatePicker
									locale={ru}
									selected={finish_date}
									showTimeSelect
									timeIntervals={10}
			    					timeFormat='HH:mm'
			    					dateFormat='d MMMM, HH:mm'
			    					timeCaption='время'
			    					placeholderText='Дата окончания'
			    					onChange={onChangeFinishDate}
								/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Field required>
							<Label>Город *</Label>
							<Dropdown
								placeholder='Выберите город'
								upward
								search
								selection
								options={cities}
								onChange={onChangeCity}
								value={city_id}
							/>
						</Form.Field>
						<Form.Field required>
							<Label>Адрес *</Label>
							<Input  placeholder='Введите адрес' />
						</Form.Field>
					</Form.Group>
					<Form.Field>
						<Label>Тематика проведения *</Label>
						<Dropdown
							placeholder='Выберите тематику'
							upward
							fluid
							selection
							options={subjects}
							onChange={onChangeSubject}
							value={subject_id}
						/>
					</Form.Field>
					<Form.Group widths='equal'>
						<Form.Field>
							<Label>Кол-во участников *</Label>
							<Input
								placeholder='Введите кол-во участников'
								type='text'
								onChange={onChangeMaxPersons}
								value={max_person_count}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Стоимость *</Label>
							<Input
								action={{ icon: 'ruble sign' }}
								labelPosition='right'
								placeholder='Введите стоимость'
								type='text'
								onChange={onChangeCost}
								value={cost}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Field>
						<div className='event-new__file_upload'>
							<Button size='tiny'>Выберите изображение</Button>
							<div className='event-new__file_upload-name'>Файл не выбран</div>
							<input type='file' accept='image/*'/>
						</div>
					</Form.Field>
					<Button
						primary
						size='small'
						type='submit'
						onClick={this.handleSave}
					>Сохранить</Button>
				</Form>
				
				<Message attached='bottom' warning>
					<Icon name='help' />
					Поля помеченные &nbsp;*&nbsp; обязательные для заполнения
					{isShowWarning && <Message error>
					<Icon name='exclamation' />
					Заполнены не все поля!
				</Message>}
				</Message>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return state.event;
};

const mapDispatchProps = (dispatch, ownProps) => {
	return {
		...bindActionCreators(actions, dispatch),
		onSaveEvent: () => dispatch(actions.saveEvent(ownProps.history))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(Event));