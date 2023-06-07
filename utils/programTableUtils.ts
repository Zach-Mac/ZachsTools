export const mondayStyle = (day: Day) =>
	day == 'Monday' ? 'border-left: 1px solid black' : ''

export const { shrinkage, SHRINK, MAX_SHRINKAGE } = useShrinkage([
	'DAY',
	['SD', 'SW'],
	'MUSCLE',
	'G'
])
