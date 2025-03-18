import { ShowPrograms } from "../types/showPrograms"

import baloons from "../assets/showPrograms/baloons.webp"
import neon from "../assets/showPrograms/neon.webp"
import porolon from "../assets/showPrograms/porolon.webp"
import puzyri from "../assets/showPrograms/puzyri.webp"
import science from "../assets/showPrograms/science.webp"
import silver from "../assets/showPrograms/silver.webp"

export const showProgramsData: ShowPrograms[] = [
	{
		id: 1,
		imageUrl: baloons,
		text: "Шоу шаров",
		gender: "girl",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
    {
		id: 2,
		imageUrl: neon,
		text: "Неоновое шоу",
		gender: "girl",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
    {
		id: 3,
		imageUrl: porolon,
		text: "Шоу поролон",
		gender: "girl",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
    {
		id: 4,
		imageUrl: puzyri,
		text: "Шоу мыльных пузырей",
		gender: "girl",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
    {
		id: 5,
		imageUrl: science,
		text: "Научный спектакль",
		gender: "girl",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
    {
		id: 6,
		imageUrl: silver,
		text: "Silver",
		gender: "girl",
		age: "5-10",
		price: 5000,
		popularity: 95,
	},
]
