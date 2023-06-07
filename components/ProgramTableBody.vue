<script setup lang="ts">
import draggable from 'vuedraggable'

const props = defineProps({})
</script>

<template>
	<draggable
		v-model="musclesList"
		tag="tbody"
		item-key="name"
		handle=".handle"
		v-bind="dragOptions"
	>
		<template #item="{ element }">
			<tr>
				<td
					class="day"
					v-for="day in DAYS_OF_WEEK"
					:style="mondayStyle(day)"
				>
					<ion-button
						expand="full"
						color="dark"
						fill="clear"
						@click="toggleDay(element, day)"
					>
						{{ muscleLabel(getDay(element, day)) }}
					</ion-button>
				</td>
				<td class="spacer"></td>
				<td class="handle">{{ element }}</td>
				<td>
					<ion-input
						class="ion-no-padding sdInput"
						fill="outline"
						type="text"
						v-model="programData[element].setsPerDay"
					/>
				</td>
				<td>
					{{ musclesComputed[element].setsPerWeek }}
				</td>
				<td class="delete">
					<ion-button color="danger" @click="deleteMuscle(element)"
						>X</ion-button
					>
				</td>
			</tr>
		</template>
	</draggable>
</template>
