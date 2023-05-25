<script setup lang="ts">
const supabase = useSupabaseClient()

const session = await supabase.auth.getSession()
const provider_token = session.data.session?.provider_token

const { getCalendarList, calendarList, quickAdd, selectedCalendarId } =
	useCalendarApi(provider_token)

const rawText = useSessionStorage('rawText', '')

const geegee = ref(false)

// const eventList = ref([])

// function inputRawText() {
// 	let lines = rawText.value.split('\n')
// 	lines = lines.map(line => {
// 		// remove dashes
// 		line = line.replaceAll('-', ' ')

// 		// remove first word (day of week) and last 2 words (gym number)
// 		line = line.split(' ').slice(1, -2).join(' ')

// 		line = line + ' ' + eventName.value

// 		return line
// 	})

// 	// return every other item in list
// 	eventList.value = lines.filter((item, index) => index % 2 === 0)
// }

const eventName = ref('')

const eventList = computed(() => {
	let lines = rawText.value.split('\n')
	if (geegee.value) {
		lines = lines.map(line => {
			// remove dashes
			line = line.replaceAll('-', ' ')

			// remove first word (day of week) and last 2 words (gym number)
			line = line.split(' ').slice(1, -2).join(' ')

			return line
		})
		// return every other item in list
		lines = lines.filter((item, index) => index % 2 === 0)
	}

	lines = lines.map(line => {
		return (line = eventName.value + ' ' + line)
	})

	return lines
})

getCalendarList()

useLog(selectedCalendarId)

async function addToCalendar() {
	eventList.value.forEach(item => quickAdd(item))
}
</script>

<template>
	<Page row col>
		<h2>Calendars</h2>
		<!-- {{ calendarList }} -->
		<ion-item>
			<ion-select
				placeholder="Select calendar"
				interface="popover"
				v-model="selectedCalendarId"
			>
				<ion-select-option
					v-for="cal in calendarList"
					:value="cal.id"
					>{{ cal.summary }}</ion-select-option
				>
			</ion-select>
		</ion-item>
		<ion-button @click="getCalendarList()">Refresh</ion-button>"

		<br />
		<br />
		<!-- TODO: size -->
		<ion-textarea
			label="Input"
			labelPlacement="floating"
			fill="outline"
			v-model="rawText"
			autoGrow
		/>
		<br />
		<!-- @keyup.ctrl.enter="inputRawText" -->
		<!-- <ion-button @click="inputRawText">Input</ion-button> -->
		<ion-checkbox v-model="geegee">From geegeereg</ion-checkbox>
		<br />
		<br />
		<ion-input
			label=" Event Name "
			labelPlacement="floating"
			fill="outline"
			v-model="eventName"
		/>
		<h2>Items to add to calendar:</h2>
		<template v-for="item in eventList">
			<ion-item>
				<ion-label>
					{{ item }}
				</ion-label>
				<ion-button slot="end" color="danger"> X </ion-button>
			</ion-item>
		</template>
		<ion-button @click="addToCalendar">Add</ion-button>
	</Page>
</template>
