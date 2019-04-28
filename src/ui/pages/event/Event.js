import React, { Component } from 'react';
import { Form, Label, Icon, Dropdown, Input, Button, TextArea, Message, Dimmer,  Loader } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { bindActionCreators } from 'redux';
import * as actions from './eventActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import './event.css';
import 'react-datepicker/dist/react-datepicker.css';

setDefaultLocale('ru');

class Event extends Component {

	constructor(props){
		super(props);

		this.state = {
			isShowWarning: false,
			fileName: props.img_name || ''
		}

		this.formRef = React.createRef();

		this.handleSave = this.handleSave.bind(this);
		this.onChangeRawStartDate = this.onChangeRawStartDate.bind(this);
		this.onChangeRawFinishDate = this.onChangeRawFinishDate.bind(this);
		this.handleChangeFile = this.handleChangeFile.bind(this);
		this.dateFormat = 'dd.MM.yyyy, HH:mm';
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
		//const { fileName } = this.state;
		return (
			title.trim() !== '' &&
			long_desc.trim() !== '' &&
			short_desc.trim() !== '' &&
			address.trim() !== '' &&
			city_id.trim() !== '' &&
			max_person_count !== '' &&
			cost !== '' &&
			start_date !== null &&
			finish_date !== null
		);
	}

	componentDidMount(){
		const { match } = this.props;
		this.props.getData(match.params.permalink);
	}

	handleChangeFile(e) {
		const path = e.target.value;
		const lastIndex = path.lastIndexOf('\\');
		const fname = lastIndex === -1 ? path : path.substring(lastIndex + 1, path.length);
		/*this.setState({
			fileName: fname
		});*/
		this.props.onChangeFileName(fname);
		//this.props.onResetPrevFile();
	}

	handleSave(){
		if (this._isFormFilled()){
			this.props.onSaveEvent(document.getElementById('event-new_form'));
		} else {
			this.setState({
				isShowWarning: true
			});
		}
	}

	onChangeRawStartDate(e){
		if (moment(e.target.value, this.dateFormat).isValid()){
			this.props.onChangeStartDate(e.target.value);
		}
	}

	onChangeRawFinishDate(e){
		if (moment(e.target.value, this.dateFormat).isValid()){
			this.props.onChangeFinishDate(e.target.value);
		}
	}


	render(){
		const {
			ui,
			history,
			onChangeTitle,
			onChangeDescription,
			onChangeShortDescription,
			onChangeStartDate,
			onChangeFinishDate,
			onChangeCity,
			onChangeAddress,
			onChangeSubject,
			onChangeMaxPersons,
			onChangeCost,
			onSaveEvent,
			id,
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
			subjects,
			img_name,
			prevFileId
		} = this.props;

		const { isShowWarning } = this.state;

		if (ui.isLoading){
			return (
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
			);
		}

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
					header='Создание/Редактирование мероприятия'
					content='Заполните форму по вашим критериям'
				/>
				<Form id='event-new_form' className='attached fluid segment' encType='multipart/form-data'>
					<Form.Field>
						<input type='text' className='event-new__form-field' name='id' value={id} readOnly />
					</Form.Field>
					<Form.Field required>
						<Label>Название *</Label>
						<Input
							name='title'
							placeholder='Введите название мероприятия'
							value={title}
							onChange={onChangeTitle}
						/>
					</Form.Field>
					<Form.Field required>
						<Label>Полное описание *</Label>
						 <TextArea
						 	name='long_desc'
						 	placeholder='Опишите подробнее мероприятие'
						 	value={long_desc}
						 	style={{ minHeight: 100 }}
						 	onChange={onChangeDescription}
						 />
					</Form.Field>
					<Form.Field>
						<Label>Краткое описание *</Label>
						 <TextArea
						 	name='short_desc'
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
									name='start_date'
									locale={ru}
									selected={start_date}
									showTimeSelect
									timeIntervals={10}
			    					timeFormat='HH:mm'
			    					dateFormat={this.dateFormat}
			    					timeCaption='время'
			    					placeholderText='Дата начала'
			    					onChange={onChangeStartDate}
			    					onChangeRaw={this.onChangeRawStartDate}
			    					disabledKeyboardNavigation
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
									name='finish_date'
									locale={ru}
									selected={finish_date}
									showTimeSelect
									timeIntervals={10}
			    					timeFormat='HH:mm'
			    					dateFormat={this.dateFormat}
			    					timeCaption='время'
			    					placeholderText='Дата окончания'
			    					onChange={onChangeFinishDate}
			    					onChangeRaw={this.onChangeRawFinishDate}
			    					disabledKeyboardNavigation
								/>
						</Form.Field>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Field required>
							<Label>Город *</Label>
							<input readOnly className='event-new__form-field' type='text' name='city_id' value={city_id} />
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
							<Input type='text' name='address' placeholder='Введите адрес' value={address} onChange={onChangeAddress}/>
						</Form.Field>
					</Form.Group>
					<Form.Field>
						<Label>Тематика проведения *</Label>
						<input readOnly className='event-new__form-field' type='text' name='subject_id' value={subject_id} />
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
							<Label>Кол-во участников (0 - неограниченно) *</Label>
							<Input
								name='max_person_count'
								placeholder='Введите кол-во участников'
								type='text'
								onChange={onChangeMaxPersons}
								value={max_person_count}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Стоимость (0 - бесплатно) *</Label>
							<Input
								name='cost'
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
							<div className='event-new__file_upload-name'>{img_name || 'Файл не выбран'}</div>
							<input readOnly className='event-new__form-field' type='text' name='prev_file_id' value={prevFileId} />
							<input type='file' name='upload_file' accept='image/*' onChange={this.handleChangeFile}/>
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
		onSaveEvent: (formRef) => dispatch(actions.saveEvent(formRef, ownProps.history))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(Event));