const saveToast = ref(false)
const saveErrorToast = ref(undefined)
const deleteToast = ref(false)

function onSave() {
	const newProgram = {
		name: selectedProgram.value.name,
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

let mL: string[] = new Array(Object.keys(programData.value).length)
for (let name of Object.keys(programData.value)) {
	mL[programData.value[name].index] = name
}

const musclesList = ref(mL)
watch(musclesList, () => {
	for (let i = 0; i < musclesList.value.length; i++) {
		programData.value[musclesList.value[i]].index = i
	}
	console.log('musclesList.value', musclesList.value)
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

export {
	onSave,
	musclesList,
	musclesComputed,
	saveToast,
	saveErrorToast,
	deleteToast
}
