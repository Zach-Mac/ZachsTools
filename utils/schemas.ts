export const muscleGroup = {
	type: 'object',
	properties: {
		days: { type: 'array', items: { $ref: '#/definitions/Day' } },
		setsPerDay: { type: 'string' },
		index: { type: 'number' }
	},
	required: ['days', 'index', 'setsPerDay'],
	definitions: {
		Day: {
			enum: [
				'Friday',
				'Monday',
				'Saturday',
				'Sunday',
				'Thursday',
				'Tuesday',
				'Wednesday'
			],
			type: 'string'
		}
	},
	$schema: 'http://json-schema.org/draft-07/schema#'
}
