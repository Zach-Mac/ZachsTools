import { Ref } from 'vue'

export default function (refToWatch?: Ref<any>) {
	const key = ref(0)
	const update = () => {
		key.value++
	}
	if (refToWatch) watch(refToWatch, update)
	return { key, update }
}
