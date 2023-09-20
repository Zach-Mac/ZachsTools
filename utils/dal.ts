import { Ref } from 'vue'

import Ajv from 'ajv'

const ajv = new Ajv()
const validate = ajv.compile(muscleGroup)

const supabaseGetError = ref(null)
export const programsLoaded = ref(false)

export const selectedProgram: Ref<Program> = ref({} as Program)
selectedProgram.value = DEFAULT_PROGRAM
export const programData = ref(selectedProgram.value.data)

watch(selectedProgram, () => {
	programData.value = selectedProgram.value.data
})

export const programs: Ref<Program[]> = ref([])

export async function loadPrograms() {
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()
	const { data: returnedData, error }: any = await supabase
		.from('muscle_group_schedules')
		.select('name,data')
		// TODO: fix this
		// @ts-ignore
		.match({ user_id: user.value.id })

	const data: Program[] = returnedData

	// sanitize data
	for (const program of data) {
		for (const [key, mg] of Object.entries(program.data)) {
			if (!validate(mg)) {
				console.error('invalid muscle group', mg)
				delete program.data[key]
			}
		}
	}

	if (error) {
		// supabaseGetError.value = error
		console.error('error', error)

		// use default
		selectedProgram.value = DEFAULT_PROGRAM
		programs.value = [selectedProgram.value]
	} else if (data.length && data[0].data) {
		console.log('data', data[0].data)
		// supabaseGetError.value = GOOD

		programs.value = data
		selectedProgram.value = data[0]
	} else {
		// use default
		selectedProgram.value = DEFAULT_PROGRAM
		programs.value = [selectedProgram.value]
	}

	programsLoaded.value = true
}

export async function updateProgram(program: Program) {
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()
	const { data, error } = await supabase
		.from('muscle_group_schedules')
		.upsert({
			// TODO: fix this
			// @ts-ignore
			user_id: user.value.id,
			data: program.data,
			name: program.name
		})
	if (error) {
		throw error
		// saveErrorToast.value = true
		console.log('supabase post error', error)
	} else {
		// saveToast.value = true
		console.log('supabase post data', data)
	}

	return { error }
}

export async function deleteProgram(programName: string) {
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()
	const { data, error } = await supabase
		.from('muscle_group_schedules')
		.delete()
		.match({
			name: programName
		})

	if (error) {
		throw error
		// saveErrorToast.value = true
		console.log('supabase post error', error)
	} else {
		// saveToast.value = true
		console.log('supabase post data', data)
	}

	return { error }
}
