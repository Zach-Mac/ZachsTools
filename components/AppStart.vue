<script setup lang="ts">
// const props = defineProps({
// 	title: {
// 		type: String,
// 		required: true
// 	},
// 	pages: {
// 		type: Array
// 	}
// })

const props = defineProps<{
	title: string
	pages: Pages
}>()

provide('pages', props.pages)

useHead({
	title: props.title,
	// viewport: 'width=device-width, initial-scale=0.5, maximum-scale=0.5',
	// charset: 'utf-8',
	meta: [{ name: 'description', content: 'My amazing site.' }]
})
</script>

<template>
	<ion-app>
		<Header :title="title" :pages="pages" />
		<ion-content>
			<ion-router-outlet></ion-router-outlet>
		</ion-content>
	</ion-app>
</template>
