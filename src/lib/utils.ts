import dayjs from 'dayjs';
import { DATE_FORMAT } from './constants';

export function getDaysForTheMonth(monthOffset: number) {
	// Set the month and year to the current date
	const currentDate = dayjs().add(monthOffset, 'M');
	const month = currentDate.month() + 1; // months start from 0, so add 1 to get the current month
	const year = currentDate.year();

	// Get the number of days in the month
	const daysInMonth = currentDate.daysInMonth();

	// Create an array to hold the day and weekday objects
	const daysArray = [];

	// Loop through each day of the month and add its day and weekday to the array
	for (let day = 1; day <= daysInMonth; day++) {
		const date = dayjs(`${year}-${month}-${day}`, DATE_FORMAT);
		const weekday = date.format('ddd'); // get the three-letter abbreviation of the weekday
		daysArray.push({ day, weekday, date: date.format(DATE_FORMAT) });
	}

	return daysArray;
}

export function getNextMonday() {
	// Get the current day
	const today = dayjs();

	// Calculate the difference between today and the next Monday
	const daysUntilNextMonday = (7 - today.day() + 1) % 7;

	// Calculate the date of the next Monday
	return today.add(daysUntilNextMonday, 'day');
}
