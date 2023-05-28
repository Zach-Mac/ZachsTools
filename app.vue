<script setup lang="ts">
const pages: Pages = [
	{
		name: 'Home',
		path: '/'
	},
	{
		name: 'Programs',
		path: '/programs'
	},
	{
		name: 'Calendar Tool',
		path: '/calendar'
	},
	{
		name: 'Programs2',
		path: '/programs2'
	}
]
const title = "Zach's Tools"
</script>

<template>
	<AppStart :title="title" :pages="pages" />
</template>
