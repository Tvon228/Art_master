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
				<div class={classes.inputWrapper}>
					<span class={classes.subInput}>От</span>
					<input
						class={classes.input}
						type="number"
						placeholder=". . ."
						value={props.minPrice ?? ""}
						onInput={handleMinInput}
					></input>
				</div>
				<div class={classes.inputWrapper}>
					<span class={classes.subInput}>До</span>
					<input
						class={classes.input}
						type="number"
						placeholder=". . ."
						value={props.maxPrice ?? ""}
						onInput={handleMaxInput}
					></input>
				</div>
			</div>
		</div>
	)
}
