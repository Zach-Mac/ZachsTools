<script setup lang="ts">
const props = defineProps({ events: { type: Array, required: true } })
const emit = defineEmits<{
	eventClick: [event: any, index: number]
}>()
function getDate(event: any) {
	if (event.start) return event.start.dateTime ?? event.start.date
	// if (event.start) date += event.start.date
}
function toString(dateString: string) {
	return new Date(dateString).toLocaleDateString()
}
</script>

<template>
	<v-card>
		<v-list density="compact">
			<v-list-item
				v-for="(event, index) in events"
				:key="event.id"
				:value="event.id"
				@click="emit('eventClick', event, index)"
			>
				<v-list-item-title>{{ event.summary }}</v-list-item-title>
				<!-- Start: {{ event.start?.date }} -->
				Start: {{ toString(getDate(event)) }}
				<br />
				Updated: {{ toString(event.updated) }}
				<slot></slot>
			</v-list-item>
		</v-list>
	</v-card>
</template>
