import classes from "./AnimatorCards.module.sass"

import { JSXElement } from "solid-js"

type AnimatorCardProps = {
	imageUrl: string
	text: string
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
				<div class={classes.buttons}>
					<button
						class={classes.button}
						onClick={props.onButton1Click}
					>
						зовем их!
					</button>
					<button
						class={classes.button}
						onClick={props.onButton2Click}
					>
						подробнее
					</button>
				</div>
			</div>
		</div>
	)
}
