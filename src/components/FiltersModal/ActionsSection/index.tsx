import classes from "./ActionsSection.module.sass"

interface ActionsSectionProps {
	onClose: () => void
	onSave: () => void
}

export default function ActionsSection(props: ActionsSectionProps) {
	return (
		<div class={classes.actionsContainer}>
			<button class={classes.secondaryButton} onClick={props.onClose}>
				Выйти
			</button>
			<button class={classes.primaryButton} onClick={props.onSave}>
				Сохранить
			</button>
		</div>
	)
}
