// import { toastController, alertController } from '@ionic/vue'

// const saveToast = ref(false)
// const saveErrorToast = ref()
// const deleteToast = ref(false)

// const programData = ref(props.program.data)

// function onSave(name: string, data: ProgramData) {
// 	const newProgram = {
// 		name: name,
// 		data: data
// 	}
// 	updateProgram(newProgram)
// 		.then(() => {
// 			saveToast.value = true
// 			loadPrograms()
// 		})
// 		.catch(e => {
// 			saveErrorToast.value = true
// 			console.log('supabase post error', e)
// 		})
// }

// async function onDelete(programName: string) {
// 	const alert = await alertController.create({
// 		header: 'Are you absolutely sure?',
// 		buttons: [
// 			{
// 				text: 'Cancel',
// 				role: 'cancel',
// 				handler: () => {}
// 			},
// 			{
// 				text: 'OK',
// 				role: 'confirm',
// 				handler: () => {
// 					deleteProgram(programName).then(() => {
// 						deleteToast.value = true
// 						loadPrograms()
// 					})
// 				}
// 			}
// 		],
// 		message:
// 			'This will permanently delete the program and all data associated with it.'
// 	})

// 	await alert.present()
// }

// let mL = new Array(Object.keys(programData.value).length)
// for (let name of Object.keys(programData.value)) {
// 	mL[programData.value[name].index] = name
// }

// const musclesList = ref(mL)
// watch(musclesList, () => {
// 	for (let i = 0; i < musclesList.value.length; i++) {
// 		programData.value[musclesList.value[i]].index = i
// 	}
// })

// const musclesComputed = computed(() => {
// 	let obj = Object.fromEntries(
// 		musclesList.value.map(m => [
// 			m,
// 			{
// 				setsPerWeek: parseInt(programData.value[m].setsPerDay)
// 					? parseInt(programData.value[m].setsPerDay) *
// 					  programData.value[m].days.length
// 					: 0
// 			}
// 		])
// 	)
// 	return obj
// })

// const totalSetsPerDay = day => {
// 	let total = 0
// 	for (let m of Object.keys(programData.value)) {
// 		if (programData.value[m].days.includes(day)) {
// 			total += parseInt(programData.value[m].setsPerDay)
// 		}
// 	}
// 	return total
// }

// const newMuscle = ref('')
// async function addMuscle() {
// 	if (newMuscle.value) {
// 		if (!musclesList.value.includes(newMuscle.value)) {
// 			const newIndex = musclesList.value.length
// 			programData.value[newMuscle.value] = {
// 				days: [],
// 				setsPerDay: '0',
// 				index: newIndex
// 			}
// 			musclesList.value.push(newMuscle.value)
// 			newMuscle.value = ''
// 		} else {
// 			const toast = await toastController.create({
// 				message: newMuscle.value + ' already exists',
// 				duration: 1000,
// 				position: 'middle'
// 			})

// 			await toast.present()
// 			console.log(newMuscle.value, 'already exists')
// 		}
// 	}
// }
// function deleteMuscle(m) {
// 	delete programData.value[m]
// 	musclesList.value = musclesList.value.filter(muscle => muscle !== m)
// }

// function toggleDay(m, day) {
// 	let index
// 	if ((index = programData.value[m].days.indexOf(day)) >= 0) {
// 		programData.value[m].days.splice(index, 1)
// 	} else {
// 		// console.log('muscles', muscles)
// 		programData.value[m].days.push(day)
// 		// console.log('muscles', muscles)
// 	}
// }

// function getDay(m, day: Day) {
// 	if (programData.value[m].days.includes(day)) {
// 		return m
// 	}
// 	return '-'
// }

// const mondayStyle = (day: Day) =>
// 	day == 'Monday' ? 'border-left: 1px solid black' : ''

// export {
// 	onSave,
// 	onDelete,
// 	musclesList,
// 	musclesComputed,
// 	totalSetsPerDay,
// 	newMuscle,
// 	addMuscle,
// 	deleteMuscle,
// 	toggleDay,
// 	getDay,
// 	saveToast,
// 	saveErrorToast,
// 	deleteToast
// }
