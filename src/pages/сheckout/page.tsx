import Header from "../../components/Header"
import classes from "./Checkout.module.sass"

import { For } from "solid-js"
import { cart, removeFromCart } from "../../store/cart"
import { cardsData } from "../../data/animatorsData"
import { showProgramsData } from "../../data/showPrograms"
import { Gender } from "../../types/cards"

import closeIcon from "../../assets/closeIcon.svg"

const getDataByType = (
	type: "animator" | "show" | "masterclass",
	id: number
) => {
	switch (type) {
		case "animator":
			return cardsData.find((c) => c.id === id)
		case "show":
			return showProgramsData.find((s) => s.id === id)
		case "masterclass":
			return undefined
		default:
			const _exhaustiveCheck: never = type
			return _exhaustiveCheck
	}
}

interface CartItemData {
	id: number
	type: "animator" | "show" | "masterclass"
	quantity: number
	imageUrl: string
	text: string
	price: number
	gender: Gender
	age: string
	popularity: number
}

export default function Checkout() {
	const getCartItems = (): CartItemData[] => {
		return cart
			.map((cartItem) => {
				const data = getDataByType(cartItem.type, cartItem.id)
				if (!data) {
					console.error("Item data not found:", cartItem)
					return null
				}

				// Явно сохраняем тип из хранилища
				return {
					...data,
					type: cartItem.type, // Важно: берем type из cartItem, а не из data
					quantity: cartItem.quantity,
				}
			})
			.filter((item): item is CartItemData => !!item)
	}

	return (
		<div class={classes.container}>
			<Header />
			<div class={classes.content}>
				<h1>Ваша корзина</h1>

				<div class={classes.cartItems}>
					<For each={getCartItems()}>
						{(item) => (
							<div class={classes.cartItem}>
								<img
									src={item.imageUrl}
									alt={item.text}
									class={classes.imgCard}
								/>
								<div class={classes.info}>
									<h3>{item.text}</h3>
									<div class={classes.meta}>
										<div class={classes.price}>
											{item.price} ₽ × {item.quantity}
										</div>
									</div>
								</div>
								<button
									class={classes.removeButton}
									onClick={() => {
										removeFromCart(item.id, item.type)
									}}
								>
									<img src={closeIcon} />
								</button>
							</div>
						)}
					</For>
				</div>

				<div class={classes.total}>
					Итого:{" "}
					{getCartItems().reduce(
						(sum, item) => sum + item.price * item.quantity,
						0
					)}{" "}
					₽
				</div>

				<button class={classes.checkoutButton}>Оформить заказ</button>
			</div>
		</div>
	)
}
