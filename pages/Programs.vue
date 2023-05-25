<script setup lang="ts">
// call load programs
// no programs then create blank and use default

loadPrograms()

// manually change ProgramTable key to force rerender
// TODO: fix ProgramTable
const { key } = useKey(selectedProgram)

watch(selectedProgram, () => {
	console.log('selectedProgram', selectedProgram.value)
})

function onSelectProgram(program: Program) {
	selectedProgram.value = program
}
function onNewProgram() {
	selectedProgram.value = DEFAULT_PROGRAM
}

const programName = computed({
	get: () => selectedProgram.value.name,
	set: value => (selectedProgram.value.name = value)
})
</script>

<template>
	<Page row col>
		<ion-loading :isOpen="!programsLoaded" message="Loading..." />

		<!-- program selection -->
		<h3>Select program:</h3>
		<ion-button
			v-for="program in programs"
			@click="onSelectProgram(program)"
			>{{ program.name }}</ion-button
		>
		<ion-button @click="onNewProgram()">+</ion-button>

		<br />
		<br />

		<ion-input
			label=" Program name "
			labelPlacement="floating"
			fill="outline"
			v-model="programName"
		/>
		<br />

		<ProgramTable
			v-if="programsLoaded"
			:program="selectedProgram"
			:key="key"
		/>
	</Page>
</template>
