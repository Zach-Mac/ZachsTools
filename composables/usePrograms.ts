import { Ref } from 'vue'

import Ajv from 'ajv'

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

// const schema = {
//   type: "object",
//   properties: {
//     foo: {type: "integer"},
//     bar: {type: "string"},
//   },
//   required: ["foo"],
//   additionalProperties: false,
// }

// const data = {
//   foo: 1,
//   bar: "abc",
// }

const validate = ajv.compile(muscleGroup)
// const valid = validate()
// if (!valid) console.log(validate.errors)

const supabaseGetError = ref(null)
const loaded = ref(false)

const selectedProgram: Ref<Program> = ref({} as Program)
const programs: Ref<Program[]> = ref([])

export default function () {
	const supabase = useSupabaseClient()
	const user = useSupabaseUser()
	const router = useIonRouter()

	// refresh page if user is not logged in
	// TODO: need a guard for this
	if (!user.value) window.location = window.location.origin

	async function loadPrograms() {
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

		loaded.value = true
	}

	async function updateProgram(program: Program) {
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

	async function deleteProgram(programName: string) {
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

	return {
		loadPrograms,
		programs,
		loaded,
		selectedProgram,
		updateProgram,
		deleteProgram
	}
}
