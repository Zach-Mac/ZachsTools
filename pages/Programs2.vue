<script setup lang="ts">
import draggable from 'vuedraggable'

const items = ref(['one', 'two', 'three', 'four', 'five'])

watch(items, () => {
	console.log('items', items.value)
})

const handleReorder = (event: CustomEvent) => {
	// Before complete is called with the items they will remain in the
	// order before the drag
	console.log('Before complete', items.value)

	// Finish the reorder and position the item in the DOM based on
	// where the gesture ended. Update the items variable to the
	// new order of items
	items.value = event.detail.complete(items.value)

	// After complete is called the items will be in the new order
	console.log('After complete', items.value)
}

const dragOptions = {
	animation: 150,
	group: 'description',
	disabled: false,
	ghostClass: 'ghost'
}

const test = () => {
	console.log('toRaw(items)', toRaw(items.value))
}
</script>

<template>
	<Page row col>
		<!-- <ion-list> -->
		<!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
		<ion-reorder-group
			:disabled="false"
			@ionItemReorder="handleReorder($event)"
		>
			<ion-row>
				<!-- <ion-button  fill="outline">asdf</ion-button> -->
				<ion-col v-for="item in items" class="ion-no-padding">
					<ion-item>
						<ion-button fill="outline">{{ item }}</ion-button>
						<ion-reorder slot="end"></ion-reorder>
					</ion-item>
				</ion-col>
			</ion-row>
		</ion-reorder-group>
		<!-- </ion-list> -->

		<br />
		<br />
		<br />

		<draggable :list="items" itemKey="" v-bind="dragOptions">
			<template #item="{ element }">
				<ion-button fill="outline">{{ element }}</ion-button>
			</template>
		</draggable>

		<ion-button @click="test()"></ion-button>
	</Page>
</template>
