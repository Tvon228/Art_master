import classes from "./PriceFilter.module.sass"
import { JSX } from "solid-js"

interface PriceFilterProps {
	minPrice: number | null
	maxPrice: number | null
	onMinChange: (value: number | null) => void
	onMaxChange: (value: number | null) => void
}

export default function PriceFilter(props: PriceFilterProps) {
	const handleMinInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (
		e
	) => {
		const value = e.currentTarget.value
		props.onMinChange(value ? parseInt(value, 10) : null)
	}

	const handleMaxInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (
		e
	) => {
		const value = e.currentTarget.value
		props.onMaxChange(value ? parseInt(value, 10) : null)
	}

	return (
		<div class={classes.filterGroup}>
			<h3 class={classes.filterTitle}>цена:</h3>
			<div class={classes.priceRange}>
				<input
					type="number"
					placeholder="От"
					value={props.minPrice ?? ""}
					onInput={handleMinInput}
				/>
				<input
					type="number"
					placeholder="До"
					value={props.maxPrice ?? ""}
					onInput={handleMaxInput}
				/>
			</div>
		</div>
	)
}
