export type Gender = "boy" | "girl"

export interface ShowPrograms {
	id: number
	imageUrl: string
	text: string
	gender: Gender
	age: string
	price: number
	popularity: number
}

export type SortType = "none" | "popularity" | "price" | "alphabet"
export type SortDirection = "asc" | "desc"

export interface SortingSettings {
	type: SortType
	direction: SortDirection
}

export type FiltersType = {
	genders: Gender[]
	age: number | null
	minPrice: number | null
	maxPrice: number | null
	sort: SortingSettings
}
