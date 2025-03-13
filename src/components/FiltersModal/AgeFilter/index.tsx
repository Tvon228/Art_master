import classes from "./AgeFilter.module.sass"
import { createSignal } from "solid-js"
import { JSX } from "solid-js"

interface AgeFilterProps {
	age: number | null
	onAgeChange: (value: number | null) => void
}

export default function AgeFilter(props: AgeFilterProps) {
	const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
		const value = e.currentTarget.value
		if (value === "") {
			props.onAgeChange(null)
		} else {
			const num = parseInt(value, 10)
			if (!isNaN(num)) {
				props.onAgeChange(num)
			}
		}
	}
	return (
		<div class={classes.filterGroup}>
			<h3 class={classes.filterTitle}>возраст:</h3>
			<div class={classes.ageInputContainer}>
				<input
					type="number"
					class={classes.ageInput}
					placeholder="0-18"
					value={props.age ?? ""}
					onInput={handleInput}
					min="1"
					max="18"
				/>
				<div class={classes.underline}></div>
			</div>
		</div>
	)
}
