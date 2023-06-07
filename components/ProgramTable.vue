<script setup lang="ts">
import draggable from 'vuedraggable'
import { toastController, alertController } from '@ionic/vue'

const props = defineProps<{
	program: Program
}>()

const dragOptions = {
	animation: 150,
	group: 'description',
	disabled: false,
	ghostClass: 'ghost'
}

const {
	programData,
	onSave,
	musclesList,
	musclesComputed,
	saveToast,
	saveErrorToast,
	deleteToast
} = useProgramTable(props.program)

const { history, undo, redo, canUndo, canRedo } = useRefHistory(programData, {
	deep: true
})

useEventListener(document, 'keydown', e => {
	if (e.ctrlKey && e.key === 'z') {
		undo()
	} else if (e.ctrlKey && e.key === 'y') {
		redo()
	}
})

const totalSetsPerDay = (day: Day) => {
	let total = 0
	for (let m of Object.keys(programData.value)) {
		if (programData.value[m].days.includes(day)) {
			total += parseInt(programData.value[m].setsPerDay)
		}
	}
	return total
}

const newMuscle = ref('')
async function addMuscle() {
	if (newMuscle.value) {
		if (!musclesList.value.includes(newMuscle.value)) {
			const newIndex = musclesList.value.length
			programData.value[newMuscle.value] = {
				days: [],
				setsPerDay: '0',
				index: newIndex
			}
			musclesList.value.push(newMuscle.value)
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
function deleteMuscle(m) {
	delete programData.value[m]
	musclesList.value = musclesList.value.filter(muscle => muscle !== m)
}

function toggleDay(m, day: Day) {
	let index
	if ((index = programData.value[m].days.indexOf(day)) >= 0) {
		programData.value[m].days.splice(index, 1)
	} else {
		// console.log('muscles', muscles)
		programData.value[m].days.push(day)
		// console.log('muscles', muscles)
	}
}

function getDay(m, day: Day) {
	if (programData.value[m].days.includes(day)) {
		return m
	}
	return '-'
}

const table = ref(null)
const { width: tableWidth, height: tableHeight } = useElementSize(table)
const { width: winWidth, height: winHeight } = useWindowSize()
// useLog('winwidth, tableWidth', winWidth, tableWidth)

const { key, update } = useKey()

const lastWinWidthTableChange = ref(0)
watchThrottled(
	[winWidth, tableWidth],
	() => {
		if (winWidth.value < tableWidth.value + 5) {
			// shorten table
			// if not max level, increase level
			if (shrinkage.value < MAX_SHRINKAGE) {
				shrinkage.value++
				update()
			}
			lastWinWidthTableChange.value = winWidth.value
		} else {
			// lengthen table
			// if not winWidth == lastWinWidthTableChange, decrease level
			if (winWidth.value != lastWinWidthTableChange.value) {
				if (shrinkage.value > 0) {
					shrinkage.value--
					update()
				}
			}
		}
	},
	{ immediate: true, throttle: 100 }
)

const muscleLabel = m =>
	computed(() =>
		shrinkage.value >= SHRINK.MUSCLE
			? m.split(' ').reduce((prev, curr) => prev + curr[0], '')
			: m
	).value
</script>

<template>
	<div style="overflow-x: auto">
		<ion-row>
			<ion-button @click="undo" :disabled="!canUndo">undo</ion-button>
			<ion-button @click="redo" :disabled="!canRedo">redo</ion-button>
		</ion-row>
		<table ref="table" :key="key">
			<ProgramTableHeader :shrinkage="shrinkage" :SHRINK="SHRINK" />
			<!-- <ProgramTableBody /> -->
			<draggable
				v-model="musclesList"
				tag="tbody"
				item-key="name"
				handle=".handle"
				v-bind="dragOptions"
			>
				<template #item="{ element }">
					<tr>
						<td
							class="day"
							v-for="day in DAYS_OF_WEEK"
							:style="mondayStyle(day)"
						>
							<ion-button
								expand="full"
								color="dark"
								fill="clear"
								@click="toggleDay(element, day)"
							>
								{{ muscleLabel(getDay(element, day)) }}
							</ion-button>
						</td>
						<td class="spacer"></td>
						<td class="handle">{{ element }}</td>
						<td>
							<ion-input
								class="ion-no-padding sdInput"
								fill="outline"
								type="text"
								v-model="programData[element].setsPerDay"
							/>
						</td>
						<td>
							{{ musclesComputed[element].setsPerWeek }}
						</td>
						<td class="delete">
							<ion-button
								color="danger"
								@click="deleteMuscle(element)"
								>X</ion-button
							>
						</td>
					</tr>
				</template>
			</draggable>
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
		</table>
	</div>
	<ion-button @click="onSave()"> Save </ion-button>
	<DeleteButton :programName="program.name" />
	<ion-toast
		:isOpen="saveToast"
		@didDismiss="() => (saveToast = false)"
		message="Saved!"
		duration="1000"
		position="middle"
	/>
	<ion-toast
		:isOpen="saveErrorToast"
		@didDismiss="() => (saveErrorToast = false)"
		message="Error saving. Please try again"
		duration="1000"
		position="middle"
	/>
	<ion-toast
		:isOpen="deleteToast"
		@didDismiss="() => (deleteToast = false)"
		message="Program deleted"
		duration="1000"
		position="middle"
	/>
</template>

<style>
.cell-class {
	border-color: black;
	border-width: 0.01em;
	border-style: solid;
	margin-bottom: -1px;
	background-color: lightgrey;
}
/* style the table with big font and borders between columns and rows and add colours */
table {
	font-size: 1em;
	/* border-collapse: collapse; */
	table-layout: auto;
	width: 100%;
}
th,
td {
	padding: 0.3em;
	border-top: 1px solid black;
	border-right: 1px solid black;
	border-bottom: 1px solid black;
	text-align: center;
}

.blank {
	padding: 0.3em;
	border-top: 0px solid black;
	border-right: 0px solid black;
	border-bottom: 0px solid black;
	text-align: center;
}

.day {
	padding: 0;
}
.spacer {
	border-top: none;
	border-bottom: none;
}
</style>

<style>
.sdInput * {
	padding: 0 !important;
	--padding-start: 0px !important;
	padding-right: 0px;
	--inner-padding-end: 0px;
	text-align: center;
}
</style>
