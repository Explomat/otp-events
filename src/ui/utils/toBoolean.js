import { isBoolean } from 'lodash';

export default function toBoolean(str){
	if (isBoolean(str)) return str;

	if (str === 'true') return true;
	else if (str === 'false') return false;

	return false;
}