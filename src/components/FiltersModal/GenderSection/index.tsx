import classes from "./GenderSection.module.sass"

interface GenderSectionProps {
	selected: ("boy" | "girl")[]
	onToggle: (
		callback: (prev: ("boy" | "girl")[]) => ("boy" | "girl")[]
	) => void
}

export default function GenderSection(props: GenderSectionProps) {
	const handleClick = (gender: "boy" | "girl") => {
		props.onToggle((prev: ("boy" | "girl")[]) =>
			prev.includes(gender)
				? prev.filter((g: "boy" | "girl") => g !== gender)
				: [...prev, gender]
		)
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
