export const DAYS_OF_WEEK = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]

export const musclesListDefault = [
	'Front Delts',
	'Rear Delts',
	'Triceps',
	'Biceps',
	'Chest',
	'Abs',
	'Legs'
]
// const musclesDefault = Object.fromEntries(
// 	musclesListDefault.map((m, index) => [
// 		m,
// 		{ days: [], setsPerDay: '0', index: index }
// 	])
// )
export const EMPTY_PROGRAM: Program = {
	'': {
		days: ['Monday', 'Thursday', 'Saturday'],
		setsPerDay: '4',
		index: 3
	}
}

export const DEFAULT_PROGRAM: Program = {
	'Front Delts': {
		days: ['Monday', 'Thursday', 'Saturday'],
		setsPerDay: '4',
		index: 1
	},
	'Rear Delts': {
		days: ['Monday', 'Thursday', 'Saturday'],
		setsPerDay: '4',
		index: 3
	},
	Chest: {
		days: ['Tuesday', 'Friday', 'Sunday'],
		setsPerDay: '2',
		index: 6
	},
	Lats: {
		days: [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		],
		setsPerDay: '1',
		index: 0
	},
	'Lat Delts': {
		days: ['Monday', 'Thursday', 'Saturday'],
		setsPerDay: '4',
		index: 2
	},
	Quads: { days: ['Wednesday', 'Sunday'], setsPerDay: '8', index: 10 },
	Hams: { days: ['Wednesday', 'Sunday'], setsPerDay: '4', index: 11 },
	Forearms: { days: ['Wednesday', 'Sunday'], setsPerDay: '5', index: 12 },
	Traps: {
		days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
		setsPerDay: '4',
		index: 4
	},
	Shins: { days: ['Wednesday', 'Sunday'], setsPerDay: '3', index: 13 },
	Calves: { days: ['Monday', 'Thursday'], setsPerDay: '4', index: 5 },
	'Up Tris': { days: ['Tuesday', 'Friday'], setsPerDay: '4', index: 8 },
	'Down Tris': { days: ['Tuesday', 'Friday'], setsPerDay: '4', index: 9 },
	Jump: { days: ['Tuesday', 'Friday'], setsPerDay: '5', index: 15 },
	'Up Chest': { days: ['Tuesday', 'Friday'], setsPerDay: '4', index: 7 },
	Neck: { days: ['Friday'], setsPerDay: '3', index: 14 }
}
