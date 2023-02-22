export default function () {
	const key = ref(0)
	const update = () => {
		key.value++
	}
	return { key, update }
}
