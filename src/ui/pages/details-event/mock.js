import { find, findIndex } from 'lodash';
import uuid from '../../utils/uuid';


const events = [
	{
		"id": "6673021011384420043",
		"cur_user_id": "6148914691236517121",
		"title": "Event LIVE 2019",
		"status_name": "plan",
		"long_desc": "<span style='-webkit-text-stroke-width:0px; background-color:rgb(255, 255, 255); color:rgb(50, 49, 49); display:inline !important; float:none; font-family:arial,helvetica,sans-serif; font-size:13.2px; font-style:normal; font-variant-caps:normal; font-variant-ligatures:normal; font-weight:400; letter-spacing:normal; orphans:2; text-align:justify; text-decoration-color:initial; text-decoration-style:initial; text-indent:0px; text-transform:none; white-space:normal; widows:2; word-spacing:0px'>Форум для профессионалов ивент индустрии и их заказчиков. В рамках Форума Event LIVE будут предложены практические решения по организации мероприятий и пройдет обсуждение наиболее интересных реализованных кейсов. В качестве спикеров на Форум приглашены эксперты отрасли и представители компаний заказчиков.</span>",
		"img": "/download_file.html?file_id=6673023098917492266",
		"max_person_count": "7",
		"start_date": "Tue, 21 May 2019 09:00:00 +0300",
		"finish_date": "Wed, 22 May 2019 18:00:00 +0300",
		"cost": "25000",
		"city_id": "5667697629116916712",
		"city": "Санкт-Петербург",
		"subject_id": "Образование",
		"address": "Санкт-Петербург, ул. Лодейнопольская, 5",
		"phone_number": "84959804356",
		"email": "user_007@gmail.com",
		"event_admin_id": "6671540380842220396",
		"event_admin_fullname": "Илларионова Галина Артемовна",
		"event_admin_position": "Директор по управлению персоналом",
		"event_admin_avatar": "/download_file.html?file_id=6671540961322951686",
		"like_count": "1",
		"collaborators": [
		{
		"id": "6671534944450653272",
		"fullname": "Рогожин Денис Александрович",
		"is_confirm": "false",
		"avatar": "/download_file.html?file_id=6671535838520757802"
		},
		{
		"id": "6671628621533546494",
		"fullname": "Гареев Давид Егорьевич",
		"is_confirm": "false",
		"avatar": "/download_file.html?file_id=6671629734139273426"
		},
		{
		"id": "6671537774053763818",
		"fullname": "Павленко Ирина Леонидовна",
		"is_confirm": "false",
		"avatar": "/download_file.html?file_id=6671538400859850742"
		},
		{
		"id": "6671650616084082574",
		"fullname": "Сахарова Елена Петровна",
		"is_confirm": "false",
		"avatar": "/download_file.html?file_id=6671651315566476911"
		},
		{
		"id": "6671637644570346696",
		"fullname": "Иванов Сергей Петрович",
		"is_confirm": "false",
		"avatar": "/download_file.html?file_id=6671638263452412220"
		},
		{
		"id": "6671542723565534099",
		"fullname": "Захарченко Антон Витальевич",
		"is_confirm": "false",
		"avatar": "/download_file.html?file_id=6671543380494324485"
		}
		],
		"comments": [],
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