<script setup lang="ts">
const mondayStyle = (day: Day) =>
	day == 'Monday' ? 'border-left: 1px solid black' : ''

const daysLabel = (day: Day) =>
	computed(() => (shrinkage.value >= SHRINK.DAY ? day[0] : day)).value

const setsPerDayLabel = computed(() =>
	shrinkage.value >= SHRINK.SD ? 'S/D' : 'Sets/Day'
)
const setsPerWeekLabel = computed(() =>
	shrinkage.value >= SHRINK.SW ? 'S/W' : 'Sets/Week'
)
const groupLabel = computed(() => (shrinkage.value >= SHRINK.G ? 'G' : 'Group'))
</script>

<template>
	<tr>
		<th v-for="day in DAYS_OF_WEEK" :style="mondayStyle(day)">
			{{ daysLabel(day) }}
		</th>
		<th class="spacer"></th>
		<th>{{ 'Group' }}</th>
		<th>{{ setsPerDayLabel }}</th>
		<th>{{ setsPerWeekLabel }}</th>
		<!-- <th>
					<ion-button @click="drag = !drag">
						<ion-icon :icon="ioniconsReorderFourOutline" />
					</ion-button>
				</th> -->
	</tr>
</template>
