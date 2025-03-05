import classes from "./AnimatorCards.module.sass"

import { JSX, JSXElement } from "solid-js"

type AnimatorCardProps = {
	imageUrl: string
	text: string
	button1Label: string
	button2Label: string
	onButton1Click?: () => void
	onButton2Click?: () => void
}

export default function AnimatorCards(props: AnimatorCardProps): JSXElement {
	return (
		<div class={classes.card}>
			<div class={classes.cloud}>
				<img
					src={props.imageUrl}
					class={classes.image}
					alt="Character"
				/>
				<p class={classes.text}>{props.text}</p>
			</div>

			<div class={classes.buttons}>
				<button class={classes.button} onClick={props.onButton1Click}>
					{props.button1Label}
				</button>
				<button class={classes.button} onClick={props.onButton2Click}>
					{props.button2Label}
				</button>
			</div>
		</div>
	)
}
