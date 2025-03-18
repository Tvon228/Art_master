import classes from "./ShowPrograms.module.sass"

import { addToCart } from "../../../store/cart"
import { createSignal, onMount, JSXElement } from "solid-js"

type ShowProgramCardProps = {
	id: number
	imageUrl: string
	text: string
	onButton1Click?: () => void
	onButton2Click?: () => void
}

export default function ShowProgramCards(props: ShowProgramCardProps): JSXElement {
	const [isLoaded, _] = createSignal(false)
	let imgRef: HTMLImageElement | undefined

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && imgRef && !isLoaded()) {
					imgRef.src = props.imageUrl
				}
			},
			{
				rootMargin: "500px",
				threshold: 0.01,
			}
		)

		if (imgRef) observer.observe(imgRef)

		return () => observer.disconnect()
	})

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
						onClick={() => {
							props.onButton1Click?.()
							addToCart(props.id, 'show')
						}}
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
