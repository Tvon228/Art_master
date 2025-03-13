import classes from "./ActionsSection.module.sass"

interface ActionsSectionProps {
	onReset: () => void
	onSave: () => void
}

export default function ActionsSection(props: ActionsSectionProps) {
	return (
		<div class={classes.actionsContainer}>
			<button class={classes.secondaryButton} onClick={props.onReset}>
				Сброс 
			</button>
			<button class={classes.primaryButton} onClick={props.onSave}>
				Сохранить
			</button>
		</div>
	)
}
