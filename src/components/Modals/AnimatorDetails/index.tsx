import { AnimatorCard } from "../../../types/cards"
import classes from "./AnimatorDetails.module.sass"
import { Show, createEffect, onCleanup } from "solid-js"

type Props = {
	isOpen: boolean
	card: AnimatorCard | null
	onClose: () => void
}

export default function AnimatorDetailsModal(props: Props) {
	createEffect(() => {
		if (props.isOpen) {
			document.body.classList.add(classes.noScroll)
			return
		}
		document.body.classList.remove(classes.noScroll)
	})

	onCleanup(() => {
		document.body.classList.remove(classes.noScroll)
	})

	return (
		<Show when={props.isOpen}>
			<div class={classes.overlay} onClick={props.onClose}>
				<div
					class={classes.content}
					onClick={(e) => e.stopPropagation()}
				>
					<button class={classes.close} onClick={props.onClose}>
						×
					</button>

					<Show when={props.card}>
						{(card) => (
							<>
								<div class={classes.header}>
									<h2 class={classes.title}>{card().text}</h2>
									<div class={classes.price}>
										{card().price} ₽
									</div>
								</div>

								<div class={classes.grid}>
									<img
										src={card().imageUrl}
										alt={card().text}
										class={classes.image}
										loading="lazy"
									/>

									<div class={classes.details}>
										<div class={classes.row}>
											<span>Возраст:</span>
											<span>{card().age}</span>
										</div>

										<Show when={card().description}>
											<p class={classes.desc}>
												{card().description}
											</p>
										</Show>
									</div>
								</div>
							</>
						)}
					</Show>
				</div>
			</div>
		</Show>
	)
}
