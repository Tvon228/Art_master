import classes from "./FiltersModal.module.sass"

import { Show, createEffect, onCleanup } from "solid-js"
import { Portal } from "solid-js/web"

interface FiltersModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function FiltersModal(props: FiltersModalProps) {
	createEffect(() => {
		if (props.isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "auto"
		}
	})

	onCleanup(() => {
		document.body.style.overflow = "auto"
	})

	return (
		<Show when={props.isOpen}>
			<Portal>
				<div
					class={classes.modalOverlay}
					classList={{ [classes.active]: props.isOpen }}
				>
					<div class={classes.modalContent}>
						<button
							class={classes.closeBtn}
							onClick={props.onClose}
						>
							×
						</button>
						<div>
							<h2>Важное сообщение</h2>
							<p>Это содержимое модального окна по умолчанию</p>
						</div>
					</div>
				</div>
			</Portal>
		</Show>
	)
}
