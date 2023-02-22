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

export default function () {
	const appearance = {
		theme: ThemeSupa,
		style: {
			container: {
				alignItems: 'center'
			},
			button: {
				padding: '5px',
				paddingLeft: '3em',
				paddingRight: '3em',
				width: 'fit-content'
			}
		}
	}

	const loading = ref(false)
	const done = ref(false)

	const handleLogin = async (provider: Provider) => {
		try {
			console.log('provider', provider)
			console.log('Attempting to log in with Google')
			loading.value = true
			const { error, data } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: window.location.origin,
					scopes: 'https://www.googleapis.com/auth/calendar'
				}
			})
			console.log('data', data)
			if (error) throw error
			done.value = true
		} catch (error: any) {
			console.log('Error logging in with Google', error)
			alert(error.error_description || error.message)
		} finally {
			console.log('Finally logging in with Google')
			loading.value = false
		}
	}

	return {
		appearance,
		loading,
		done,
		handleLogin
	}
}
