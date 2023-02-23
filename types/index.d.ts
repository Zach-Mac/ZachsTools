declare global {
	interface Page {
		name: string
		path: string
	}
	type Pages = Page[]

	type Day =
		| 'Monday'
		| 'Tuesday'
		| 'Wednesday'
		| 'Thursday'
		| 'Friday'
		| 'Saturday'
		| 'Sunday'

	// const Day = t.union([
	// 	t.literal('Monday'),
	// 	t.literal('Tuesday'),
	// 	t.literal('Wednesday'),
	// 	t.literal('Thursday'),
	// 	t.literal('Friday'),
	// 	t.literal('Saturday'),
	// 	t.literal('Sunday')
	// ])
	// interface Day extends t.TypeOf<typeof Day> {}

	interface MuscleGroup {
		days: Day[]
		setsPerDay: string
		index: number
	}

	// const MuscleGroup = t.type({
	// 	days: t.array(Day),
	// 	setsPerDay: t.string,
	// 	index: t.number
	// })
	// interface MuscleGroup extends t.TypeOf<typeof MuscleGroup> {}

	type ProgramData = Record<string, MuscleGroup>
	// const ProgramData = t.record(t.string, MuscleGroup)
	// interface ProgramData extends t.TypeOf<typeof ProgramData> {}

	type Program = { data: ProgramData; name: string }
	// const Program = t.type({
	// 	name: t.string,
	// 	data: ProgramData
	// })
	// interface Program extends t.TypeOf<typeof Program> {}
}

export {}
