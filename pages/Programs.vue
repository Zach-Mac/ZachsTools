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

const tab = ref(null)
</script>

<template>
	<Page row col>
		<!-- <ion-loading :isOpen="!programsLoaded" message="Loading..." /> -->
		<ion-row>
			<v-tabs v-model="tab">
				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn
							variant="plain"
							rounded="0"
							class="align-self-center me-4"
							height="100%"
						>
							List
							<v-icon end> mdi-menu-down </v-icon>
						</v-btn>
					</template>

					<v-list class="bg-grey-lighten-3">
						<v-list-item
							v-for="program in programs"
							:key="program.name"
						>
							<v-btn>
								{{ program.name }}
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-tab :min-width="10" @click="onNewProgram()">+</v-tab>
				<v-tab
					v-for="program in programs"
					@click="onSelectProgram(program)"
				>
					{{ program.name }}
				</v-tab>
			</v-tabs>
		</ion-row>

		<br />

		<ion-input
			label=" Program name "
			labelPlacement="floating"
			fill="outline"
			v-model="programName"
		/>
		<br />

		<!-- v-if="programsLoaded" -->
		<ProgramTable :program="selectedProgram" :key="key" />

		<!-- <v-window v-model="tab">
			<v-window-item v-for="program in programs">
				<v-card flat>
					<ProgramTable :program="program" :key="key" />
				</v-card>
			</v-window-item>
		</v-window> -->
	</Page>
</template>
