export {}

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

	interface MuscleGroup {
		days: Day[]
		setsPerDay: string
		index: number
	}
	type Program = Record<string, MuscleGroup> & { name: string }
}
