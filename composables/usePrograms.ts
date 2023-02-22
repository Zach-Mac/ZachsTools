import { Ref } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const supabaseGetError = ref(null)
const loaded = ref(false)

const selectedProgram: Ref<Program> = ref({})
const programs: Ref<Program[]> = ref([])

export default function () {
	async function loadPrograms() {
		const { data, error } = await supabase
			.from('muscle_group_schedules')
			.select('data')
			.match({ user_id: user.value.id })

		if (error) {
			// supabaseGetError.value = error
			console.error('error', error)

			// use default
			selectedProgram.value = DEFAULT_PROGRAM
			programs.value = [selectedProgram.value]
		} else if (data.length && data[0].data) {
			console.log('data', data[0].data)
			// supabaseGetError.value = GOOD
			programs.value = data.map(d => d.data)
			selectedProgram.value = data[0].data
		} else {
			// use default
			selectedProgram.value = DEFAULT_PROGRAM
			programs.value = [selectedProgram.value]
		}

		loaded.value = true
	}

	async function updateProgram(program: Program) {
		const { data, error } = await supabase
			.from('muscle_group_schedules')
			.upsert({
				user_id: user.value.id,
				data: program,
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

	return {
		loadPrograms,
		programs,
		loaded,
		selectedProgram,
		updateProgram
	}
}
