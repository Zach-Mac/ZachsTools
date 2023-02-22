import { ReactiveEffect, Ref } from 'vue'

export default function (...args: any[]) {
	let refs: Ref[] = []
	let reactives: ReactiveEffect[] = []
	let other: any[] = []

	args.forEach(arg => {
		if (isRef(arg)) refs.push(arg)
		else if (isReactive(arg)) reactives.push(arg)
		else other.push(arg)
	})

	function logAll() {
		console.log(
			// other.toString(),
			...other,
			...refs.map(ref => unref(ref)),
			...reactives.map(reactive => toRaw(reactive))
		)
	}

	watch(
		[...refs, ...reactives],
		() => {
			logAll()
		},
		{ immediate: true, deep: true }
	)

	return args[0]
}
