<script setup lang="ts">
const props = defineProps({
	token: { type: String, required: true }
})

const { calendarList, getEvents, moveEventList } = useCalendarApi(props.token)

async function getEventsFormatted(calendarId: string) {
	const events: any[] = await getEvents(calendarId)

	events.sort((a: any, b: any) => new Date(b.updated) - new Date(a.updated))

	console.log('events', events)

	return events
}

const toCalendar = useSessionStorage('toCalendar', '')
const fromCalendar = useSessionStorage('fromCalendar', '')

const fromEvents = ref([] as any[])
// const fromEvents = useSessionStorage('events', [] as any[])
const eventsToMove = ref([] as any[])

async function refreshEvents() {
	eventsToMove.value = []
	fromEvents.value = await getEventsFormatted(fromCalendar.value)
}

watch(fromCalendar, refreshEvents, { immediate: true })

function fromEventClicked(event: any, index: number) {
	event.lastIndex = index
	eventsToMove.value.push(event)
	fromEvents.value.splice(index, 1)
}
function toEventClicked(event: any, index: number) {
	fromEvents.value.splice(event.lastIndex, 0, event)
	eventsToMove.value.splice(index, 1)
}

function moveEvents() {
	moveEventList(eventsToMove.value, fromCalendar.value, toCalendar.value)
}

function asdf() {
	console.log('toCalendar', toCalendar.value)
	console.log('fromCalendar', fromCalendar.value)
	console.log('calendarList', calendarList.value)
}
</script>

<template>
	<v-row>
		<v-col>
			<v-btn class="mb-3 ma-3" @click="refreshEvents">Refresh</v-btn>
			<v-select
				label="From"
				v-model="fromCalendar"
				:items="calendarList"
				item-title="summary"
				item-value="id"
			></v-select>
			<EventList :events="fromEvents" @eventClick="fromEventClicked">
				<template v-slot:append>
					<v-icon icon="mdi-swap-horizontal"></v-icon>
				</template>
			</EventList>
		</v-col>
		<v-col>
			<v-btn class="mb-3 ma-3" color="primary" @click="moveEvents">Move</v-btn>
			<v-select
				label="To"
				v-model="toCalendar"
				:items="calendarList"
				item-title="summary"
				item-value="id"
			></v-select>
			<EventList :events="eventsToMove" @eventClick="toEventClicked"></EventList>
		</v-col>
	</v-row>
	<v-row>
		<v-btn @click="asdf">asdf</v-btn>
	</v-row>
</template>
