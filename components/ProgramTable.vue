<script setup lang="ts">
import draggable from 'vuedraggable'
import { toastController, alertController } from '@ionic/vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const props = defineProps<{
	program: Program
}>()

const programData = ref(props.program.data)
const { history, undo, redo, canUndo, canRedo } = useRefHistory(programData, {
	deep: true
})

const { updateProgram, deleteProgram, loadPrograms } = usePrograms()

useEventListener(document, 'keydown', e => {
	if (e.ctrlKey && e.key === 'z') {
		undo()
	} else if (e.ctrlKey && e.key === 'y') {
		redo()
	}
})

const saveToast = ref(false)
const saveErrorToast = ref(null)
const deleteToast = ref(false)
function onSave() {
	const newProgram = {
		name: props.program.name,
		data: programData.value
	}
	updateProgram(newProgram)
		.then(() => {
			saveToast.value = true
			loadPrograms()
		})
		.catch(e => {
			saveErrorToast.value = true
			console.log('supabase post error', e)
		})
}

async function onDelete() {
	const alert = await alertController.create({
		header: 'Are you absolutely sure?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {}
			},
			{
				text: 'OK',
				role: 'confirm',
				handler: () => {
					deleteProgram(props.program.name).then(() => {
						deleteToast.value = true
						loadPrograms()
					})
				}
			}
		],
		message:
			'This will permanently delete the program and all data associated with it.'
	})

	await alert.present()
}

let mL = new Array(Object.keys(programData.value).length)
for (let name of Object.keys(programData.value)) {
	mL[programData.value[name].index] = name
}

const musclesList = ref(mL)
watch(musclesList, () => {
	for (let i = 0; i < musclesList.value.length; i++) {
		programData.value[musclesList.value[i]].index = i
	}
})

const musclesComputed = computed(() => {
	let obj = Object.fromEntries(
		musclesList.value.map(m => [
			m,
			{
				setsPerWeek: parseInt(programData.value[m].setsPerDay)
					? parseInt(programData.value[m].setsPerDay) *
					  programData.value[m].days.length
					: 0
			}
		])
	)
	return obj
})

const totalSetsPerDay = day => {
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

function toggleDay(m, day) {
	let index
	if ((index = programData.value[m].days.indexOf(day)) >= 0) {
		programData.value[m].days.splice(index, 1)
	} else {
		// console.log('muscles', muscles)
		programData.value[m].days.push(day)
		// console.log('muscles', muscles)
	}
}

function getDay(m, day) {
	if (programData.value[m].days.includes(day)) {
		return m
	}
	return '-'
}

const mondayStyle = day =>
	day == 'Monday' ? 'border-left: 1px solid black' : ''

const table = ref(null)
const { width: tableWidth, height: tableHeight } = useElementSize(table)
const { width: winWidth, height: winHeight } = useWindowSize()
// useLog('winwidth, tableWidth', winWidth, tableWidth)

const { shrinkage, SHRINK, MAX_SHRINKAGE } = useShrinkage([
	'DAY',
	['SD', 'SW'],
	'MUSCLE',
	'G'
])
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

const daysLabel = day =>
	computed(() => (shrinkage.value >= SHRINK.DAY ? day[0] : day)).value
const muscleLabel = m =>
	computed(() =>
		shrinkage.value >= SHRINK.MUSCLE
			? m.split(' ').reduce((prev, curr) => prev + curr[0], '')
			: m
	).value
const setsPerDayLabel = computed(() =>
	shrinkage.value >= SHRINK.SD ? 'S/D' : 'Sets/Day'
)
const setsPerWeekLabel = computed(() =>
	shrinkage.value >= SHRINK.SW ? 'S/W' : 'Sets/Week'
)
const groupLabel = computed(() => (shrinkage.value >= SHRINK.G ? 'G' : 'Group'))
</script>

<template>
	<div style="overflow-x: auto">
		<ion-button @click="undo" :disabled="!canUndo">undo</ion-button>
		<ion-button @click="redo" :disabled="!canRedo">redo</ion-button>
		<table ref="table" :key="key">
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
			<draggable
				v-model="musclesList"
				tag="tbody"
				item-key="name"
				handle=".handle"
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
							<ion-item fill="outline" class="sd">
								<ion-input
									class="ion-no-padding"
									type="text"
									size="1"
									v-model="programData[element].setsPerDay"
								/>
							</ion-item>
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
					<ion-item fill="outline">
						<ion-label position="floating">Add</ion-label>
						<ion-input
							@keydown.enter="addMuscle()"
							type="text"
							size="10"
							v-model="newMuscle"
						/>
					</ion-item>
				</td>
			</tr>
		</table>
	</div>
	<ion-button @click="onSave()"> Save </ion-button>
	<ion-button @click="onDelete()" color="danger"> Delete </ion-button>
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

<style scoped>
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

.sdInput {
	--padding-start: 0px !important;
	padding-right: 0px;
	--inner-padding-end: 0px;
	text-align: center;
}
</style>

<style>
/* ionic input classes */
.item-inner {
	padding: 0 !important;
}
.item-native {
	padding: 0 !important;
}

:root {
	--native-padding-left: 0px !important;
}

:host(.item-fill-outline) .item-native {
	--native-padding-left: 0px !important;
	border-radius: 40px;
}

.item-native {
	--native-padding-left: 0px !important;
	padding-inline-start: 0px !important;
	--padding-start: 0px !important;
	border-radius: 4px;
}
</style>
