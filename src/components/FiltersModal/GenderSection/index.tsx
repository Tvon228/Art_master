import classes from "./GenderSection.module.sass"

interface GenderSectionProps {
	selected: ("boy" | "girl")[]
	onToggle: (genders: ("boy" | "girl")[]) => void
}

export default function GenderSection(props: GenderSectionProps) {
	const handleClick = (gender: "boy" | "girl") => {
		const newGenders = props.selected.includes(gender)
			? props.selected.filter((g) => g !== gender)
			: [...props.selected, gender]
		props.onToggle(newGenders)
	}

	return (
		<div class={classes.genderSection}>
			<button
				classList={{
					[classes.genderButton]: true,
					[classes.active]: props.selected.includes("boy"),
				}}
				onClick={() => handleClick("boy")}
			>
				для мальчика
			</button>
			<button
				classList={{
					[classes.genderButton]: true,
					[classes.active]: props.selected.includes("girl"),
				}}
				onClick={() => handleClick("girl")}
			>
				для девочки
			</button>
		</div>
	)
}
