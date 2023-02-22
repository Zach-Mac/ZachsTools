import axios from 'axios'

const calendarList = ref()
const selectedCalendarId = useSessionStorage('selectedCalendarId', '')

export default function (provider_token: string) {
	const ax = axios.create({
		headers: {
			// Authorization: `Bearer ya29.a0AVvZVsrCw8__0H_GU4tAczmi31LjX233DenIOg2-9KFEX5_cs5QQLLoEmDRmNQMh3QcoXt8whC0dJndvndJ6cNhvcVULKJiyh2bYP2y0Ys2Rps2tJvi1N5NA8cdMdUKulW2Ef1axm_i5z-MjH4mfGlkBfJm1ZdIvRvndaCgYKAXkSARISFQGbdwaIld0ywhcOe97K4pdxGi2SGA0171`
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
