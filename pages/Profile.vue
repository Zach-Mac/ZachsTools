<script setup lang="ts">
const router = useRouter()
const { auth } = useSupabaseAuthClient()

const doUserLogout = () => {
	auth.signOut()
	router.replace('/login')
}
</script>

<template>
	<Page row col>
		<ion-row class="ion-justify-content-center ion-padding ion-margin">
			<ion-button
				class="ion-padding ion-margin"
				@click="doUserLogout"
				color="danger"
			>
				Sign Out
			</ion-button>
		</ion-row>
	</Page>
</template>
