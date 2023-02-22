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
	}
]
const title = "Zach's Tools"
</script>

<template>
	<AppStart :title="title" :pages="pages" />
</template>
