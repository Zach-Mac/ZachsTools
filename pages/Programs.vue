<script setup lang="ts">
// call load programs
// no programs then create blank and use default

const { programs, loadPrograms, selectedProgram, loaded } = usePrograms()
loadPrograms()
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
		<ProgramTable v-if="loaded" :program="selectedProgram" />
	</Page>
</template>
