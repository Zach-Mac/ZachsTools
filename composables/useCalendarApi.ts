import axios from 'axios'

const calendarList = ref()
const selectedCalendarId = useSessionStorage('selectedCalendarId', '')

export default function (provider_token: string) {
	const ax = axios.create({
		headers: {
			Authorization: `Bearer ${provider_token}`
		}
	})

	const getCalendarList = () =>
		ax
			.get('https://www.googleapis.com/calendar/v3/users/me/calendarList')
			.then(res => (calendarList.value = res.data.items))
			.then(data => {
				console.log('getCalendarList', data)
				return data
			})

	const quickAdd = (text: string) =>
		ax
			.post(
				`https://www.googleapis.com/calendar/v3/calendars/${selectedCalendarId.value}/events/quickAdd`,
				{ text }
			)
			.then(res => res.data)
			.then(data => {
				console.log('quickAdd', data)
				return data
			})

	return {
		quickAdd,
		getCalendarList,
		calendarList,
		selectedCalendarId
	}
}
