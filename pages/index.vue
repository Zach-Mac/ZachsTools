<script setup lang="ts">
const router = useIonRouter()
const allPages: Pages | undefined = inject('pages')

const pages = allPages ? allPages.slice(1) : []
</script>

<template>
	<Page>
		<ion-row class="ion-justify-content-center ion-padding ion-margin">
			<ion-button
				class="ion-padding ion-margin"
				v-for="page in pages"
				@click="router.push(page.path)"
				>{{ page.name }}</ion-button
			>
		</ion-row>
	</Page>
</template>
