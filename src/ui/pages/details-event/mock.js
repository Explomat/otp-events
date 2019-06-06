import { find, findIndex } from 'lodash';
import uuid from '../../utils/uuid';


const events = [
	{
		"id": "6668962976716051403",
		"cur_user_id": "6148914691236517121",
		"user_role": "admin",
		"title": "Речная прогулка по Москве реке",
		"status_name": "Плнируется",
		"status_id": "plan",
		"long_desc": "Круиз через весь&nbsp;центр Москвы на комфортабельном, двухпалубном теплаходе &quot;МАЭСТРО&quot;. В программе мероприятия шикарный ужин, музыкальная программа и завораживающий вид&nbsp; с борта теплохода на достопримечательности Москвы.",
		"img": "/download_file.html?file_id=6668970663716716859",
		"max_person_count": "25",
		"start_date": "Sat, 01 Jun 2019 16:00:00 +0300",
		"finish_date": "Sat, 01 Jun 2019 19:00:00 +0300",
		"cost": "150000",
		"city_id": "5667697629116916688",
		"city": "Москва",
		"subject_id": "Развлечение",
		"address": "г. Москва, Крымский Вал, 9",
		"phone_number": "84967281726",
		"email": "user_019@gmail.com",
		"event_admin_id": "6671630922937078440",
		"event_admin_fullname": "Антонова Елена Анатольевна",
		"event_admin_position": "Начальник отдела",
		"event_admin_avatar": "/download_file.html?file_id=6671631649276712429",
		"like_count": "3",
		"collaborators": [
		{
		  "id": "6671537774053763818",
		  "fullname": "Павленко Ирина Леонидовна",
		  "is_confirm": "true",
		  "avatar": "/download_file.html?file_id=6671538400859850742"
		},
		{
		  "id": "6671536515542115698",
		  "fullname": "Калугина Елена Руслановна",
		  "is_confirm": "true",
		  "avatar": "/download_file.html?file_id=6671537379586870665"
		},
		{
		  "id": "6670724707302122721",
		  "fullname": "Петров Петр Петрович",
		  "is_confirm": "true",
		  "avatar": "/download_file.html?file_id=6669106315989699280"
		},
		{
		  "id": "6148914691236517121",
		  "fullname": "Иванов Иван Иванович",
		  "is_confirm": "false",
		  "avatar": "/download_file.html?file_id=6671540961322951686"
		}
		],
		"comments": [
		{
		  "id": "6677220343771366295",
		  "user_id": "6148914691236517121",
		  "avatar": "/download_file.html?file_id=6671540961322951686",
		  "user_fullname": "Иванов Иван Иванович",
		  "date": "Sun, 07 Apr 2019 21:25:10 +0300",
		  "message": "fsfs"
		}
		],
		"cities": [
		{
		  "id": "5667697629116916643",
		  "name": "Абакан"
		},
		{
		  "id": "5667697629116916644",
		  "name": "Аксай"
		},
		{
		  "id": "5667697629116916645",
		  "name": "Актау"
		},
		{
		  "id": "5667697629116916646",
		  "name": "Актобе"
		},
		{
		  "id": "5667697629116916647",
		  "name": "Алматы"
		},
		{
		  "id": "5667697629116916648",
		  "name": "Архангельск"
		},
		{
		  "id": "5667697629116916649",
		  "name": "Астана"
		}
		],
		"subjects": [
			"Образование",
			"Спорт",
			"Здоровье",
			"Путешествия, туризм",
			"Культура",
			"Развлечение"
		]
	}
]

const data = events[0];

export function setParticipiantStatusMock(eventId, userId, isConfirm){
	const event = find(events, { id: eventId });
	if (event){
		const index = findIndex(event.collaborators, { id: userId });
		if (index !== -1){
			if (isConfirm){
				event.collaborators[index].is_confirm = isConfirm;
			} else {
				event.collaborators.splice(index, 1);
			}
		}
	}
}

export function setCommentMock(eventId, commentId, message){
	const event = find(events, { id: eventId });
	if (event){
		if (commentId !== null && commentId !== undefined) {
			const comment = find(event.comments, { id: commentId });
			if (comment) {
				comment.message = message;
			}
		} else {
			const newComment = {
				"id": uuid(),
				"user_id": uuid(),
				"avatar": "/download_file.html?file_id=6669106315989699280",
				"user_fullname": "Иванов Иван Иванович",
				"date": new Date(),
				"message": message
			};
			event.comments = event.comments.concat([newComment]);
			return newComment;
		}
	}
}

export function removeCommentMock(eventId, commentId){
	const event = find(events, { id: eventId });
	if (event){
		const index = findIndex(event.comments, { id: commentId });
		if (index !== -1){
			event.comments.splice(index, 1);
		}
	}
}

export default data;