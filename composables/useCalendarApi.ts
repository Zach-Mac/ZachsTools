import axios from 'axios'

const calendarList = ref()

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

	const quickAdd = (text: string, calendarId: string) =>
		ax
			.post(
				`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/quickAdd`,
				{ text }
			)
			.then(res => res.data)
			.then(data => {
				console.log('quickAdd', data)
				return data
			})

	const getEvents = (calendarId: string) =>
		ax
			.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
				params: {
					updatedMin: new Date(new Date().setDate(new Date().getDate() - 28)),
					showDeleted: false
				}
			})
			.then(res => res.data.items)
			.then(data => {
				console.log('getEvents', data)
				return data
			})

	const moveEvent = (eventId: string, fromCalendarId: string, toCalendarId: string) =>
		ax
			.post(
				`https://www.googleapis.com/calendar/v3/calendars/${fromCalendarId}/events/${eventId}/move`,
				{
					destination: toCalendarId
				}
			)
			.then(res => res.data)
			.then(data => {
				console.log('moveEvents', data)
				return data
			})

	async function moveEventList(eventList: any[], fromCalendarId: string, toCalendarId: string) {
		for (const event of eventList) {
			await moveEvent(event.id, fromCalendarId, toCalendarId)
		}
	}

	async function addAllToCalendar(eventList: string[], calendarId: string) {
		for (const event of eventList) {
			await quickAdd(event, calendarId)
		}
	}

	return {
		quickAdd,
		getCalendarList,
		getEvents,
		moveEventList,
		addAllToCalendar,
		calendarList
	}
}
