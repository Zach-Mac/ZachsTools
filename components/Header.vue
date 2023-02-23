<script setup lang="ts">
import { personCircle } from 'ionicons/icons'

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	pages: {
		type: Array
	},
	titleStyle: {
		type: String,
		default: 'font-size: 1.5rem'
	},
	subtitleStyle: {
		type: String,
		default: 'font-size: 1rem'
	},
	buttonStyle: {
		type: String,
		default: ''
	}
})
const router = useIonRouter()
</script>

<template>
	<ion-header>
		<ion-toolbar align-title="center">
			<ion-title :style="titleStyle">{{ title }}</ion-title>
			<ion-buttons slot="start">
				<!-- <ion-back-button default-href="#"></ion-back-button> -->
				<ion-menu-button :autoHide="false"></ion-menu-button>
			</ion-buttons>
			<ion-buttons slot="end">
				<!-- TODO: if enough room -->
				<!-- TODO: pages type -->
				<ion-button
					v-for="page in pages"
					:style="buttonStyle"
					@click="router.push(page.path)"
					>{{ page.name }}</ion-button
				>
				<ion-button @click="router.push('/profile')">
					<ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
		<!-- <ion-toolbar v-if="subtitle">
			<ion-title
				:style="subtitleStyle"
				size="large"
				class="ion-text-center"
				>{{ subtitle }}</ion-title
			>
		</ion-toolbar> -->
	</ion-header>
</template>

<style scoped>
/* bold title */
ion-title {
	font-weight: bold !important;
}
</style>
