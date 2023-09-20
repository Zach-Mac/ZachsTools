<script setup lang="ts">
const tab = useLocalStorage('calendarTab', 1)

const supabase = useSupabaseClient()

const session = await supabase.auth.getSession()
const provider_token = session.data.session?.provider_token

const { getCalendarList, calendarList, addAllToCalendar } = useCalendarApi(provider_token)

getCalendarList()
</script>

<template>
	<Page row col>
		<v-container>
			<v-row>
				<v-col>
					<h2>Calendars</h2>

					<v-btn @click="getCalendarList()">Refresh Calendars</v-btn>
					<v-tabs v-model="tab">
						<v-tab :value="1">Add to calendar</v-tab>
						<v-tab :value="2">Move calendars</v-tab>
					</v-tabs>
					<v-window v-model="tab">
						<v-window-item :value="1">
							<AddToCalendar :token="provider_token" />
						</v-window-item>
						<v-window-item :value="2">
							<MoveCalendars :token="provider_token"></MoveCalendars
						></v-window-item>
					</v-window>
				</v-col>
			</v-row>
		</v-container>
	</Page>
</template>
