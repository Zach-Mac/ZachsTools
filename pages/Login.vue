<script setup lang="ts">
import {
	Auth,
	SocialAuth,
	ThemeSupa,
	ThemeBold,
	ThemeMinimal,
	css,
	Provider
} from 'vue-auth-ui'

const supabase = useSupabaseClient()

const { appearance, loading, done, handleLogin } = useAuth()
</script>

<template>
	<Page row>
		<ion-col class="ion-text-center">
			<h1 class="header">Please sign in to continue</h1>
			<SocialAuth
				:providers="['google']"
				socialLayout="col"
				:appearance="appearance"
				@signInWithOAuth="provider => handleLogin(provider.provider)"
			/>
		</ion-col>
	</Page>
</template>
