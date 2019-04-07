export default function formateDate(date){
	return date
		.toLocaleDateString(
			'ru-RU',
			{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
		);
}