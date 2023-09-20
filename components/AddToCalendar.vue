<script setup lang="ts">
const props = defineProps({
	token: { type: String, required: true }
})

const { getCalendarList, calendarList, addAllToCalendar } = useCalendarApi(props.token)

const selectedCalendarId = useSessionStorage('selectedCalendarId', '')

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

useLog(selectedCalendarId)

async function addToCalendar() {
	addAllToCalendar(eventList.value, selectedCalendarId.value)
}
</script>
<template>
	<ion-item>
		<ion-select placeholder="Select calendar" interface="popover" v-model="selectedCalendarId">
			<ion-select-option v-for="cal in calendarList" :value="cal.id">{{
				cal.summary
			}}</ion-select-option>
		</ion-select>
	</ion-item>

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
	<ion-input label=" Event Name " labelPlacement="floating" fill="outline" v-model="eventName" />
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
</template>
