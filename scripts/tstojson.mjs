import { resolve } from 'path'
// const { resolve } = require('path')

import * as TJS from 'typescript-json-schema'
// const TJS = require('typescript-json-schema')

import path from 'path'
import fs from 'fs'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const type = process.argv[2]

// optionally pass argument to schema generator
const settings = {
	required: true
}

// optionally pass ts compiler options
const compilerOptions = {
	strictNullChecks: true
}

// optionally pass a base path
const basePath = './my-dir'

const program = TJS.getProgramFromFiles(
	[resolve('./types/index.d.ts')],
	compilerOptions,
	basePath
)

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(program, type, settings)
console.log(schema)

// // ... or a generator that lets us incrementally get more schemas

// const generator = TJS.buildGenerator(program, settings)

// // generator can be also reused to speed up generating the schema if usecase allows:
// const schemaWithReusedGenerator = TJS.generateSchema(
// 	program,
// 	'Pages',
// 	settings,
// 	[],
// 	generator
// )

// // all symbols
// const symbols = generator.getUserSymbols()

// console.log(symbols)
// // Get symbols for different types from generator.
// console.log(generator.getSchemaForSymbol('Pages'))
// generator.getSchemaForSymbol('Program')

// const path = require('path')
// const fs = require('fs')

// const config = {
// 	path: path.join(__dirname, '../src/common/types/entities/api.ts'),
// 	tsconfig: path.join(__dirname, '../tsconfig.json'),
// 	type: '*' // Or <type-name> if you want to generate schema for that one type only
// }

const schema_path = path.join(__dirname, '../__generated__/schema.json')

function writeSchema(schema) {
	const schemaString = JSON.stringify(schema, null)
	fs.writeFileSync(schema_path, schemaString)
}

writeSchema(schema)
