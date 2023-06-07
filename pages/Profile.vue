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
		<ion-button @click="doUserLogout"> Sign out </ion-button>
	</Page>
</template>
