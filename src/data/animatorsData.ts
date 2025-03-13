import { AnimatorCard } from "../types/types"
import animators from "../assets/animators.png"

export const cardsData: AnimatorCard[] = [
	{
		id: 1,
		imageUrl: animators,
		text: "Цифровой цирк",
		gender: "boy",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
	{
		id: 2,
		imageUrl: animators,
		text: "Трансформеры",
		gender: "boy",
		age: "3-7",
		price: 4500,
		popularity: 105,
	},
	{
		id: 3,
		imageUrl: animators,
		text: "Принцессы",
		gender: "girl",
		age: "4-8",
		price: 4800,
		popularity: 55,
	},
]
