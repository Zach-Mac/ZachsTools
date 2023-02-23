<script setup lang="ts">
// call load programs
// no programs then create blank and use default

const { programs, loadPrograms, selectedProgram, loaded } = usePrograms()
loadPrograms()

// manually change ProgramTable key to force rerender
// TODO: fix ProgramTable
const { key } = useKey(selectedProgram)

watch(selectedProgram, () => {
	console.log('selectedProgram', selectedProgram.value)
})

const programName = computed({
	get: () => selectedProgram.value.name,
	set: value => (selectedProgram.value.name = value)
})
</script>

<template>
	<Page row col>
		<!-- <ion-toast
			:isOpen="supabaseGetError"
			message="Error getting data from database. Using default settings. Error: {{ supabaseGetError }}"
			duration="2000"
			position="middle"
		/>
		<ion-toast
			:isOpen="supabaseGetError == GOOD"
			message="Getting saved data from database"
			duration="1000"
			position="middle"
		/> -->
		<ion-loading :isOpen="!loaded" message="Loading..." />

		<!-- program selection -->
		<h3>Select program:</h3>
		<ion-button
			v-for="program in programs"
			@click="selectedProgram = program"
			>{{ program.name }}</ion-button
		>
		<ion-button @click="selectedProgram = DEFAULT_PROGRAM">+</ion-button>

		<br />
		<br />

		<ion-item fill="outline">
			<ion-label position="floating"> Program name </ion-label>
			<ion-input v-model="programName" />
		</ion-item>
		<br />

		<ProgramTable v-if="loaded" :program="selectedProgram" :key="key" />
	</Page>
</template>
