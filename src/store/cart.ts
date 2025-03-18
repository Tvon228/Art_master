import { createStore } from "solid-js/store"

export interface CartItem {
	id: number
	type: "animator" | "show" | "masterclass"
	quantity: number
}

export const [cart, setCart] = createStore<CartItem[]>([])

export const addToCart = (id: number, type: CartItem["type"]) => {
	const existing = cart.find((item) => item.id === id && item.type === type)
	if (existing) {
		setCart(
			(item) => item.id === id && item.type === type,
			"quantity",
			(q) => q + 1
		)
	} else {
		setCart([...cart, { id, type, quantity: 1 }])
	}
}

export const removeFromCart = (id: number, type: CartItem["type"]) => {
	setCart(cart.filter((item) => !(item.id === id && item.type === type)))
}
