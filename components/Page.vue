<script setup lang="ts">
const props = defineProps({
	row: {
		type: Boolean,
		default: false
	},
	col: {
		type: Boolean,
		default: false
	}
})
</script>

<template>
	<ion-page>
		<ion-content>
			<ion-grid>
				<ion-row v-if="row">
					<ion-col v-if="col">
						<slot></slot>
					</ion-col>
					<slot v-else></slot>
				</ion-row>
				<slot v-else></slot>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>
