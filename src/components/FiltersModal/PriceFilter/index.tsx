import classes from "./PriceFilter.module.sass"
import { JSX } from "solid-js"

interface PriceFilterProps {
	min: string
	max: string
	onMinChange: (value: string) => void
	onMaxChange: (value: string) => void
}

export default function PriceFilter(props: PriceFilterProps) {
	const handleMinInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (
		e
	) => {
		const value = e.currentTarget.value.replace(/\D/g, "")
		props.onMinChange(value)
	}

	const handleMaxInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (
		e
	) => {
		const value = e.currentTarget.value.replace(/\D/g, "")
		props.onMaxChange(value)
	}

	return (
		<div class={classes.filterGroup}>
			<h3 class={classes.filterTitle}>цена:</h3>
			<div class={classes.priceRange}>
				<input
					type="number"
					placeholder="от"
					class={classes.input}
					value={props.min}
					onInput={handleMinInput}
				/>
				<input
					type="number"
					placeholder="до"
					class={classes.input}
					value={props.max}
					onInput={handleMaxInput}
				/>
			</div>
		</div>
	)
}
