<script setup lang="ts">
import { alertController } from '@ionic/vue'

const props = defineProps({
	programName: {
		type: String,
		required: true
	}
})

async function onDelete() {
	const alert = await alertController.create({
		header: 'Are you absolutely sure?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {}
			},
			{
				text: 'OK',
				role: 'confirm',
				handler: () => {
					deleteProgram(props.programName).then(() => {
						// deleteToast.value = true
						loadPrograms()
					})
				}
			}
		],
		message:
			'This will permanently delete the program and all data associated with it.'
	})

	await alert.present()
}
</script>

<template>
	<ion-button @click="onDelete()" color="danger"> Delete </ion-button>
</template>
