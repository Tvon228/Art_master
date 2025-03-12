import classes from "./AgeFilter.module.sass"
import { createSignal } from "solid-js"

interface AgeFilterProps {
	onAgeChange: (age: string) => void
}

export default function AgeFilter(props: AgeFilterProps) {
	const [age, setAge] = createSignal("")

	const handleInput = (e: InputEvent) => {
		const value = (e.currentTarget as HTMLInputElement).value
		const sanitizedValue = value.replace(/[^0-9-]/g, "") // Разрешаем только цифры и дефис
		setAge(sanitizedValue)
		props.onAgeChange(sanitizedValue)
	}

	return (
		<div class={classes.filterGroup}>
			<h3 class={classes.filterTitle}>возраст:</h3>
			<div class={classes.ageInputContainer}>
				<input
					type="text"
					class={classes.ageInput}
					placeholder="0-1 год"
					value={age()}
					onInput={handleInput}
				/>
				<div class={classes.underline}></div>
			</div>
		</div>
	)
}
