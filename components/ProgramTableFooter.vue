<script setup lang="ts">
import { toastController } from '@ionic/vue'

interface Props {
	programData: ProgramData
	musclesList: string[]
}
const props = defineProps<Props>()

const totalSetsPerDay = (day: Day) => {
	let total = 0
	for (let m of Object.keys(props.programData)) {
		if (props.programData[m].days.includes(day)) {
			total += parseInt(props.programData[m].setsPerDay)
		}
	}
	return total
}

const newMuscle = ref('')
async function addMuscle() {
	if (newMuscle.value) {
		if (!props.musclesList.includes(newMuscle.value)) {
			const newIndex = props.musclesList.length
			props.programData[newMuscle.value] = {
				days: [],
				setsPerDay: '0',
				index: newIndex
			}
			props.musclesList.push(newMuscle.value)
			newMuscle.value = ''
		} else {
			const toast = await toastController.create({
				message: newMuscle.value + ' already exists',
				duration: 1000,
				position: 'middle'
			})

			await toast.present()
			console.log(newMuscle.value, 'already exists')
		}
	}
}
</script>

<template>
	<tr>
		<td v-for="day in DAYS_OF_WEEK" :style="mondayStyle(day)">
			Total Sets: {{ totalSetsPerDay(day) }}
		</td>
		<td class="spacer"></td>
		<td>
			<ion-input
				label="Add"
				labelPlacement="floating"
				@keydown.enter="addMuscle()"
				fill="outline"
				type="text"
				:size="10"
				v-model="newMuscle"
			/>
		</td>
	</tr>
</template>
