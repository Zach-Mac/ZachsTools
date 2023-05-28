// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	modules: [
		'@nuxtjs/ionic',
		'@nuxtjs/supabase',
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss'
	],
	css: [
		'@ionic/core/css/core.css',
		'@ionic/core/css/normalize.css',
		'@ionic/core/css/structure.css',
		'@ionic/core/css/typography.css',
		'@ionic/core/css/ionic.bundle.css'
	],
	components: [
		{
			path: '@/components', // will get any components nested in let's say /components/test too
			pathPrefix: false
		}
	],
	typescript: {
		strict: true
	},
	supabase: {
		redirect: {
			login: '/login',
			callback: '/'
		}
	}
})
