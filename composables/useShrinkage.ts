// TODO: any fix
export default function (shrinkOrder) {
	const MAX_SHRINKAGE = shrinkOrder.flat().length
	// turn shrink order into object of index
	const SHRINK = Object.freeze(
		Object.fromEntries(
			shrinkOrder
				.map((val, i) =>
					Array.isArray(val)
						? val.map((v, j) => [v, i + 1])
						: [[val, i + 1]]
				)
				.flat()
		)
	)
	const shrinkage = ref(0)

	return { shrinkage, SHRINK, MAX_SHRINKAGE }
}
